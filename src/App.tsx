import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, Plus, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  decodeInvite,
  encodeInvite,
  NUM_TO_REL,
  RelationType,
  getInviteeNameFromUrl,
  encodeBase64Name,
} from "./lib/inviteCodec";
import { DoorScene } from "./components/invitation/DoorScene";
import { InvitationCard } from "./components/invitation/InvitationCard";
import { RsvpModal } from "./components/invitation/RsvpModal";
import { InviteGeneratorModal } from "./components/generator/InviteGeneratorModal";
import { t } from "./data/i18n";

// Default token for Nischay & Yashaswini wedding
const DEFAULT_PARAM = encodeInvite({
  name: "Beloved Family & Friends",
  rel: "friend",
  lang: "en",
  showCelebration: true,
  showRsvp: true,
  groomFirst: true,
});

export default function App() {
  const [phase, setPhase] = useState<"load" | "ready" | "opening" | "through" | "card">("load");
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "kn">("en");

  // Read invitee name encoded in base64 format from URL path parameter (e.g. /UmFtZXNo)
  const pathInvitee = useMemo(() => {
    return getInviteeNameFromUrl();
  }, []);

  // Read search params
  const [rawToken, setRawToken] = useState(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      return sp.get("d") || sp.get("for") || DEFAULT_PARAM;
    }
    return DEFAULT_PARAM;
  });

  // Decode the invite payload
  const invite = useMemo(() => {
    const data = decodeInvite(rawToken);
    return data;
  }, [rawToken]);

  // Invitee name: path param encoded in base64 takes highest precedence!
  const guestName = pathInvitee || invite.n || "Beloved Family & Friends";
  const rel: RelationType = NUM_TO_REL[invite.r ?? 3] || "friend";
  const showCelebration = invite.cel !== 0;
  const showRsvp = invite.rsvp !== 0;
  const showBestWishes = invite.bw === 1;
  const groomFirst = invite.gf !== 0; // Default groom first: Nischay & Yashaswini
  const note = invite.m || "";
  const honorific = invite.h || "";

  // Set initial language if payload specifies 'kn' or 'en'
  useEffect(() => {
    if (invite.l === "kn") {
      setLang("kn");
    } else {
      setLang("en");
    }
  }, [invite.l]);

  // Phase progression: load -> ready after 1.5s
  useEffect(() => {
    if (phase === "load") {
      const timer = setTimeout(() => {
        setPhase("ready");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle tap on palace door: opening -> through -> card
  const handleTapDoor = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("opening");

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20);
    }

    setTimeout(() => {
      setPhase("through");
    }, 1200);

    setTimeout(() => {
      setPhase("card");
    }, 2000);
  }, [phase]);

  // Close the door / Seal & Return
  const handleCloseDoor = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPhase("ready");
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "kn" ? "en" : "kn"));
  }, []);

  // Quick preset loader helper
  const loadPreset = (preset: { name: string; rel: RelationType; lang?: "kn" | "en" }) => {
    const newToken = encodeInvite({
      name: preset.name,
      rel: preset.rel,
      lang: preset.lang || "kn",
      showCelebration: true,
      showRsvp: true,
      groomFirst: true,
    });
    setRawToken(newToken);
    if (preset.lang) setLang(preset.lang);
    const b64 = encodeBase64Name(preset.name);
    window.history.replaceState(null, "", `/${b64}?d=${newToken}`);
  };

  const isKn = lang === "kn";

  return (
    <div className="min-h-screen relative font-sans bg-[#0b0908]">
      {/* DOOR ENTRANCE PHASE */}
      {phase !== "card" && (
        <DoorScene
          phase={phase}
          onTapDoor={handleTapDoor}
          guestName={guestName}
          lang={lang}
          rel={rel}
        />
      )}

      {/* WEDDING INVITATION CARD VIEW */}
      <AnimatePresence>
        {phase === "card" && (
          <motion.div
            key="invitation-card-view"
            className="relative min-h-screen z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background scene wallpaper */}
            <div
              className="fixed inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/einvitation/scene-alt4.jpg)" }}
              aria-hidden="true"
            />
            <div
              className="fixed inset-0 -z-10 bg-[#FDFBF7]/85 backdrop-blur-[2px]"
              aria-hidden="true"
            />

            {/* Floating Golden Motes */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 overflow-hidden z-10"
            >
              {[
                { top: "12%", left: "6%", s: 4, d: 7, delay: 0.2 },
                { top: "24%", right: "8%", s: 5, d: 8, delay: 1.1 },
                { top: "38%", left: "12%", s: 3, d: 6.5, delay: 0.5 },
                { top: "54%", right: "6%", s: 4, d: 9, delay: 1.8 },
                { top: "72%", left: "8%", s: 5, d: 7.5, delay: 0.9 },
                { top: "86%", right: "12%", s: 3, d: 8, delay: 1.4 },
              ].map((mote, i) => (
                <span
                  key={i}
                  className="einvite-mote absolute rounded-full"
                  style={{
                    top: mote.top,
                    left: mote.left,
                    right: mote.right,
                    width: mote.s,
                    height: mote.s,
                    background:
                      "radial-gradient(circle, #ffedc4 0%, rgba(255,214,140,0) 70%)",
                    boxShadow: "0 0 8px 2px rgba(255,219,150,0.5)",
                    // @ts-expect-error CSS variable
                    "--dur": `${mote.d}s`,
                    "--delay": `${mote.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 w-full bg-[#FCF8F0]/90 backdrop-blur-md border-b border-[#c9a776]/30 px-3 sm:px-6 py-2.5 shadow-xs">
              <div className="max-w-[63.46rem] mx-auto flex items-center justify-between gap-2">
                {/* Close the door button */}
                <button
                  type="button"
                  onClick={handleCloseDoor}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c9a776]/30 text-xs font-sans uppercase tracking-widest text-[#5c5546] hover:text-[#2f2a22] hover:bg-black/5 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span
                    style={
                      isKn
                        ? { fontFamily: "var(--font-kannada)", fontSize: "1.05rem" }
                        : undefined
                    }
                  >
                    {t("door.close", lang)}
                  </span>
                </button>

                {/* Preset Switcher & Action buttons */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground mr-1">
                    <span className="font-sans font-medium">Guest:</span>
                    <button
                      type="button"
                      onClick={() =>
                        loadPreset({ name: "Ramesh", rel: "friend", lang: "en" })
                      }
                      className={`px-2 py-0.5 rounded font-sans transition-colors cursor-pointer ${
                        guestName === "Ramesh"
                          ? "bg-[#6B2D2A] text-white"
                          : "hover:bg-black/5"
                      }`}
                    >
                      Ramesh
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        loadPreset({ name: "Suresh & Family", rel: "elder", lang: "en" })
                      }
                      className={`px-2 py-0.5 rounded font-sans transition-colors cursor-pointer ${
                        guestName.includes("Suresh")
                          ? "bg-[#6B2D2A] text-white"
                          : "hover:bg-black/5"
                      }`}
                    >
                      Suresh & Family
                    </button>
                  </div>

                  {/* Download Source Code ZIP */}
                  <a
                    href="/wedding-invitation-source.zip"
                    download="wedding-invitation-source.zip"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c9a776]/50 bg-[#FDFBF7] text-[#6B2D2A] text-xs font-sans uppercase tracking-wider font-semibold shadow-xs hover:bg-[#c9a776]/20 transition-all cursor-pointer"
                    title="Download complete project source files as .ZIP"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download ZIP</span>
                  </a>

                  {/* Create Custom Invite Link */}
                  <button
                    type="button"
                    onClick={() => setIsGeneratorOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#6B2D2A] text-white text-xs font-sans uppercase tracking-wider font-semibold shadow-xs hover:bg-[#582421] transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Invite</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="w-full max-w-[63.46rem] mx-auto pt-6 md:pt-10 px-2 sm:px-4 md:px-8 pb-24 md:pb-28">
              <InvitationCard
                guestName={guestName}
                guestToken={rawToken}
                rel={rel}
                note={note}
                honorific={honorific}
                lang={lang}
                showCelebration={showCelebration}
                groomFirst={groomFirst}
                showBestWishes={showBestWishes}
                onToggleLang={toggleLang}
                onOpenRsvp={() => setIsRsvpOpen(true)}
                showRsvp={showRsvp}
              />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP MODAL */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        lang={lang}
        guestName={guestName}
        guestToken={rawToken}
        rel={rel}
      />

      {/* CUSTOM INVITATION LINK GENERATOR MODAL */}
      <InviteGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
      />
    </div>
  );
}
