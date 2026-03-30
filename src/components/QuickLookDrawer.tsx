import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MapPin, Clock, DollarSign, Wifi, Music, Mic, Camera, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Studio } from "./StudioCard";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";

interface QuickLookDrawerProps {
  studio: Studio | null;
  isOpen: boolean;
  onClose: () => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="h-5 w-5" />,
  "Sound System": <Music className="h-5 w-5" />,
  "Microphones": <Mic className="h-5 w-5" />,
  "Camera Gear": <Camera className="h-5 w-5" />,
  "Monitors": <Monitor className="h-5 w-5" />,
};

const QuickLookDrawer = ({ studio, isOpen, onClose }: QuickLookDrawerProps) => {
  if (!studio) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-card border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">{studio.name}</h2>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden mb-6">
                <img src={studio.images[0]} alt={studio.name} className="w-full aspect-video object-cover" />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-primary">
                  <Star className="h-4 w-4 fill-primary" />
                  <span className="font-semibold">{studio.rating}</span>
                  <span className="text-muted-foreground">({studio.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{studio.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-surface rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Price</span>
                  </div>
                  <p className="text-foreground text-lg font-bold">${studio.price}/hr</p>
                </div>
                <div className="bg-surface rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Min Booking</span>
                  </div>
                  <p className="text-foreground text-lg font-bold">2 hours</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-foreground font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {studio.amenities.map((amenity, i) => (
                    <motion.div
                      key={amenity}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 bg-surface rounded-lg p-3 group hover:bg-surface-hover transition-colors"
                    >
                      <span className="text-primary">{amenityIcons[amenity] || <Mic className="h-5 w-5" />}</span>
                      <span className="text-sm text-foreground">{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <MagneticButton className="w-full">
                <Link to={`/studio/${studio.id}`}>
                  <Button variant="glow" size="lg" className="w-full rounded-xl text-base">
                    View Full Details
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickLookDrawer;
