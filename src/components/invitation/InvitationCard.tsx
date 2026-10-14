import React, { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Download,
  Languages,
  ChevronDown,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Monogram } from "./Monogram";
import { FloraDecorations } from "./FloraDecorations";
import { TimelineItinerary } from "./TimelineItinerary";
import { TravelAndExplore } from "./TravelAndExplore";
import { ScratchDateCard } from "./ScratchDateCard";
import { t, closingLineI18n } from "../../data/i18n";
import {
  KANNADA_NAMES,
  KANNADA_NAMES_BRIDE_FIRST,
  KANNADA_WELCOME,
  RelationType,
} from "../../lib/inviteCodec";
import {
  VENUE_NAME,
  VENUE_NAME_KN,
  VENUE_ADDRESS,
  VENUE_ADDRESS_KN,
  VENUE_MAPS_URL,
  VENUE_EMBED_URL,
} from "../../data/transitData";

interface InvitationCardProps {
  guestName?: string;
  guestToken?: string;
  rel?: RelationType;
  note?: string;
  honorific?: string;
  lang: "en" | "kn" | "te";
  showCelebration: boolean;
  groomFirst: boolean;
  showBestWishes: boolean;
  onToggleLang: () => void;
  onOpenRsvp: () => void;
  showRsvp: boolean;
  onCloseDoor?: () => void;
}

const BEST_WISHES = [
  ["H.K. Kariyappa Gowda & Family", "Savithramma Family"],
  ["Relatives, Friends & Well-Wishers"],
];

export function InvitationCard({
  guestName = "",
  rel = "",
  note = "",
  honorific = "",
  lang,
  groomFirst = false,
  showBestWishes,
  onToggleLang,
  onOpenRsvp,
  showRsvp,
  onCloseDoor,
}: InvitationCardProps) {
  const [showMapPreview, setShowMapPreview] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const isKn = lang === "kn" || lang === "te";

  // Target date: Reception on 25th Nov 2026, 7:00 PM
  const targetDate = new Date("2026-11-25T19:00:00+05:30");
  const diffDays = Math.max(
    0,
    Math.ceil((targetDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const coupleEn = groomFirst ? "Nischay & Yashaswini" : "Yashaswini & Nischay";
  const coupleKn = groomFirst ? KANNADA_NAMES : KANNADA_NAMES_BRIDE_FIRST;

  const handleCalendarExport = (type: "google" | "apple" | "outlook") => {
    const title = `Wedding of ${coupleEn}`;
    const location = `${VENUE_NAME}, ${VENUE_ADDRESS}`;
    const description = `You're warmly invited to celebrate the wedding ceremony of ${coupleEn}!\n\nReception: 25th November 2026 from 7:00 PM onwards\nShubha Muhurtha: 26th November 2026, 8:45 AM to 9:30 AM\n\nVenue: ${VENUE_NAME}`;
    const start = "20261125T133000Z"; // 25 Nov 7:00 PM IST is 13:30 UTC
    const end = "20261126T093000Z";   // 26 Nov 3:00 PM IST is 09:30 UTC

    if (type === "google") {
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        title
      )}&dates=${start}/${end}&details=${encodeURIComponent(
        description
      )}&location=${encodeURIComponent(location)}`;
      window.open(url, "_blank");
    } else if (type === "outlook") {
      const url = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=2026-11-25T19:00:00&enddt=2026-11-26T15:00:00&subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(
        location
      )}`;
      window.open(url, "_blank");
    } else {
      const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//OurForever//Wedding//EN\r\nBEGIN:VEVENT\r\nDTSTART:${start}\r\nDTEND:${end}\r\nSUMMARY:${title}\r\nLOCATION:${VENUE_NAME}\\, Channarayapatna\r\nDESCRIPTION:${description.replace(
        /\n/g,
        "\\n"
      )}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `nischay-yashaswini-wedding.ics`;
      link.click();
    }
  };

  return (
    <div className="relative w-full bg-[#F8EEDD] rounded-none px-5 py-7 sm:px-10 sm:py-12 md:p-16 shadow-2xl border border-black/10 flex flex-col items-center justify-center overflow-hidden">
      {/* Paper background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(#4a1f1d 1px, transparent 1px), radial-gradient(#8a6a33 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* Decorative Golden Outer and Inner Border Frames */}
      <div
        aria-hidden="true"
        className="absolute inset-2 sm:inset-3 md:inset-5 pointer-events-none border border-[#c9a776]/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[7px] sm:inset-[12px] md:inset-[22px] pointer-events-none border border-[#c9a776]/30"
      />

      {/* Swaying Watercolor Floral Accents */}
      <FloraDecorations />

      {/* Subtle giant watermark monogram in center background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <Monogram
          variant="golden"
          style={{ width: "55%", opacity: 0.04 }}
        />
      </div>

      {/* CARD CONTENT */}
      <div className="w-full relative z-10">
        {/* Top Header & Shloka */}
        <div className="relative text-center mb-14 space-y-4 pt-10 md:pt-2">
          {/* Subtle golden ambient glow behind heading */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 -top-4 w-72 md:w-96 h-40 rounded-full bg-[#4a1f1d]/[0.05] blur-3xl pointer-events-none"
          />

          {/* Mangala Shloka / Blessing Verse */}
          <figure className="relative mx-auto max-w-sm md:max-w-lg">
            <blockquote
              className="text-sm md:text-base italic leading-relaxed text-[#4a1f1d]/90 font-medium"
              style={{
                fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
              }}
            >
              “{t("verse.text", lang)}”
            </blockquote>
            <figcaption className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6a33]">
              {t("verse.ref", lang)}
            </figcaption>
          </figure>

          {/* Eyebrow */}
          <p
            className={`text-xs text-muted-foreground ${
              isKn
                ? "font-medium"
                : "font-sans font-semibold uppercase tracking-[0.2em]"
            }`}
            style={{
              fontFamily: isKn ? "var(--font-kannada)" : "var(--font-sans)",
            }}
          >
            {t("invited.eyebrow", lang)}
          </p>

          {/* Monogram Crest - Clean, Elegant & Crisp Golden NY Logo */}
          <div className="flex justify-center mt-2 mb-0.5 sm:my-3.5">
            <span className="relative inline-block transition-transform duration-300 hover:scale-105">
              <Monogram
                variant="golden"
                style={{ height: 68, width: 68 }}
                className="sm:w-[76px] sm:h-[76px]"
              />
            </span>
          </div>

          {/* Couple's Names with Golden Light Effect (Active on Mobile & Desktop) */}
          <div className="relative inline-block mt-0 mb-2 sm:my-3 max-w-full group">
            {/* Soft warm ambient gold aura - always active on mobile, extra bright on hover */}
            <div
              aria-hidden="true"
              className="absolute -inset-3 sm:-inset-6 rounded-3xl bg-gradient-to-r from-transparent via-[#c9a776]/30 to-transparent blur-xl opacity-80 sm:opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />

            {/* Shimmering golden sparkles visible on phone and desktop */}
            <Sparkles
              className="w-4 h-4 sm:w-6 sm:h-6 text-amber-500 absolute -top-2 -right-3 sm:-right-8 opacity-85 sm:opacity-95 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110 pointer-events-none"
              aria-hidden="true"
            />
            <Sparkles
              className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-500 absolute -bottom-1 -left-3 sm:-left-7 opacity-80 sm:opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:-rotate-12 group-hover:scale-110 pointer-events-none"
              aria-hidden="true"
            />

            <div className="space-y-1 w-full flex flex-col items-center max-w-full overflow-hidden">
              <h1
                className="font-serif font-medium tracking-normal sm:tracking-wide leading-tight py-1.5 golden-wave-hover select-none whitespace-nowrap text-center max-w-full"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.95rem, 7.4vw, 4.25rem)",
                  filter:
                    "drop-shadow(0 1px 1px rgba(74,31,29,0.18)) drop-shadow(0 0 12px rgba(201,167,118,0.45))",
                }}
                title={coupleEn}
              >
                {coupleEn}
              </h1>

              {isKn ? (
                <p
                  className="leading-[1.5] font-semibold golden-wave-hover"
                  style={{
                    fontFamily: "var(--font-kannada-display)",
                    fontSize: "clamp(1.85rem, 7vw, 3.75rem)",
                  }}
                >
                  {coupleKn}
                </p>
              ) : (
                <p className="text-xs md:text-sm font-sans uppercase tracking-[0.25em] text-[#8a6a33] font-semibold pt-1 transition-colors duration-300 group-hover:text-[#b8860b]">
                  November 25 & 26, 2026 · Channarayapatna
                </p>
              )}
            </div>
          </div>

          {/* Family Announcement */}
          <p
            className="text-base md:text-lg text-muted-foreground pt-2 max-w-lg mx-auto leading-relaxed"
            style={{
              fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
            }}
          >
            {t("hero.families", lang)}
          </p>

          {/* Personalized Greeting for Invitee */}
          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 pt-3 inline-block max-w-md border-t border-[#c9a776]/30"
            >
              <p
                className="text-base md:text-lg italic text-[#4a1f1d]/90 font-medium"
                style={{
                  fontFamily: isKn ? "var(--font-kannada)" : "var(--font-body)",
                }}
              >
                {closingLineI18n(guestName, rel, lang, honorific)}
              </p>
              <p
                className="text-sm mt-1 text-[#4a1f1d]/75 font-medium"
                style={{
                  fontFamily: isKn ? "var(--font-kannada)" : "var(--font-sans)",
                }}
              >
                {isKn ? KANNADA_WELCOME : t("welcome", lang)}
              </p>
              {note && (
                <p
                  className="text-xl text-[#7a6f5d] mt-3 italic"
                  style={{ fontFamily: "var(--font-cursive)" }}
                >
                  “{note}”
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Interactive Scratch-to-Reveal Date & Countdown Square */}
        <ScratchDateCard lang={lang} />

        {/* 2-Column Section: When/Where & The Day Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
          {/* Left Column: When & Where */}
          <div className="space-y-10 text-center md:text-left">
            {/* When: Reception & Muhurtha Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <CalendarDays className="w-4 h-4 text-[#b8924f]" strokeWidth={1.5} />
                <h4 className="font-sans uppercase tracking-[0.24em] text-[11px] text-[#b8924f]">
                  {t("when.label", lang)}
                </h4>
              </div>

              {/* Event 1: Reception */}
              <div className="p-4 rounded-xl bg-[#FDFBF7]/70 border border-[#c9a776]/35 text-left space-y-1 shadow-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6B2D2A]" />
                  <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#6B2D2A]">
                    {isKn ? "ವರೋಪಚಾರ & ಆರತಕ್ಷತೆ" : "Reception"}
                  </span>
                </div>
                <p
                  className="text-xl font-bold text-foreground/90"
                  style={{
                    fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                  }}
                >
                  {isKn ? "2026 ನವೆಂಬರ್ 25, ಬುಧವಾರ" : "Wednesday, 25th Nov 2026"}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {isKn ? "ಸಂಜೆ 7:00 ಗಂಟೆಯಿಂದ" : "7:00 PM onwards"}
                </p>
              </div>

              {/* Event 2: Shubha Muhurtha */}
              <div className="p-4 rounded-xl bg-[#FDFBF7]/70 border border-[#c9a776]/35 text-left space-y-1 shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm">💍</span>
                  <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#6B2D2A]">
                    {isKn ? "ಶುಭ ಮುಹೂರ್ತ (ಮಾಂಗಲ್ಯ ಧಾರಣೆ)" : "Shubha Muhurtha"}
                  </span>
                </div>
                <p
                  className="text-xl font-bold text-foreground/90"
                  style={{
                    fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                  }}
                >
                  {isKn ? "2026 ನವೆಂಬರ್ 26, ಗುರುವಾರ" : "Thursday, 26th Nov 2026"}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {isKn
                    ? "ಬೆಳಗ್ಗೆ 8:45 ರಿಂದ 9:30 ರವರೆಗೆ (ಧನುರ್ ಲಗ್ನದಲ್ಲಿ)"
                    : "8:45 AM to 9:30 AM (Dhanur Lagna)"}
                </p>
              </div>
            </div>

            {/* Where: Savithramma Kariyappa Gowda Kalyana Mantapa */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#b8924f]" strokeWidth={1.5} />
                <h4 className="font-sans uppercase tracking-[0.24em] text-[11px] text-[#b8924f]">
                  {t("where.label", lang)}
                </h4>
              </div>
              <p
                className="text-2xl md:text-3xl text-foreground/90 font-bold leading-tight"
                style={{
                  fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                }}
              >
                {isKn ? VENUE_NAME_KN : VENUE_NAME}
              </p>
              <p
                className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md"
                style={{
                  fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                }}
              >
                {isKn ? (
                  <>
                    ಬಿ.ಎಂ. ರಸ್ತೆ, ಚನ್ನರಾಯಪಟ್ಟಣ, ಹಾಸನ ಜಿಲ್ಲೆ,{" "}
                    <span className="whitespace-nowrap">ಕರ್ನಾಟಕ 573116</span>
                  </>
                ) : (
                  <>
                    B.M. Road, Channarayapatna, Hassan District,{" "}
                    <span className="whitespace-nowrap">Karnataka 573116</span>
                  </>
                )}
              </p>

              {/* View on Map Link */}
              <div className="pt-1">
                <a
                  href={VENUE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#b8924f] hover:text-[#6B2D2A] font-sans font-semibold text-xs uppercase tracking-widest transition-colors"
                >
                  {t("map.view", lang)} →
                </a>
              </div>

              {/* Preview Map Toggle Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowMapPreview((prev) => !prev)}
                  className="group relative block w-full max-w-sm h-24 overflow-hidden rounded-xl border border-[#c9a776]/40 bg-[#EFE6D3] mx-auto md:mx-0 cursor-pointer shadow-xs"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(140,132,114,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(140,132,114,0.15) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center gap-2 rounded-full bg-[#FDFBF7]/90 border border-[#c9a776]/30 px-4 py-1.5 text-xs font-sans uppercase tracking-[0.14em] text-[#6B2D2A] shadow-xs group-hover:scale-105 transition-transform">
                      <MapPin className="w-3.5 h-3.5 text-[#b8924f]" />
                      <span>
                        {showMapPreview
                          ? t("map.hide", lang)
                          : t("map.preview", lang)}
                      </span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline & Optional Best Wishes */}
          <div>
            <TimelineItinerary lang={lang} />

            {showBestWishes && (
              <div className="mt-10 pt-6 border-t border-[#c9a776]/25 text-center md:text-left">
                <p className="font-sans uppercase tracking-[0.18em] text-[10px] text-[#b8924f] mb-3">
                  {isKn ? "ಹಾರೈಕೆಗಳು" : "Best Wishes from"}
                </p>
                <div className="flex justify-center md:justify-start gap-8 sm:gap-12">
                  {BEST_WISHES.map((col, idx) => (
                    <ul key={idx} className="space-y-1.5 text-left">
                      {col.map((person) => (
                        <li
                          key={person}
                          className="text-base sm:text-lg text-foreground/85 leading-snug"
                          style={{
                            fontFamily: isKn
                              ? "var(--font-kannada)"
                              : "var(--font-serif)",
                          }}
                        >
                          {person}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Embedded Map Panel (when expanded) */}
        <AnimatePresence>
          {showMapPreview && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-16 -mt-4"
            >
              <iframe
                title="Savithramma Kariyappa Gowda Kalyana Mantapa, Channarayapatna"
                src={VENUE_EMBED_URL}
                className="w-full h-64 border-0 rounded-2xl block ring-1 ring-[#c9a776]/40 shadow-sm"
                loading="lazy"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider with gold emblem */}
        <div className="relative my-12 flex items-center justify-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a776]/40 to-transparent" />
          <span className="absolute bg-[#F8EEDD] px-4 text-xs text-[#b8924f]">
            ✦
          </span>
        </div>

        {/* Travel and Exploration Guide for Channarayapatna / Hassan */}
        <div className="pt-2 pb-6">
          <TravelAndExplore />
        </div>

        {/* Divider */}
        <div className="relative my-12 flex items-center justify-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a776]/40 to-transparent" />
          <span className="absolute bg-[#F8EEDD] px-4 text-xs text-[#b8924f]">
            ✦
          </span>
        </div>

        {/* Action Controls: Add to Calendar, Save Invitation, Language Toggle */}
        <div className="pt-6 text-center space-y-6">
          {/* Add to Calendar Dropdown */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setCalendarOpen((prev) => !prev)}
              className="px-8 py-3.5 font-sans uppercase tracking-widest text-xs border border-[#c9a776]/50 hover:bg-[#c9a776]/10 flex items-center gap-2 transition-colors bg-transparent text-foreground rounded-none shadow-xs"
            >
              <CalendarDays className="w-4 h-4 text-[#b8924f]" strokeWidth={1.4} />
              <span>{t("btn.calendar", lang)}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  calendarOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {calendarOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pt-3 flex flex-wrap justify-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => handleCalendarExport("google")}
                    className="px-5 py-2.5 border border-[#c9a776]/30 text-xs font-sans uppercase tracking-wider hover:bg-[#c9a776]/10 bg-[#FDFBF7]"
                  >
                    Google Calendar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalendarExport("apple")}
                    className="px-5 py-2.5 border border-[#c9a776]/30 text-xs font-sans uppercase tracking-wider hover:bg-[#c9a776]/10 bg-[#FDFBF7]"
                  >
                    Apple Calendar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalendarExport("outlook")}
                    className="px-5 py-2.5 border border-[#c9a776]/30 text-xs font-sans uppercase tracking-wider hover:bg-[#c9a776]/10 bg-[#FDFBF7]"
                  >
                    Outlook
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Save Invitation */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.14em] text-xs text-[#b8924f] hover:text-[#6B2D2A] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t("btn.save", lang)}</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-2 rounded-full border border-[#c9a776]/40 bg-[#FDFBF7]/80 px-4 py-1.5 text-xs text-muted-foreground hover:text-[#6B2D2A] hover:border-[#6B2D2A]/60 transition-colors shadow-xs"
            >
              <Languages className="w-3.5 h-3.5 text-[#b8924f]" />
              <span
                style={{
                  fontFamily: isKn ? "var(--font-sans)" : "var(--font-kannada)",
                }}
              >
                {isKn ? "Read in English" : "ಕನ್ನಡದಲ್ಲಿ ಓದಿ"}
              </span>
            </button>
          </div>

          {/* Close the Palace Doors at the end of the invite */}
          {onCloseDoor && (
            <div className="flex justify-center pt-7 pb-2">
              <button
                type="button"
                onClick={onCloseDoor}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#c9a776]/50 bg-[#FDFBF7] text-[#6B2D2A] hover:bg-[#6B2D2A] hover:text-[#FAF3E8] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all shadow-xs hover:shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span
                  style={
                    isKn
                      ? { fontFamily: "var(--font-kannada)", fontSize: "0.95rem" }
                      : undefined
                  }
                >
                  {t("door.close", lang)}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom RSVP Action Bar */}
      {showRsvp && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={onOpenRsvp}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#6B2D2A] hover:bg-[#582421] text-white font-sans uppercase tracking-widest text-xs font-bold shadow-xl hover:scale-105 transition-all cursor-pointer ring-2 ring-[#c9a776]/50"
          >
            <span>💌</span>
            <span>{t("rsvp.fab", lang)}</span>
          </button>
        </div>
      )}
    </div>
  );
}
