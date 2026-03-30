import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], [0, 0.8]);
  const navPadding = useTransform(scrollY, [0, 100], [24, 12]);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [padding, setPadding] = useState(24);

  useEffect(() => {
    const unsubBg = navBg.on("change", (v) => setBgOpacity(v));
    const unsubPad = navPadding.on("change", (v) => setPadding(v));
    return () => { unsubBg(); unsubPad(); };
  }, [navBg, navPadding]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30"
      style={{
        backgroundColor: `hsla(220, 15%, 7%, ${bgOpacity})`,
        backdropFilter: bgOpacity > 0.1 ? "blur(20px)" : "none",
        paddingTop: padding,
        paddingBottom: padding,
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-foreground font-bold text-xl tracking-tight">studio</span>
          <span className="text-primary font-light text-xl">.com</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Explore Studios
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            List Your Studio
          </Link>
          <Button variant="glass" size="sm" className="gap-2">
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-strong mt-2 mx-4 rounded-xl p-4 flex flex-col gap-3"
        >
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2">
            Explore Studios
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm py-2">
            List Your Studio
          </Link>
          <Button variant="glass" size="sm" className="gap-2 w-full">
            <User className="h-4 w-4" />
            Sign In
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
