import React from "react";
import { Sparkles, Gem, Clock, CalendarDays } from "lucide-react";
import { t } from "../../data/i18n";
import { motion } from "motion/react";

interface TimelineProps {
  lang?: "en" | "kn" | "te";
  showCelebration?: boolean;
  onCalendarExport?: (type: "google" | "apple" | "outlook") => void;
}

export function TimelineItinerary({
  lang = "en",
  onCalendarExport,
}: TimelineProps) {
  const isKn = lang === "kn" || lang === "te";

  return (
    <div className="w-full text-left space-y-6">
      {/* Timeline Section Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#c9a776]/25">
        <Clock className="w-4 h-4 text-[#8a6a33]" strokeWidth={1.75} />
        <h4 className="font-sans uppercase tracking-[0.2em] text-[11px] text-[#8a6a33] font-medium">
          {isKn ? "ವಿವಾಹ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಮಯ" : "Wedding Events Timeline"}
        </h4>
      </div>

      {/* Timeline Nodes */}
      <div className="relative space-y-6">
        {/* EVENT 1: GRAND RECEPTION */}
        <motion.div
          className="flex items-start gap-3 sm:gap-4 group"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Timeline Node & Connecting Line */}
          <div className="relative flex flex-col items-center shrink-0 pt-0.5">
            <div className="z-10 w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#c9a776]/70 flex items-center justify-center shadow-xs text-[#8a6a33]">
              <Sparkles className="w-4 h-4 text-[#b8924f]" strokeWidth={1.5} />
            </div>
            <div
              className="w-px h-full min-h-[90px] my-1"
              style={{
                background:
                  "linear-gradient(180deg, rgba(201,167,118,0.7), rgba(201,167,118,0.2))",
              }}
            />
          </div>

          {/* Event Content Card */}
          <div className="flex-1 pb-2">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 border border-[#c9a776]/35 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#8a6a33] font-medium">
                  {isKn ? "ವರೋಪಚಾರ & ಆರತಕ್ಷತೆ" : "Grand Reception"}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF4E8] text-[#7A4B1A] font-sans text-[11px] font-medium border border-[#c9a776]/30">
                  {isKn ? "ನವೆಂಬರ್ 25 · ಸಂಜೆ 7:00" : "25 Nov · 7:00 PM"}
                </span>
              </div>

              {/* Date */}
              <p
                className="text-base sm:text-lg font-medium text-[#4A1F1D] leading-snug"
                style={{
                  fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                }}
              >
                {isKn ? "2026 ನವೆಂಬರ್ 25, ಬುಧವಾರ" : "Wednesday, 25th Nov 2026"}
              </p>

              {/* Details */}
              <div className="pt-1 border-t border-[#c9a776]/20 flex flex-col gap-0.5 text-xs sm:text-sm">
                <span className="text-[#6B2D2A] font-medium">
                  {isKn ? "ಸಂಜೆ 7:00 ಗಂಟೆಯಿಂದ" : "7:00 PM onwards"}
                </span>
                <span className="text-[#5C5248]">
                  {isKn ? "ಶುಭಾಶಯ ಸ್ವೀಕಾರ & ಪ್ರೀತಿಯ ಭೋಜನ" : "Greetings, Welcoming & Grand Dinner"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EVENT 2: SHUBHA MUHURTHA */}
        <motion.div
          className="flex items-start gap-3 sm:gap-4 group"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          {/* Timeline Node */}
          <div className="relative flex flex-col items-center shrink-0 pt-0.5">
            <div className="z-10 w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#c9a776]/70 flex items-center justify-center shadow-xs text-[#8a6a33]">
              <Gem className="w-4 h-4 text-[#b8924f]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Event Content Card */}
          <div className="flex-1">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/90 border border-[#c9a776]/45 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#8a6a33] font-medium">
                  {isKn ? "ಶುಭ ಮುಹೂರ್ತ" : "Shubha Muhurtha"}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#FAF4E8] text-[#7A4B1A] font-sans text-[11px] font-medium border border-[#c9a776]/30">
                  {isKn ? "ನವೆಂಬರ್ 26 · ಬೆಳಗ್ಗೆ 8:45" : "26 Nov · 8:45 AM"}
                </span>
              </div>

              {/* Date */}
              <p
                className="text-base sm:text-lg font-medium text-[#4A1F1D] leading-snug"
                style={{
                  fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                }}
              >
                {isKn ? "2026 ನವೆಂಬರ್ 26, ಗುರುವಾರ" : "Thursday, 26th Nov 2026"}
              </p>

              {/* Timing details on dedicated new lines on mobile without excessive bolding */}
              <div className="pt-1.5 border-t border-[#c9a776]/20 flex flex-col gap-0.5 text-xs sm:text-sm">
                <span className="text-sm sm:text-base text-[#6B2D2A] font-medium">
                  {isKn ? "ಬೆಳಗ್ಗೆ 8:45 ರಿಂದ 9:30 ರವರೆಗೆ" : "8:45 AM to 9:30 AM"}
                </span>
                <span className="text-[#8C531B] font-medium">
                  {isKn ? "(ಧನುರ್ ಲಗ್ನ ಸುಮುಹೂರ್ತದಲ್ಲಿ)" : "(Dhanur Lagna)"}
                </span>
                <span className="text-[#4A3D36]">
                  {isKn ? "ಮಾಂಗಲ್ಯ ಧಾರಣ ಮಹೋತ್ಸವ" : "Mangalya Dharana"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Add to Calendar Action inside the dropdown */}
      {onCalendarExport && (
        <div className="pt-3 border-t border-[#c9a776]/25 flex flex-wrap items-center gap-2">
          <div className="w-full flex items-center gap-1.5 text-[11px] font-sans uppercase tracking-wider text-[#8a6a33] font-medium mb-1">
            <CalendarDays className="w-3.5 h-3.5 text-[#8a6a33]" />
            <span>{isKn ? "ಕ್ಯಾಲೆಂಡರ್ಗೆ ಸೇರಿಸಿ:" : "Add to Calendar:"}</span>
          </div>
          <button
            type="button"
            onClick={() => onCalendarExport("google")}
            className="px-3 py-1.5 rounded-lg border border-[#c9a776]/40 text-xs font-sans tracking-wide hover:bg-[#c9a776]/15 bg-white text-[#6B2D2A] transition-colors cursor-pointer shadow-2xs font-medium"
          >
            Google
          </button>
          <button
            type="button"
            onClick={() => onCalendarExport("apple")}
            className="px-3 py-1.5 rounded-lg border border-[#c9a776]/40 text-xs font-sans tracking-wide hover:bg-[#c9a776]/15 bg-white text-[#6B2D2A] transition-colors cursor-pointer shadow-2xs font-medium"
          >
            Apple
          </button>
          <button
            type="button"
            onClick={() => onCalendarExport("outlook")}
            className="px-3 py-1.5 rounded-lg border border-[#c9a776]/40 text-xs font-sans tracking-wide hover:bg-[#c9a776]/15 bg-white text-[#6B2D2A] transition-colors cursor-pointer shadow-2xs font-medium"
          >
            Outlook
          </button>
        </div>
      )}
    </div>
  );
}
