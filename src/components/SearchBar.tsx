import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const studioTypes = ["Recording", "Dance", "Podcast", "Photo", "Rehearsal", "Film"];

const SearchBar = () => {
  const [activeType, setActiveType] = useState("");
  const [location, setLocation] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="glass-strong rounded-2xl p-2 flex flex-col md:flex-row items-stretch gap-2">
        {/* Studio Type */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer group">
          <Mic className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Studio Type</p>
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="bg-transparent text-foreground text-sm w-full outline-none cursor-pointer"
            >
              <option value="" className="bg-card">Any type</option>
              {studioTypes.map((t) => (
                <option key={t} value={t} className="bg-card">{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block w-px bg-border/50 my-2" />

        {/* Location */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-hover transition-colors">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Location</p>
            <input
              type="text"
              placeholder="Search cities..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-foreground text-sm w-full outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        <div className="hidden md:block w-px bg-border/50 my-2" />

        {/* Date */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer">
          <Calendar className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium">Date</p>
            <p className="text-foreground text-sm">Any date</p>
          </div>
        </div>

        <Button variant="glow" size="lg" className="rounded-xl gap-2 px-6">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchBar;
