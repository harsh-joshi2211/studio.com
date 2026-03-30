import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Zap, Award, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface Studio {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  badges: string[];
  amenities: string[];
}

interface StudioCardProps {
  studio: Studio;
  index: number;
  onQuickLook: (studio: Studio) => void;
}

const StudioCard = ({ studio, index, onQuickLook }: StudioCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % studio.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + studio.images.length) % studio.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/studio/${studio.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover-lift">
          {/* Image carousel */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              key={currentImage}
              src={studio.images[currentImage]}
              alt={studio.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Image nav */}
            {isHovered && studio.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 text-foreground hover:bg-background transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 text-foreground hover:bg-background transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {studio.images.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentImage ? "w-4 bg-primary" : "w-1.5 bg-foreground/40"
                  }`}
                />
              ))}
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {studio.badges.includes("Top Rated") && (
                <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-sm border-0 text-xs gap-1">
                  <Award className="h-3 w-3" /> Top Rated
                </Badge>
              )}
              {studio.badges.includes("Instant Book") && (
                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0 text-xs gap-1">
                  <Zap className="h-3 w-3" /> Instant Book
                </Badge>
              )}
            </div>

            {/* Quick Look */}
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickLook(studio);
                }}
                className="absolute bottom-10 right-3 glass rounded-lg px-3 py-1.5 text-xs font-medium text-foreground flex items-center gap-1.5 hover:bg-surface-hover transition-colors"
              >
                <Eye className="h-3 w-3" /> Quick Look
              </motion.button>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground font-semibold truncate">{studio.name}</h3>
                <p className="text-muted-foreground text-sm">{studio.location}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-foreground text-sm font-medium">{studio.rating}</span>
                <span className="text-muted-foreground text-sm">({studio.reviews})</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{studio.type}</span>
              <p className="text-foreground">
                <span className="font-bold">${studio.price}</span>
                <span className="text-muted-foreground text-sm"> /hr</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default StudioCard;
