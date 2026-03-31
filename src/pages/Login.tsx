import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Prism from '@/components/ui/Prism';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    const success = await login(data.email, data.password);
    setIsLoading(false);
    if (success) navigate('/');
    else setErrors({ root: 'Login failed' });
  };

  const setErrors = (errs: any) => {
    // Optionally set form errors manually
  };

  return (
    <div className='min-h-screen flex'>
      {/* Left side: Prism background */}
      <div className='hidden lg:flex w-1/2 relative'>
        <Prism
          height={4}
          baseWidth={7}
          animationType='hover'
          glow={1.2}
          noise={0.4}
          scale={4}
          hueShift={0.3}
          colorFrequency={1.5}
          hoverStrength={2}
          inertia={0.06}
        />
        <div className='absolute inset-0 flex flex-col items-center justify-center p-12 pointer-events-none'>
          <h1 className='text-4xl font-bold text-white mb-4'>Welcome back</h1>
          <p className='text-white/80 text-lg text-center max-w-md'>
            Experience the future of studio booking. Sign in to access your account and continue your creative journey.
          </p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-background'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-foreground'>Sign in</h2>
            <p className='text-muted-foreground mt-2'>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                {...register('email')}
                className='bg-secondary/50 border-border/50 focus:border-primary'
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                {...register('password')}
                className='bg-secondary/50 border-border/50 focus:border-primary'
              />
              {errors.password && <p className='text-sm text-destructive'>{errors.password.message}</p>}
            </div>

            {errors.root && <p className='text-sm text-destructive'>{errors.root.message}</p>}

            <Button type='submit' className='w-full' size='lg' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className='text-center text-sm text-muted-foreground'>
            Don't have an account?{' '}
            <Link to='/register' className='text-primary hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;