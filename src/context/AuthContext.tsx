import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, full_name?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch current user on mount if token exists
  useEffect(() => {
    const fetchMe = async () => {
      const storedToken = localStorage.getItem('access_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        if (!res.ok) throw new Error('Invalid token');
        const data = await res.json();
        setUser(data);
        setToken(storedToken);
      } catch (e) {
        localStorage.removeItem('access_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast({ title: 'Login failed', description: err.detail || 'Invalid credentials', variant: 'destructive' });
        return false;
      }
      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      setToken(data.access_token);
      // Fetch user
      const userRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      });
      const userData = await userRes.json();
      setUser(userData);
      toast({ title: 'Welcome back!', description: `Logged in as ${userData.email}` });
      return true;
    } catch (e) {
      toast({ title: 'Login error', description: 'Network error', variant: 'destructive' });
      return false;
    }
  };

  const register = async (email: string, password: string, full_name?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast({ title: 'Registration failed', description: err.detail || 'Could not create account', variant: 'destructive' });
        return false;
      }
      const data = await res.json();
      localStorage.setItem('access_token', data.access_token);
      setToken(data.access_token);
      // User data returned directly
      setUser(data.user);
      toast({ title: 'Account created!', description: `Welcome, ${data.user.email}` });
      return true;
    } catch (e) {
      toast({ title: 'Registration error', description: 'Network error', variant: 'destructive' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    toast({ title: 'Logged out' });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};