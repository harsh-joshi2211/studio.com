import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, Clock, Users, Wifi, Music, Mic, Camera, Monitor, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BookingCalendar from "@/components/BookingCalendar";
import MagneticButton from "@/components/MagneticButton";
import Navbar from "@/components/Navbar";
import { studios } from "@/data/studios";

const amenityDetails: Record<string, { icon: React.ReactNode; description: string }> = {
  "WiFi": { icon: <Wifi className="h-6 w-6" />, description: "High-speed fiber connection, 1Gbps" },
  "Sound System": { icon: <Music className="h-6 w-6" />, description: "Professional monitoring speakers" },
  "Microphones": { icon: <Mic className="h-6 w-6" />, description: "Neumann, Shure, AKG collection" },
  "Camera Gear": { icon: <Camera className="h-6 w-6" />, description: "Canon, Sony cinema cameras available" },
  "Monitors": { icon: <Monitor className="h-6 w-6" />, description: "4K reference monitors" },
};

const StudioDetail = () => {
  const { id } = useParams();
  const studio = studios.find((s) => s.id === id);
  const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null);

  if (!studio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Studio not found</h1>
          <Link to="/">
            <Button variant="glow">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-32">
        <div className="container mx-auto px-6">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Studios
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{studio.name}</h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-foreground font-medium">{studio.rating}</span>
                    <span>({studio.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{studio.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="glass" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="glass" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" /> Save
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Masonry Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 rounded-2xl overflow-hidden"
          >
            <div className="col-span-2 row-span-2">
              <img src={studio.images[0]} alt={studio.name} className="w-full h-full object-cover aspect-square" />
            </div>
            {studio.images.slice(1).map((img, i) => (
              <div key={i}>
                <img src={img} alt="" className="w-full h-full object-cover aspect-square" />
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-bold text-foreground mb-4">About this studio</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A premium {studio.type.toLowerCase()} studio located in the heart of {studio.location}.
                  Designed for professionals and creatives who demand the best equipment and atmosphere.
                  The space features world-class acoustics, natural lighting options, and a curated selection
                  of professional gear ready for your next project.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-surface rounded-xl p-4 text-center">
                    <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-foreground font-semibold">24/7</p>
                    <p className="text-muted-foreground text-xs">Access</p>
                  </div>
                  <div className="bg-surface rounded-xl p-4 text-center">
                    <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-foreground font-semibold">Up to 10</p>
                    <p className="text-muted-foreground text-xs">Guests</p>
                  </div>
                  <div className="bg-surface rounded-xl p-4 text-center">
                    <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
                    <p className="text-foreground font-semibold">Downtown</p>
                    <p className="text-muted-foreground text-xs">Location</p>
                  </div>
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-xl font-bold text-foreground mb-4">Equipment & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {studio.amenities.map((amenity, i) => {
                    const detail = amenityDetails[amenity];
                    return (
                      <motion.div
                        key={amenity}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        onMouseEnter={() => setHoveredAmenity(amenity)}
                        onMouseLeave={() => setHoveredAmenity(null)}
                        className="relative bg-surface rounded-xl p-4 flex items-center gap-4 border border-border/30 hover:border-primary/30 transition-all cursor-default group"
                      >
                        <span className="text-primary group-hover:scale-110 transition-transform">
                          {detail?.icon || <Mic className="h-6 w-6" />}
                        </span>
                        <div>
                          <p className="text-foreground font-medium">{amenity}</p>
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: hoveredAmenity === amenity ? 1 : 0,
                              height: hoveredAmenity === amenity ? "auto" : 0,
                            }}
                            className="text-muted-foreground text-sm overflow-hidden"
                          >
                            {detail?.description}
                          </motion.p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 space-y-6"
              >
                <div className="bg-card rounded-2xl border border-border/50 p-6">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-foreground">${studio.price}</span>
                    <span className="text-muted-foreground">/ hour</span>
                  </div>
                  <BookingCalendar />
                  <div className="mt-6 space-y-3">
                    <MagneticButton className="w-full">
                      <Button variant="glow" size="lg" className="w-full rounded-xl text-base">
                        Book Now
                      </Button>
                    </MagneticButton>
                    <p className="text-center text-muted-foreground text-xs">You won't be charged yet</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 glass-strong border-t border-border/50 p-4 flex items-center justify-between lg:hidden z-40">
        <div>
          <span className="text-xl font-bold text-foreground">${studio.price}</span>
          <span className="text-muted-foreground text-sm"> /hr</span>
        </div>
        <Button variant="glow" className="rounded-xl px-8">Book Now</Button>
      </div>
    </div>
  );
};

export default StudioDetail;
