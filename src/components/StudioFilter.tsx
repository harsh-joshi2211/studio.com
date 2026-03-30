import { useState } from "react";
import { motion } from "framer-motion";

const filters = [
  "All Studios",
  "Professional",
  "Home Studio",
  "Equipped",
  "Soundproofed",
  "Green Screen",
  "Live Streaming",
  "24/7 Access",
];

const StudioFilter = () => {
  const [active, setActive] = useState("All Studios");

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`relative whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === filter
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground bg-secondary/50"
          }`}
        >
          {active === filter && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </button>
      ))}
    </div>
  );
};

export default StudioFilter;
