import React, { useState, useEffect } from "react";
import { X, Heart, Plus, Minus, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { t } from "../../data/i18n";

interface Companion {
  id: string;
  name: string;
  rel: string;
  age: "adult" | "child";
  foodPref: "veg" | "nonveg";
}

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: "en" | "kn" | "te";
  guestName?: string;
  guestToken?: string;
  rel?: string;
}

const WHATSAPP_NUMBER = "919491519909";
const WHATSAPP_DISPLAY = "+91 94915 19909";
const MAX_COMPANIONS = 3;

export function RsvpModal({
  isOpen,
  onClose,
  lang = "en",
  guestName = "",
  guestToken = "",
}: RsvpModalProps) {
  const [name, setName] = useState(guestName);
  const [phone, setPhone] = useState("");
  const [side, setSide] = useState<"both" | "bride" | "groom">("both");
  const [attending, setAttending] = useState<boolean>(true);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [foodPref, setFoodPref] = useState<"veg" | "nonveg">("nonveg");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    partySize: number;
    attending: boolean;
    isReturning?: boolean;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (guestName) setName(guestName);
  }, [guestName]);

  // Check if previously submitted
  useEffect(() => {
    if (!isOpen) return;
    try {
      const stored = localStorage.getItem("ourforever_rsvp_submissions");
      if (stored) {
        const list = JSON.parse(stored);
        const prev = list.find(
          (item: any) =>
            (guestToken && item.token === guestToken) ||
            (name && item.name.toLowerCase() === name.toLowerCase())
        );
        if (prev) {
          setSubmittedData({
            name: prev.name,
            partySize: prev.partySize || 1,
            attending: prev.attending,
            isReturning: true,
          });
        }
      }
    } catch {
      // ignore
    }
  }, [isOpen, guestToken, name]);

  const addCompanion = () => {
    if (companions.length >= MAX_COMPANIONS) return;
    setCompanions((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: "",
        rel: "Friend",
        age: "adult",
        foodPref: "nonveg",
      },
    ]);
  };

  const removeCompanion = (id: string) => {
    setCompanions((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCompanion = (id: string, updates: Partial<Companion>) => {
    setCompanions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg(t("rsvp.err.name", lang));
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(t("rsvp.err.phone", lang));
      return;
    }

    if (attending) {
      for (let i = 0; i < companions.length; i++) {
        if (!companions[i].name.trim()) {
          setErrorMsg(t("rsvp.err.guest", lang, { n: i + 1 }));
          return;
        }
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const partySize = attending ? 1 + companions.length : 0;
      const record = {
        name: name.trim(),
        phone: phone.trim(),
        side,
        attending,
        foodPref,
        companions,
        note: note.trim(),
        partySize,
        token: guestToken,
        timestamp: new Date().toISOString(),
      };

      try {
        const stored = localStorage.getItem("ourforever_rsvp_submissions");
        const list = stored ? JSON.parse(stored) : [];
        list.push(record);
        localStorage.setItem("ourforever_rsvp_submissions", JSON.stringify(list));
      } catch (err) {
        console.error("Local storage error:", err);
      }

      setIsSubmitting(false);
      setSubmittedData({
        name: name.trim(),
        partySize,
        attending,
      });

      if (attending) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#c9a776", "#6B2D2A", "#A3B18A", "#EDE2CB"],
        });
      }
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-lg rounded-2xl bg-[#FCF8F0] border border-[#c9a776]/40 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden text-[#2a2a2a]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-muted-foreground hover:text-[#6B2D2A] hover:bg-black/5 transition-colors"
          aria-label={t("rsvp.modal.close", lang)}
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Confirmation Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#A3B18A]/20 text-[#6B2D2A] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#A3B18A]" />
            </div>

            <h3
              className="text-2xl md:text-3xl text-foreground font-semibold"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {submittedData.attending
                ? t("rsvp.done.headline.yes", lang, {
                    name: submittedData.name,
                    n: submittedData.partySize,
                  })
                : t("rsvp.done.headline.no", lang, {
                    name: submittedData.name,
                  })}
            </h3>

            <p
              className="text-base text-muted-foreground max-w-sm mx-auto leading-relaxed italic"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {submittedData.attending
                ? submittedData.partySize > 1
                  ? t("rsvp.done.line.many", lang, {
                      n: submittedData.partySize - 1,
                    })
                  : t("rsvp.done.line.solo", lang)
                : t("rsvp.done.line.no", lang)}
            </p>

            <div className="pt-4 border-t border-[#c9a776]/25">
              <p className="text-xs text-muted-foreground mb-3 font-sans">
                Need to change anything? Message us directly on WhatsApp:
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-sans text-xs uppercase tracking-wider font-semibold shadow-xs hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-full border border-[#c9a776]/40 text-xs font-sans uppercase tracking-widest text-muted-foreground hover:text-[#6B2D2A]"
              >
                {t("rsvp.modal.close", lang)}
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-1.5">
              <span className="inline-flex items-center justify-center p-2 rounded-full bg-[#6B2D2A]/10 text-[#6B2D2A]">
                <Heart className="w-4 h-4 fill-current" />
              </span>
              <h3
                className="text-2xl md:text-3xl text-foreground"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t("rsvp.label", lang)}
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                {t("rsvp.lead", lang)}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs text-center font-sans">
                {errorMsg}
              </div>
            )}

            {/* Attendance Toggle */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider text-[#b8924f] font-sans font-medium">
                {t("rsvp.attend.legend", lang)}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-sans uppercase tracking-wider font-medium transition-all ${
                    attending
                      ? "border-[#6B2D2A] bg-[#6B2D2A] text-white shadow-xs"
                      : "border-[#c9a776]/30 bg-[#FDFBF7] text-[#2a2a2a] hover:bg-[#F4EBDA]"
                  }`}
                >
                  {t("rsvp.attend.yes", lang)}
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-sans uppercase tracking-wider font-medium transition-all ${
                    !attending
                      ? "border-[#6B2D2A] bg-[#6B2D2A] text-white shadow-xs"
                      : "border-[#c9a776]/30 bg-[#FDFBF7] text-[#2a2a2a] hover:bg-[#F4EBDA]"
                  }`}
                >
                  {t("rsvp.attend.no", lang)}
                </button>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-sans">
                  {t("rsvp.name.label", lang)}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("rsvp.name.ph", lang)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7] focus:outline-none focus:border-[#6B2D2A] focus:ring-1 focus:ring-[#6B2D2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-sans">
                  {t("rsvp.phone.label", lang)}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("rsvp.phone.ph", lang)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7] focus:outline-none focus:border-[#6B2D2A] focus:ring-1 focus:ring-[#6B2D2A]"
                />
              </div>
            </div>

            {/* Which Side */}
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-sans">
                {t("rsvp.side.label", lang)}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "both" as const, label: t("rsvp.side.both", lang) },
                  { id: "bride" as const, label: t("rsvp.side.bride", lang) },
                  { id: "groom" as const, label: t("rsvp.side.groom", lang) },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSide(s.id)}
                    className={`py-1.5 text-xs rounded-lg border transition-all ${
                      side === s.id
                        ? "border-[#6B2D2A] bg-[#6B2D2A]/10 text-[#6B2D2A] font-semibold"
                        : "border-[#c9a776]/25 bg-[#FDFBF7] text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* If Attending: Meal preference & Companions */}
            {attending && (
              <div className="space-y-4 pt-2 border-t border-[#c9a776]/25">
                {/* Food Preference */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-sans">
                      {t("rsvp.food.you.label", lang)}
                    </label>
                    <span className="text-[10px] text-muted-foreground italic">
                      {t("rsvp.food.hint", lang)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFoodPref("nonveg")}
                      className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
                        foodPref === "nonveg"
                          ? "border-[#6B2D2A] bg-[#6B2D2A] text-white"
                          : "border-[#c9a776]/30 bg-[#FDFBF7] text-[#2a2a2a]"
                      }`}
                    >
                      🍗 {t("rsvp.food.nonveg", lang)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFoodPref("veg")}
                      className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
                        foodPref === "veg"
                          ? "border-[#6B2D2A] bg-[#6B2D2A] text-white"
                          : "border-[#c9a776]/30 bg-[#FDFBF7] text-[#2a2a2a]"
                      }`}
                    >
                      🥗 {t("rsvp.food.veg", lang)}
                    </button>
                  </div>
                </div>

                {/* Companions */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-sans">
                      {t("rsvp.party.label", lang)}
                    </label>
                    <span className="text-[10px] text-muted-foreground">
                      {t("rsvp.party.hint", lang, { max: MAX_COMPANIONS })}
                    </span>
                  </div>

                  {companions.map((comp, idx) => (
                    <div
                      key={comp.id}
                      className="p-3 rounded-xl bg-[#F4EBDA]/50 border border-[#c9a776]/30 space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#6B2D2A]">
                          {t("rsvp.guest.title", lang, { n: idx + 1 })}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeCompanion(comp.id)}
                          className="text-xs text-red-600 hover:underline flex items-center gap-0.5"
                        >
                          <Minus className="w-3 h-3" /> Remove
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder={t("rsvp.guest.name.ph", lang)}
                          value={comp.name}
                          onChange={(e) =>
                            updateCompanion(comp.id, { name: e.target.value })
                          }
                          className="px-3 py-1.5 text-xs rounded-lg border border-[#c9a776]/30 bg-[#FDFBF7]"
                        />

                        <select
                          value={comp.rel}
                          onChange={(e) =>
                            updateCompanion(comp.id, { rel: e.target.value })
                          }
                          className="px-3 py-1.5 text-xs rounded-lg border border-[#c9a776]/30 bg-[#FDFBF7]"
                        >
                          <option value="Spouse/Partner">Spouse/Partner</option>
                          <option value="Child">Child</option>
                          <option value="Parent">Parent</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Friend">Friend</option>
                          <option value="Relative">Relative</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateCompanion(comp.id, { age: "adult" })
                            }
                            className={`flex-1 py-1 text-[10px] rounded border ${
                              comp.age === "adult"
                                ? "bg-[#6B2D2A] text-white border-[#6B2D2A]"
                                : "bg-[#FDFBF7] border-[#c9a776]/30 text-muted-foreground"
                            }`}
                          >
                            Adult
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateCompanion(comp.id, { age: "child" })
                            }
                            className={`flex-1 py-1 text-[10px] rounded border ${
                              comp.age === "child"
                                ? "bg-[#6B2D2A] text-white border-[#6B2D2A]"
                                : "bg-[#FDFBF7] border-[#c9a776]/30 text-muted-foreground"
                            }`}
                          >
                            Child
                          </button>
                        </div>

                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateCompanion(comp.id, { foodPref: "nonveg" })
                            }
                            className={`flex-1 py-1 text-[10px] rounded border ${
                              comp.foodPref === "nonveg"
                                ? "bg-[#6B2D2A] text-white border-[#6B2D2A]"
                                : "bg-[#FDFBF7] border-[#c9a776]/30 text-muted-foreground"
                            }`}
                          >
                            Non-veg
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateCompanion(comp.id, { foodPref: "veg" })
                            }
                            className={`flex-1 py-1 text-[10px] rounded border ${
                              comp.foodPref === "veg"
                                ? "bg-[#6B2D2A] text-white border-[#6B2D2A]"
                                : "bg-[#FDFBF7] border-[#c9a776]/30 text-muted-foreground"
                            }`}
                          >
                            Veg
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {companions.length < MAX_COMPANIONS && (
                    <button
                      type="button"
                      onClick={addCompanion}
                      className="w-full py-2 border border-dashed border-[#c9a776]/60 rounded-xl text-xs font-sans text-[#6B2D2A] hover:bg-[#FDFBF7] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("rsvp.party.more", lang)}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Note / Blessings */}
            <div className="space-y-1">
              <label className="block text-[11px] uppercase tracking-wider text-muted-foreground font-sans">
                {t("rsvp.note.label", lang)}
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={
                  attending
                    ? t("rsvp.note.ph.yes", lang)
                    : t("rsvp.note.ph.no", lang)
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#c9a776]/40 bg-[#FDFBF7] focus:outline-none focus:border-[#6B2D2A] font-serif"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#6B2D2A] hover:bg-[#582421] text-white font-sans uppercase tracking-widest text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t("rsvp.btn.sending", lang)}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t("rsvp.btn.send", lang)}</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
