import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import StudioCard, { Studio } from "@/components/StudioCard";
import StudioFilter from "@/components/StudioFilter";
import QuickLookDrawer from "@/components/QuickLookDrawer";
import MagneticButton from "@/components/MagneticButton";
import { Button } from "@/components/ui/button";
import { studios } from "@/data/studios";
import { ArrowRight, Sparkles } from "lucide-react";

const SpotlightHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(217 91% 60% / 0.15), transparent 60%)`,
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mb-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-primary text-sm font-medium">Over 10,000 studios worldwide</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="text-foreground">Space for your</span>
          <br />
          <span className="text-gradient-accent">next Masterpiece.</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Discover and book creative studios — from recording rooms to photo stages — in minutes, not days.
        </p>
      </motion.div>

      <SearchBar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
      >
        <span>Popular:</span>
        {["Recording", "Podcast", "Photo"].map((tag) => (
          <button
            key={tag}
            className="hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
          >
            {tag}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

const Index = () => {
  const [drawerStudio, setDrawerStudio] = useState<Studio | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SpotlightHero />

      {/* Featured Studios */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Studios</h2>
            <p className="text-muted-foreground">Hand-picked spaces for every creative need</p>
          </div>
          <MagneticButton>
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </MagneticButton>
        </div>

        <div className="mb-8">
          <StudioFilter />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio, i) => (
            <StudioCard
              key={studio.id}
              studio={studio}
              index={i}
              onQuickLook={(s) => setDrawerStudio(s)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-border/50 p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Own a studio?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              List your space and start earning. Join thousands of studio owners on studio.com
            </p>
            <MagneticButton className="inline-block">
              <Button variant="glow" size="lg" className="rounded-xl text-base px-8 gap-2">
                List Your Studio <ArrowRight className="h-4 w-4" />
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">S</span>
            </div>
            <span className="text-muted-foreground text-sm">© 2026 studio.com. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>

      <QuickLookDrawer
        studio={drawerStudio}
        isOpen={!!drawerStudio}
        onClose={() => setDrawerStudio(null)}
      />
    </div>
  );
};

export default Index;
