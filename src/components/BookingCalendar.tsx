import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const BookingCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = useMemo(() => {
    const days: (number | null)[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);
    return days;
  }, [currentMonth, currentYear]);

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-6 border border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-foreground font-semibold">
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        <button onClick={nextMonth} className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day && (
              <motion.button
                whileHover={!isPast(day) ? { scale: 1.15 } : undefined}
                whileTap={!isPast(day) ? { scale: 0.95 } : undefined}
                disabled={isPast(day)}
                onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                className={`w-full h-full rounded-xl text-sm font-medium transition-colors ${
                  isSelected(day)
                    ? "bg-primary text-primary-foreground glow-primary"
                    : isToday(day)
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : isPast(day)
                    ? "text-muted-foreground/30 cursor-not-allowed"
                    : "text-foreground hover:bg-surface-hover"
                }`}
              >
                {day}
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-primary/10 rounded-xl border border-primary/20 text-center"
        >
          <p className="text-primary text-sm font-medium">
            Selected: {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BookingCalendar;
