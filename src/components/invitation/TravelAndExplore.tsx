import React, { useState } from "react";
import {
  Train,
  Car,
  Compass,
  MapPin,
  ExternalLink,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { motion } from "motion/react";
import {
  TRAIN_INFO,
  ROAD_INFO,
  KNOWN_CITIES,
  CITY_ALIASES,
  VENUE_NAME,
  VENUE_ADDRESS,
  VENUE_MAPS_URL,
  VENUE_EMBED_URL,
} from "../../data/transitData";

export function TravelAndExplore() {
  const [transitMode, setTransitMode] = useState<"road" | "train" | "help">("road");

  // City helper state
  const [queryCity, setQueryCity] = useState("");
  const [suggestion, setSuggestion] = useState<{
    city: string;
    distance: number | null;
    mode: "train" | "road" | "help";
    message: string;
    known: boolean;
  } | null>(null);

  const handleCityLookup = (cityNameToLookup?: string) => {
    const input = (cityNameToLookup || queryCity).trim();
    if (!input) return;

    const normalized = input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(",")[0]
      .replace(/[^a-z\s]/g, " ")
      .replace(/^\s*from\s+/, "")
      .replace(/\s+/g, " ")
      .trim();

    const formattedName = input.replace(/\b\w/g, (c) => c.toUpperCase());
    const aliasKey = CITY_ALIASES[normalized] || normalized.replace(/\s+/g, "");
    const match = KNOWN_CITIES[aliasKey] || KNOWN_CITIES[normalized];

    if (!match) {
      setSuggestion({
        city: formattedName,
        distance: null,
        mode: "help",
        known: false,
        message: `We haven't mapped ${formattedName} yet — NH 75 connects smoothly to Channarayapatna. Let's check Google Maps directions.`,
      });
      return;
    }

    if (match.distance === 0) {
      setSuggestion({
        city: formattedName,
        distance: 0,
        mode: "road",
        known: true,
        message:
          "You're already in Channarayapatna! Savithramma Kariyappa Gowda Kalyana Mantapa is just a short auto or drive across town.",
      });
      return;
    }

    const verb =
      match.mode === "train"
        ? "a scenic train ride to Channarayapatna (CNPA) or Hassan Junction 🚂"
        : "a comfortable drive via the NH 75 expressway 🚗";

    const msg =
      match.distance <= 100
        ? `Roughly ${match.distance} km away — ${verb} is a pleasant short journey.`
        : `You're roughly ${match.distance} km away — we recommend ${verb}.`;

    setSuggestion({
      city: formattedName,
      distance: match.distance,
      mode: match.mode,
      known: true,
      message: msg,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header section */}
      <div className="text-center mb-7 space-y-3">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#c9a776]/40 bg-[#FDFBF7] text-[#b8924f] shadow-xs">
          <Compass className="w-5 h-5" strokeWidth={1.4} />
        </span>
        <div className="space-y-1">
          <h3 className="font-sans uppercase tracking-[0.28em] text-[11px] text-[#b8924f] font-semibold">
            How to Reach the Venue
          </h3>
          <p className="font-cursive text-3xl md:text-4xl text-[#6B2D2A]/90 leading-tight">
            find your way to Channarayapatna
          </p>
          <p className="text-xs text-muted-foreground font-serif italic max-w-md mx-auto pt-0.5">
            Convenient road expressway and direct railway connectivity from Bengaluru, Hassan, Mysuru, and Mangaluru.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative rounded-[1.75rem] border border-[#c9a776]/30 bg-gradient-to-b from-[#FCF8F0] to-[#FAF3E8] shadow-[0_20px_50px_-20px_rgba(60,45,30,0.18)] p-6 md:p-9 overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#c9a776]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#6B2D2A]/[0.05] blur-3xl"
        />

        {/* Mode switch bar */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#F1E9D9]/70 border border-[#c9a776]/25 mb-8">
          {[
            { id: "road" as const, label: "By Road", icon: Car, sub: "NH 75 Expressway" },
            { id: "train" as const, label: "By Train", icon: Train, sub: "CNPA / Hassan" },
            { id: "help" as const, label: "Plan Route", icon: HelpCircle, sub: "City Lookup" },
          ].map((item) => {
            const isActive = transitMode === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTransitMode(item.id)}
                className={`relative flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#6B2D2A] text-white shadow-sm"
                    : "text-[#8a7a52] hover:bg-[#FDFBF7]/60"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.8} />
                <span className="font-sans uppercase tracking-wider text-[11px] font-semibold text-center">
                  {item.label}
                </span>
                <span className={`text-[9px] font-normal hidden sm:inline ${isActive ? "text-white/80" : "text-muted-foreground/75"}`}>
                  {item.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Transit Mode content */}
        <div className="min-h-[220px]">
          {transitMode === "road" && (
            <motion.div
              key="road"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <dl className="divide-y divide-[#c9a776]/20">
                {ROAD_INFO.map((item) => (
                  <div key={item.label} className="py-3 first:pt-0">
                    <dt className="font-sans uppercase tracking-[0.2em] text-[10px] text-[#b8924f] mb-1 font-semibold">
                      {item.label}
                    </dt>
                    <dd
                      className="text-base sm:text-lg text-foreground/85 leading-snug font-medium"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="rounded-xl overflow-hidden border border-[#c9a776]/30 shadow-xs">
                <iframe
                  src={VENUE_EMBED_URL}
                  title="Route to Savithramma Kariyappa Gowda Kalyana Mantapa"
                  className="w-full h-44 border-0 block"
                  loading="lazy"
                />
              </div>
              <div>
                <a
                  href={VENUE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6B2D2A] text-white font-sans uppercase tracking-widest text-[11px] hover:bg-[#582421] transition-colors shadow-xs"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

          {transitMode === "train" && (
            <motion.div
              key="train"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <dl className="divide-y divide-[#c9a776]/20">
                {TRAIN_INFO.map((item) => (
                  <div key={item.label} className="py-3 first:pt-0">
                    <dt className="font-sans uppercase tracking-[0.2em] text-[10px] text-[#b8924f] mb-1 font-semibold">
                      {item.label}
                    </dt>
                    <dd
                      className="text-base sm:text-lg text-foreground/85 leading-snug font-medium"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="p-4 rounded-xl bg-[#FDFBF7]/80 border border-[#c9a776]/25">
                <p className="font-serif italic text-sm text-foreground/80 leading-relaxed">
                  <span className="text-[#6B2D2A] font-bold not-italic mr-1.5">Station Connectivity:</span>
                  Channarayapatna Railway Station (CNPA) is just 2.5 km away from the mantapa. Passenger and express trains connect directly from Bengaluru (Yesvantpur / KSR City), Hassan Junction, Mangaluru, and Karwar. Auto rickshaws are readily available right outside the station.
                </p>
              </div>
              <div>
                <a
                  href="https://www.irctc.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6B2D2A] text-white font-sans uppercase tracking-widest text-[11px] hover:bg-[#582421] transition-colors shadow-xs"
                >
                  Check IRCTC Trains
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

          {transitMode === "help" && (
            <motion.div
              key="help"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <p
                className="text-xl md:text-2xl text-foreground/85 font-medium"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Where are you travelling from?
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={queryCity}
                  onChange={(e) => setQueryCity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCityLookup()}
                  placeholder="Type your city (e.g. Bengaluru, Mysuru, Hassan)…"
                  className="flex-1 px-4 py-2.5 text-base bg-[#FDFBF7] border border-[#c9a776]/40 rounded-full focus:outline-none focus:border-[#6B2D2A] focus:ring-2 focus:ring-[#6B2D2A]/10 font-serif"
                />
                <button
                  type="button"
                  onClick={() => handleCityLookup()}
                  className="px-5 py-2.5 rounded-full bg-[#6B2D2A] text-white font-sans uppercase tracking-wider text-xs hover:bg-[#582421] transition-colors shadow-xs cursor-pointer font-semibold"
                >
                  Suggest
                </button>
              </div>

              {/* Quick popular city chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Bengaluru",
                  "Mysuru",
                  "Hassan",
                  "Mangaluru",
                  "Tumakuru",
                  "Mandya",
                  "Shivamogga",
                  "Hubballi",
                ].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setQueryCity(city);
                      handleCityLookup(city);
                    }}
                    className="text-[11px] px-3 py-1 rounded-full border border-[#c9a776]/35 text-muted-foreground hover:text-[#6B2D2A] hover:border-[#6B2D2A]/60 bg-[#FDFBF7]/60 transition-colors font-sans cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>

              {suggestion && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-[#c9a776]/25 space-y-3"
                >
                  <p
                    className="text-lg text-foreground/90 font-medium"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {suggestion.message}
                  </p>
                  {suggestion.known && (
                    <button
                      type="button"
                      onClick={() =>
                        setTransitMode(
                          suggestion.mode as "train" | "road"
                        )
                      }
                      className="inline-flex items-center gap-1 font-sans uppercase tracking-widest text-[11px] text-[#6B2D2A] border-b border-[#6B2D2A] pb-0.5 cursor-pointer font-semibold"
                    >
                      Show me {suggestion.mode} details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Venue footer info */}
        <div className="mt-8 pt-5 border-t border-[#c9a776]/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-[#b8924f] flex items-center gap-1 mb-0.5 font-semibold">
              <MapPin className="w-3 h-3" />
              The Wedding Venue
            </p>
            <p
              className="text-lg text-foreground/90 font-bold"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {VENUE_NAME}
            </p>
            <p className="text-xs text-muted-foreground">{VENUE_ADDRESS}</p>
          </div>
          <a
            href={VENUE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans uppercase tracking-wider text-xs text-[#6B2D2A] hover:underline font-semibold"
          >
            Get directions →
          </a>
        </div>
      </div>
    </div>
  );
}
