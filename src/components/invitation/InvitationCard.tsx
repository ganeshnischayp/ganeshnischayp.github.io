import React, { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Download,
  Languages,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  ExternalLink,
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
  const [whenOpen, setWhenOpen] = useState(false);
  const [whereOpen, setWhereOpen] = useState(false);
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
                <>
                  <p
                    className="leading-[1.5] font-semibold golden-wave-hover"
                    style={{
                      fontFamily: "var(--font-kannada-display)",
                      fontSize: "clamp(1.85rem, 7vw, 3.75rem)",
                    }}
                  >
                    {coupleKn}
                  </p>
                  <p className="text-xs md:text-sm font-sans uppercase tracking-[0.22em] text-[#8a6a33] font-semibold pt-1 transition-colors duration-300 group-hover:text-[#b8860b]">
                    ಪವಿತ್ರ ವಿವಾಹ ಬಂಧನ · ಶುಭ ಸಮಾರಂಭ
                  </p>
                </>
              ) : (
                <p className="text-xs md:text-sm font-sans uppercase tracking-[0.25em] text-[#8a6a33] font-semibold pt-1 transition-colors duration-300 group-hover:text-[#b8860b]">
                  A Sacred Union · Wedding Celebration
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
          {/* Left Column: 2 Distinct Padded Buttons with Name When and Where */}
          <div className="space-y-5 text-center md:text-left">
            {/* The 2 Buttons with Padding */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* WHEN BUTTON */}
              <button
                type="button"
                onClick={() => setWhenOpen((prev) => !prev)}
                aria-expanded={whenOpen}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl border text-base sm:text-lg font-serif font-medium transition-all shadow-xs cursor-pointer select-none active:scale-[0.98] ${
                  whenOpen
                    ? "bg-[#6B2D2A] text-white border-[#6B2D2A] shadow-md ring-2 ring-[#c9a776]/40"
                    : "bg-[#FFFDF9] text-[#6B2D2A] border-[#c9a776]/60 hover:bg-[#F3E5C8]/50 hover:border-[#b8924f]"
                }`}
              >
                <CalendarDays className={`w-4 h-4 shrink-0 ${whenOpen ? "text-[#f5d799]" : "text-[#b8924f]"}`} />
                <span>{t("when.label", lang)}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    whenOpen ? "rotate-180 text-[#f5d799]" : "rotate-0 text-[#b8924f]"
                  }`}
                />
              </button>

              {/* WHERE BUTTON */}
              <button
                type="button"
                onClick={() => setWhereOpen((prev) => !prev)}
                aria-expanded={whereOpen}
                className={`w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl border text-base sm:text-lg font-serif font-medium transition-all shadow-xs cursor-pointer select-none active:scale-[0.98] ${
                  whereOpen
                    ? "bg-[#6B2D2A] text-white border-[#6B2D2A] shadow-md ring-2 ring-[#c9a776]/40"
                    : "bg-[#FFFDF9] text-[#6B2D2A] border-[#c9a776]/60 hover:bg-[#F3E5C8]/50 hover:border-[#b8924f]"
                }`}
              >
                <MapPin className={`w-4 h-4 shrink-0 ${whereOpen ? "text-[#f5d799]" : "text-[#b8924f]"}`} />
                <span>{t("where.label", lang)}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                    whereOpen ? "rotate-180 text-[#f5d799]" : "rotate-0 text-[#b8924f]"
                  }`}
                />
              </button>
            </div>

            {/* WHEN DETAILS (shows below when When button is clicked) */}
            <AnimatePresence>
              {whenOpen && (
                <motion.div
                  key="when-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl border border-[#c9a776]/45 bg-[#FFFDF9] p-4 sm:p-6 space-y-4 shadow-sm text-left">
                    {/* Header */}
                    <div className="flex items-center gap-2 pb-2 border-b border-[#c9a776]/25">
                      <CalendarDays className="w-4 h-4 text-[#8a6a33]" />
                      <span className="font-sans uppercase tracking-[0.2em] text-[11px] text-[#8a6a33] font-medium">
                        {t("when.label", lang)} · {isKn ? "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ" : "Date & Schedule"}
                      </span>
                    </div>

                    {/* Event 1: Reception */}
                    <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-[#c9a776]/35 text-left space-y-1.5 shadow-2xs">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#b8924f]" />
                        <span className="font-sans text-[11px] uppercase tracking-wider text-[#8a6a33] font-medium">
                          {isKn ? "ವರೋಪಚಾರ & ಆರತಕ್ಷತೆ" : "Grand Reception"}
                        </span>
                      </div>
                      <p
                        className="text-lg sm:text-xl font-medium text-[#4A1F1D] leading-snug"
                        style={{
                          fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                        }}
                      >
                        {isKn ? "2026 ನವೆಂಬರ್ 25, ಬುಧವಾರ" : "Wednesday, 25th Nov 2026"}
                      </p>
                      <div className="pt-1.5 border-t border-[#c9a776]/20 flex flex-col gap-0.5 text-sm">
                        <span className="text-[#6B2D2A] font-medium">
                          {isKn ? "ಸಂಜೆ 7:00 ಗಂಟೆಯಿಂದ" : "7:00 PM onwards"}
                        </span>
                        <span className="text-[#5C5248]">
                          {isKn ? "ಶುಭಾಶಯ ಸ್ವೀಕಾರ & ಪ್ರೀತಿಯ ಭೋಜನ" : "Greetings, Welcoming & Grand Dinner"}
                        </span>
                      </div>
                    </div>

                    {/* Event 2: Shubha Muhurtha - Clean new lines on mobile, gentle elegant text without heavy bolding */}
                    <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-[#c9a776]/45 text-left space-y-1.5 shadow-2xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">💍</span>
                        <span className="font-sans text-[11px] uppercase tracking-wider text-[#8a6a33] font-medium">
                          {isKn ? "ಶುಭ ಮುಹೂರ್ತ (ಮಾಂಗಲ್ಯ ಧಾರಣೆ)" : "Shubha Muhurtha"}
                        </span>
                      </div>

                      {/* Date */}
                      <p
                        className="text-lg sm:text-xl font-medium text-[#4A1F1D] leading-snug"
                        style={{
                          fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                        }}
                      >
                        {isKn ? "2026 ನವೆಂಬರ್ 26, ಗುರುವಾರ" : "Thursday, 26th Nov 2026"}
                      </p>

                      {/* Time Details: Coming on clean new lines on mobile without shouting bold letters */}
                      <div className="pt-1.5 border-t border-[#c9a776]/20 flex flex-col gap-0.5 text-sm">
                        {/* Line 1: Time */}
                        <span className="text-base text-[#6B2D2A] font-medium">
                          {isKn ? "ಬೆಳಗ್ಗೆ 8:45 ರಿಂದ 9:30 ರವರೆಗೆ" : "8:45 AM to 9:30 AM"}
                        </span>

                        {/* Line 2: Dhanur Lagna (on new line on mobile) */}
                        <span className="text-[#8C531B]">
                          {isKn ? "(ಧನುರ್ ಲಗ್ನ ಸುಮುಹೂರ್ತದಲ್ಲಿ)" : "(Dhanur Lagna)"}
                        </span>

                        {/* Line 3: Mangalya Dharana (on new line on mobile) */}
                        <span className="text-[#4A3D36]">
                          {isKn ? "ಮಾಂಗಲ್ಯ ಧಾರಣ ಮಹೋತ್ಸವ" : "Mangalya Dharana"}
                        </span>
                      </div>
                    </div>

                    {/* Quick Add to Calendar Action */}
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="w-full text-[10px] font-sans uppercase tracking-wider text-[#8a6a33] font-medium">
                        {isKn ? "ಕ್ಯಾಲೆಂಡರ್ಗೆ ಸೇರಿಸಿ:" : "Add to Calendar:"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCalendarExport("google")}
                        className="px-3.5 py-1.5 rounded-lg border border-[#c9a776]/40 text-xs font-sans tracking-wide hover:bg-[#c9a776]/15 bg-white text-[#6B2D2A] transition-colors cursor-pointer shadow-2xs"
                      >
                        Google
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCalendarExport("apple")}
                        className="px-3.5 py-1.5 rounded-lg border border-[#c9a776]/40 text-xs font-sans tracking-wide hover:bg-[#c9a776]/15 bg-white text-[#6B2D2A] transition-colors cursor-pointer shadow-2xs"
                      >
                        Apple
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCalendarExport("outlook")}
                        className="px-3.5 py-1.5 rounded-lg border border-[#c9a776]/40 text-xs font-sans tracking-wide hover:bg-[#c9a776]/15 bg-white text-[#6B2D2A] transition-colors cursor-pointer shadow-2xs"
                      >
                        Outlook
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* WHERE DETAILS (shows below when Where button is clicked) */}
            <AnimatePresence>
              {whereOpen && (
                <motion.div
                  key="where-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl border border-[#c9a776]/45 bg-[#FFFDF9] p-4 sm:p-6 space-y-4 shadow-sm text-left">
                    {/* Header */}
                    <div className="flex items-center gap-2 pb-2 border-b border-[#c9a776]/25">
                      <MapPin className="w-4 h-4 text-[#8a6a33]" />
                      <span className="font-sans uppercase tracking-[0.2em] text-[11px] text-[#8a6a33] font-medium">
                        {t("where.label", lang)} · {isKn ? "ಸ್ಥಳ & ವಿಳಾಸ" : "Venue & Location"}
                      </span>
                    </div>

                    {/* Venue Name & Address */}
                    <div className="space-y-1">
                      <p
                        className="text-lg sm:text-xl text-[#4A1F1D] font-medium leading-tight"
                        style={{
                          fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)",
                        }}
                      >
                        {isKn ? VENUE_NAME_KN : VENUE_NAME}
                      </p>
                      <p
                        className="text-sm text-[#4A3D36] leading-relaxed pt-0.5"
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
                    </div>

                    {/* View on Google Maps Link Button */}
                    <div>
                      <a
                        href={VENUE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6B2D2A] text-white hover:bg-[#853733] font-sans font-medium text-xs uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <span>{t("map.view", lang)}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Embedded Map Panel */}
                    <div className="rounded-2xl overflow-hidden border border-[#c9a776]/40 shadow-xs bg-white">
                      <iframe
                        title="Savithramma Kariyappa Gowda Kalyana Mantapa, Channarayapatna"
                        src={VENUE_EMBED_URL}
                        className="w-full h-52 sm:h-60 border-0 block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
