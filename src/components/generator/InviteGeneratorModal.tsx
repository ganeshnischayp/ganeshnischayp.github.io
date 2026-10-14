import React, { useState } from "react";
import { X, Copy, Check, Share2, Sparkles, ExternalLink } from "lucide-react";
import { encodeInvite, encodeBase64Name, RelationType } from "../../lib/inviteCodec";

interface InviteGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteGeneratorModal({ isOpen, onClose }: InviteGeneratorModalProps) {
  const [name, setName] = useState("");
  const [rel, setRel] = useState<RelationType>("friend");
  const [lang, setLang] = useState<"kn" | "en">("en");
  const [showCelebration, setShowCelebration] = useState(true);
  const [showRsvp, setShowRsvp] = useState(true);
  const [blessing, setBlessing] = useState(false);
  const [groomFirst, setGroomFirst] = useState(true);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const token = encodeInvite({
    name,
    rel,
    lang,
    showCelebration,
    showRsvp,
    blessing,
    groomFirst,
    note,
  });

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
  const fullUrl = b64Name
    ? `${baseOrigin}/${b64Name}?d=${token}`
    : `${baseOrigin}/?d=${token}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const couple = groomFirst ? "Nischay & Yashaswini" : "Yashaswini & Nischay";
    const text = `You're warmly invited to celebrate the wedding of ${couple}!\n\n📅 Reception: 25th Nov 2026 (7:00 PM)\n💍 Muhurtha: 26th Nov 2026 (8:45 AM - 9:30 AM)\n📍 Savithramma Kariyappa Gowda Kalyana Mantapa, Channarayapatna\n\nOpen your personal invitation: ${fullUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FCF8F0] border border-[#c9a776]/40 shadow-2xl p-6 sm:p-8 my-auto text-[#2a2a2a]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-[#6B2D2A] transition-colors"
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
            Generate a personalized link for your guests with custom names and settings.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1">
              Guest Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh, Priya, Kumar & Family"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1">
                Relationship
              </label>
              <select
                value={rel}
                onChange={(e) => setRel(e.target.value as RelationType)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7]"
              >
                <option value="friend">Friend</option>
                <option value="family">Family</option>
                <option value="elder">Elder (Avaru)</option>
                <option value="">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1">
                Language
              </label>
              <div className="grid grid-cols-2 gap-1 p-0.5 rounded-xl border border-[#c9a776]/30 bg-[#FDFBF7]">
                <button
                  type="button"
                  onClick={() => setLang("kn")}
                  className={`py-1.5 text-xs rounded-lg ${
                    lang === "kn"
                      ? "bg-[#6B2D2A] text-white font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`py-1.5 text-xs rounded-lg ${
                    lang === "en"
                      ? "bg-[#6B2D2A] text-white font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground font-sans mb-1">
              Personal Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Can't wait to celebrate together in Channarayapatna!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7]"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-[#c9a776]/20">
            <label className="flex items-center gap-2.5 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={showRsvp}
                onChange={(e) => setShowRsvp(e.target.checked)}
                className="rounded accent-[#6B2D2A]"
              />
              <span>Include RSVP button & form</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={groomFirst}
                onChange={(e) => setGroomFirst(e.target.checked)}
                className="rounded accent-[#6B2D2A]"
              />
              <span>Groom first order (Nischay & Yashaswini)</span>
            </label>
          </div>

          {/* Generated URL Box */}
          <div className="pt-3 border-t border-[#c9a776]/30 space-y-2">
            <label className="block text-xs uppercase tracking-wider text-[#b8924f] font-sans font-medium">
              Personalized Link
            </label>
            <div className="p-2.5 rounded-xl bg-[#F4EBDA]/60 border border-[#c9a776]/40 text-xs font-mono break-all text-[#4a1f1d]">
              {fullUrl}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="py-2.5 px-3 rounded-xl bg-[#6B2D2A] text-white text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#582421] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Link"}
              </button>

              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#20ba5a] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
