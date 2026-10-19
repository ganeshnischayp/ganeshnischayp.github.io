import React from "react";
import { Sparkles, Gem, Clock } from "lucide-react";
import { t } from "../../data/i18n";
import { motion } from "motion/react";

interface TimelineProps {
  lang?: "en" | "kn" | "te";
  showCelebration?: boolean;
}

const WEDDING_EVENTS = [
  {
    time: "25 Nov · 7:00 PM",
    key: "reception",
    Icon: Sparkles,
  },
  {
    time: "26 Nov · 8:45 AM",
    key: "muhurtha",
    Icon: Gem,
  },
];

export function TimelineItinerary({
  lang = "en",
}: TimelineProps) {
  const isKn = lang === "kn" || lang === "te";

  return (
    <div className="text-center md:text-left">
      <div className="flex items-center gap-2 justify-center md:justify-start mb-8">
        <Clock className="w-4 h-4 text-[#b8924f]" strokeWidth={1.5} />
        <h4 className="font-sans uppercase tracking-[0.24em] text-[11px] text-[#b8924f]">
          {t("day.label", lang)}
        </h4>
      </div>

      <div className="relative w-fit mx-auto md:mx-0 md:w-auto">
        {WEDDING_EVENTS.map((e, index) => {
          const isLast = index === WEDDING_EVENTS.length - 1;
          const Icon = e.Icon;
          const title = t(`itin.${e.key}.title`, lang);
          const sub = t(`itin.${e.key}.sub`, lang);

          return (
            <motion.div
              key={e.key}
              className="flex items-stretch gap-4 justify-start group"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <span
                className="text-xs sm:text-sm text-[#8a6a33] font-semibold w-24 sm:w-28 pt-1.5 text-right shrink-0"
                style={{
                  fontFamily: isKn ? "var(--font-kannada)" : "var(--font-sans)",
                }}
              >
                {e.time}
              </span>

              <div className="relative flex flex-col items-center shrink-0">
                <div className="z-10 w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#c9a776]/60 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Icon className="w-3.5 h-3.5 text-[#b8924f]" strokeWidth={1.4} />
                </div>
                {!isLast && (
                  <div
                    className="w-px flex-1 my-1 origin-top"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--gold, #c9a776), rgba(201,167,118,0.2))",
                      opacity: 0.6,
                    }}
                  />
                )}
              </div>

              <div className="pb-6 text-left">
                <p
                  className="text-lg md:text-xl text-[#3B1513] font-medium leading-snug"
                  style={{
                    fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                  }}
                >
                  {title}
                </p>
                <div
                  className="text-sm text-[#2A2421] font-normal mt-1 leading-relaxed"
                  style={{
                    fontFamily: isKn ? "var(--font-kannada)" : "var(--font-body)",
                  }}
                >
                  {e.key === "muhurtha" ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-[#6B2D2A]">
                        {isKn ? "ನವೆಂಬರ್ 26, ಗುರುವಾರ · ಬೆಳಗ್ಗೆ 8:45 ರಿಂದ 9:30" : "Thursday, 26th Nov · 8:45 AM to 9:30 AM"}
                      </span>
                      <span className="text-xs sm:text-sm text-[#7A4B1A]">
                        {isKn ? "ಧನುರ್ ಲಗ್ನ ಸುಮುಹೂರ್ತದಲ್ಲಿ · ಮಾಂಗಲ್ಯ ಧಾರಣ" : "(Dhanur Lagna) · Mangalya Dharana"}
                      </span>
                    </div>
                  ) : (
                    <span>{sub}</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
