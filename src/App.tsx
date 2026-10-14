import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { ArrowLeft, Plus, Volume2, VolumeX } from "lucide-react";
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

  // Read invitee name encoded in base64 format from URL path parameter (e.g. /UmFtZXNo, /TmlzaHVZYXNodQ==)
  const [pathInvitee, setPathInvitee] = useState<string | null>(() => getInviteeNameFromUrl());

  useEffect(() => {
    const handleUrlCheck = () => {
      const current = getInviteeNameFromUrl();
      if (current) setPathInvitee(current);
    };

    handleUrlCheck();
    window.addEventListener("popstate", handleUrlCheck);
    return () => window.removeEventListener("popstate", handleUrlCheck);
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

  // Only show the top nav bar if the invitee name is NishuYashu
  const isPrivilegedAdmin = useMemo(() => {
    const normalize = (val?: string | null) =>
      (val || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const target = "nishuyashu";
    if (normalize(guestName).includes(target)) return true;
    if (normalize(invite?.n).includes(target)) return true;
    if (normalize(pathInvitee).includes(target)) return true;
    if (typeof window !== "undefined") {
      const path = normalize(window.location.pathname);
      const search = normalize(window.location.search);
      if (path.includes(target) || search.includes(target)) return true;
    }
    return false;
  }, [guestName, invite?.n, pathInvitee]);

  // Set initial language if payload specifies 'kn' or 'en'
  useEffect(() => {
    if (invite.l === "kn") {
      setLang("kn");
    } else {
      setLang("en");
    }
  }, [invite.l]);

  // Background Audio Controller for romantic-vows.mp3
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserToggled, setHasUserToggled] = useState(false);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasUserToggled(true);

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.55;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback prevented:", err);
          setIsPlaying(false);
        });
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

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

    // Auto-start background music on user's door tap gesture
    if (audioRef.current && !hasUserToggled && audioRef.current.paused) {
      audioRef.current.volume = 0.55;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
    }

    setTimeout(() => {
      setPhase("through");
    }, 1200);

    setTimeout(() => {
      setPhase("card");
    }, 2000);
  }, [phase, hasUserToggled]);

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

            {/* Top Navigation Bar - ONLY shown if invitee is NishuYashu */}
            {isPrivilegedAdmin && (
              <header className="sticky top-0 z-30 w-full bg-[#FCF8F0]/90 backdrop-blur-md border-b border-[#c9a776]/30 px-3 sm:px-6 py-2.5 shadow-xs">
                <div className="max-w-[63.46rem] mx-auto flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#6B2D2A] text-white text-[11px] font-sans font-bold uppercase tracking-wider">
                      Admin Mode: Nishu & Yashu
                    </span>
                  </div>

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
                          loadPreset({ name: "Suresh & Family", rel: "elder", lang: "kn" })
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
            )}

            {/* Main Content Area */}
            <main className="w-full max-w-[63.46rem] mx-auto pt-5 md:pt-10 px-3.5 sm:px-6 md:px-8 pb-24 md:pb-28">
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
                onCloseDoor={handleCloseDoor}
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

      {/* BACKGROUND MUSIC (romantic-vows.mp3) */}
      <audio
        ref={audioRef}
        src="/romantic-vows.mp3"
        loop
        preload="auto"
      />

      {/* FLOATING MUTE / UNMUTE BUTTON AT BOTTOM-LEFT CORNER */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute background music" : "Play romantic vows music"}
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#FCF8F0]/95 backdrop-blur-md border border-[#c9a776]/50 shadow-lg text-[#6B2D2A] hover:bg-[#FAF3E8] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group select-none"
        title={isPlaying ? "Mute music" : "Play music"}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <>
              {/* Soft pulsating gold ring */}
              <span className="absolute -inset-1 rounded-full bg-[#c9a776]/30 animate-ping opacity-75 pointer-events-none" />
              <Volume2 className="w-4 h-4 text-[#6B2D2A] animate-pulse" />
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground group-hover:text-[#6B2D2A] transition-colors" />
          )}
        </div>
        <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#6B2D2A] hidden sm:inline">
          {isPlaying ? "Mute Music" : "Play Music"}
        </span>
      </button>
    </div>
  );
}
