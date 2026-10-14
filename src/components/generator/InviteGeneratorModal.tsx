import React, { useState, useEffect } from "react";
import { X, Copy, Check, Share2, Sparkles, ExternalLink, Heart, CheckCircle2 } from "lucide-react";
import { encodeInvite, encodeBase64Name, RelationType } from "../../lib/inviteCodec";

interface InviteGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialShowRsvp?: boolean;
  onShowRsvpChange?: (val: boolean) => void;
}

export function InviteGeneratorModal({
  isOpen,
  onClose,
  initialShowRsvp = true,
  onShowRsvpChange,
}: InviteGeneratorModalProps) {
  const [name, setName] = useState("");
  const [rel, setRel] = useState<RelationType>("friend");
  const [lang, setLang] = useState<"kn" | "en">("en");
  const [showCelebration, setShowCelebration] = useState(true);
  const [showRsvp, setShowRsvp] = useState(initialShowRsvp);
  const [blessing, setBlessing] = useState(false);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync state when modal opens or initial props change
  useEffect(() => {
    if (isOpen) {
      setShowRsvp(initialShowRsvp);
    }
  }, [isOpen, initialShowRsvp]);

  if (!isOpen) return null;

  const handleToggleShowRsvp = (checked: boolean) => {
    setShowRsvp(checked);
    onShowRsvpChange?.(checked);
  };

  const b64Name = name.trim() ? encodeBase64Name(name.trim()) : "";
  const baseOrigin = (() => {
    if (typeof window === "undefined") return "";
    const origin = window.location.origin;
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (window.location.hostname.endsWith("github.io") && segments.length > 1) {
      return `${origin}/${segments[0]}`;
    }
    return origin;
  })();

  // Construct short, clean URL:
  // - Bride First is permanent default (no gf query param needed)
  // - Default RSVP On: query param is omitted
  // - RSVP Off unchecked: rsvp=0
  const queryParts: string[] = [];
  if (!showRsvp) queryParts.push("rsvp=0");
  if (lang === "kn") queryParts.push("l=kn");
  if (rel && rel !== "friend") queryParts.push(`rel=${rel}`);
  if (note.trim()) queryParts.push(`msg=${encodeURIComponent(note.trim())}`);
  if (!showCelebration) queryParts.push("cel=0");
  if (blessing) queryParts.push("bw=1");

  const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

  const fullUrl = b64Name
    ? `${baseOrigin}/${b64Name}${queryStr}`
    : `${baseOrigin}/${queryStr}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const couple = "Yashaswini & Nischay";
    const text = `You're warmly invited to celebrate the wedding of ${couple}!\n\n📅 Reception: 25th Nov 2026 (7:00 PM)\n💍 Muhurtha: 26th Nov 2026 (8:45 AM - 9:30 AM)\n📍 Savithramma Kariyappa Gowda Kalyana Mantapa, Channarayapatna\n\nOpen your personal invitation: ${fullUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FCF8F0] border border-[#c9a776]/40 shadow-2xl p-6 sm:p-8 my-auto text-[#2a2a2a]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-[#6B2D2A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1.5 mb-6">
          <span className="inline-flex p-2 rounded-full bg-[#6B2D2A]/10 text-[#6B2D2A]">
            <Sparkles className="w-4 h-4" />
          </span>
          <h3
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Create Personalized Invitation
          </h3>
          <p className="text-xs text-muted-foreground">
            Generate a personalized link for your guests with custom names, display order, and settings.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1 font-semibold">
              Guest Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh, Priya, Kumar & Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#c9a776]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1 font-semibold">
                Relationship
              </label>
              <select
                value={rel}
                onChange={(e) => setRel(e.target.value as RelationType)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#c9a776]"
              >
                <option value="friend">Friend</option>
                <option value="family">Family</option>
                <option value="elder">Elder (Avaru)</option>
                <option value="">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1 font-semibold">
                Language
              </label>
              <div className="grid grid-cols-2 gap-1 p-0.5 rounded-xl border border-[#c9a776]/30 bg-[#FDFBF7]">
                <button
                  type="button"
                  onClick={() => setLang("kn")}
                  className={`py-1.5 text-xs rounded-lg cursor-pointer transition-colors ${
                    lang === "kn"
                      ? "bg-[#6B2D2A] text-white font-medium shadow-xs"
                      : "text-muted-foreground hover:text-[#6B2D2A]"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`py-1.5 text-xs rounded-lg cursor-pointer transition-colors ${
                    lang === "en"
                      ? "bg-[#6B2D2A] text-white font-medium shadow-xs"
                      : "text-muted-foreground hover:text-[#6B2D2A]"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1 font-semibold">
              Personal Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Can't wait to celebrate together in Channarayapatna!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7] focus:outline-none focus:ring-2 focus:ring-[#c9a776]"
            />
          </div>

          {/* Card Preferences: RSVP */}
          <div className="space-y-2.5 pt-3 border-t border-[#c9a776]/30">
            <h4 className="text-[11px] uppercase tracking-wider text-[#8a6a33] font-sans font-bold flex items-center gap-1.5">
              <span>Card Preferences</span>
            </h4>

            {/* Include RSVP Toggle Card */}
            <label
              className={`block p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                showRsvp
                  ? "bg-[#F7EFE1] border-emerald-600/50 shadow-xs ring-1 ring-emerald-600/20"
                  : "bg-[#FDFBF7] border-[#c9a776]/40 hover:border-[#c9a776]"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={showRsvp}
                  onChange={(e) => handleToggleShowRsvp(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-emerald-700 cursor-pointer"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#4a1f1d]">
                      Include RSVP Button & Form
                    </span>
                    <span
                      className={`text-[10px] font-sans font-semibold uppercase px-2 py-0.5 rounded-full ${
                        showRsvp
                          ? "bg-emerald-700 text-white"
                          : "bg-stone-300 text-stone-700"
                      }`}
                    >
                      {showRsvp ? "RSVP Enabled" : "RSVP Hidden"}
                    </span>
                  </div>

                  <p className="text-xs font-medium">
                    {showRsvp ? (
                      <span className="text-emerald-800">
                        💌 Floating RSVP button active (guests can DM attendance on WhatsApp)
                      </span>
                    ) : (
                      <span className="text-stone-600">
                        🚫 RSVP button and submission form will be hidden on this invitation (?rsvp=0)
                      </span>
                    )}
                  </p>

                  <p className="text-[11px] text-muted-foreground leading-normal">
                    {showRsvp
                      ? "Guests can tap 'RSVP Attendance' to submit guest count & blessings directly to your WhatsApp."
                      : "Removes the floating RSVP button completely for this guest link."}
                  </p>
                </div>
              </div>
            </label>
          </div>

          {/* Generated URL Box */}
          <div className="pt-3 border-t border-[#c9a776]/30 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-[#b8924f] font-sans font-medium">
                Personalized Link
              </label>
              <span className="text-[11px] font-mono text-[#6B2D2A] bg-[#c9a776]/15 px-2 py-0.5 rounded">
                Bride First • {showRsvp ? "RSVP On" : "RSVP Off"}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F4EBDA]/60 border border-[#c9a776]/40 text-xs font-mono break-all text-[#4a1f1d]">
              {fullUrl}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="py-2.5 px-3 rounded-xl bg-[#6B2D2A] text-white text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#582421] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Link"}
              </button>

              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                WhatsApp
              </button>

              <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl border border-[#6B2D2A] text-[#6B2D2A] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#6B2D2A]/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Preview
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
