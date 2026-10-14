import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { t } from "../../data/i18n";
import { Monogram } from "./Monogram";

interface DoorSceneProps {
  phase: "load" | "ready" | "opening" | "through" | "card";
  onTapDoor: () => void;
  guestName?: string;
  lang?: "en" | "kn" | "te";
  rel?: string;
}

export function DoorScene({
  phase,
  onTapDoor,
  guestName,
  lang = "en",
  rel = "",
}: DoorSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);

  // Loading bar simulation
  useEffect(() => {
    if (phase !== "load") return;
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [phase]);

  // Canvas ambient lantern & particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      // Deep dark palace night sky with warm ambient light
      const grad = ctx.createRadialGradient(
        w / 2,
        h * 0.45,
        10,
        w / 2,
        h * 0.45,
        w * 0.75
      );
      grad.addColorStop(0, "rgba(201, 167, 118, 0.22)");
      grad.addColorStop(0.4, "rgba(74, 31, 29, 0.35)");
      grad.addColorStop(1, "rgba(11, 9, 8, 0.95)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Warm glowing hanging lanterns on left and right
      const lanternY = h * 0.35 + Math.sin(time) * 4;
      const drawLantern = (lx: number, ly: number, scale: number) => {
        ctx.save();
        ctx.translate(lx, ly);

        // Cord
        ctx.strokeStyle = "rgba(201, 167, 118, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -ly);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // Glow
        const glow = ctx.createRadialGradient(0, 15, 2, 0, 15, 60 * scale);
        glow.addColorStop(0, "rgba(255, 224, 160, 0.75)");
        glow.addColorStop(0.3, "rgba(255, 180, 80, 0.25)");
        glow.addColorStop(1, "rgba(255, 140, 40, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 15, 60 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Diya / lantern body
        ctx.fillStyle = "#8a6a33";
        ctx.beginPath();
        ctx.moveTo(-12 * scale, 0);
        ctx.lineTo(12 * scale, 0);
        ctx.lineTo(8 * scale, 24 * scale);
        ctx.lineTo(-8 * scale, 24 * scale);
        ctx.closePath();
        ctx.fill();

        // Flame
        ctx.fillStyle = "#fff8e0";
        ctx.beginPath();
        ctx.arc(0, 8 * scale + Math.sin(time * 3) * 1.5, 4 * scale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      drawLantern(w * 0.18, lanternY, 1);
      drawLantern(w * 0.82, lanternY + 6, 1);

      // Golden floating firefly motes
      for (let i = 0; i < 24; i++) {
        const mx = (w * (0.15 + (i * 0.035) % 0.7) + Math.sin(time + i) * 20);
        const my = (h * 0.7 - ((time * 20 + i * 35) % (h * 0.6)));
        const alpha = 0.2 + 0.5 * Math.abs(Math.sin(time * 1.5 + i));
        ctx.fillStyle = `rgba(255, 224, 140, ${alpha})`;
        ctx.beginPath();
        ctx.arc(mx, my, 1.5 + (i % 2), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  const isOpening = phase === "opening" || phase === "through";

  return (
    <div className="fixed inset-0 z-30 overflow-hidden select-none bg-[#0b0908]">
      {/* Background canvas for lanterns and warm ambient aura */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Background Palace arch backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: "url(/images/einvitation/scene-alt4.jpg)",
          transform: isOpening ? "scale(1.2)" : "scale(1)",
        }}
      />

      {/* LOADER PHASE */}
      <AnimatePresence>
        {phase === "load" && (
          <motion.div
            key="door-loader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0908]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              animate={{ opacity: [0.85, 1, 0.85], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Subtle warm ambient back-glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -m-3 rounded-full bg-[#c9a776]/10 blur-xl pointer-events-none"
              />
              <Monogram
                variant="framed"
                beat
                bright
                style={{ width: 84, height: 84 }}
              />
            </motion.div>
            <div className="mt-8 h-1 w-36 md:w-44 bg-[#2a2016] rounded-full overflow-hidden border border-[#c9a776]/30">
              <div
                className="h-full bg-gradient-to-r from-[#b89047] to-[#e4cb91] transition-all duration-300 rounded-full"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p
              className="mt-4 text-xs tracking-[0.34em] text-[#c9a776]/85 font-medium uppercase font-sans"
              style={
                lang === "kn" || lang === "te"
                  ? {
                      fontFamily: "var(--font-kannada)",
                      letterSpacing: "normal",
                      fontSize: "0.95rem",
                    }
                  : undefined
              }
            >
              {t("door.loading", lang)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PALACE DOORS ARCH */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-[85vw] max-w-[420px] h-[70vh] max-h-[580px] rounded-t-full border border-[#c9a776]/35 overflow-hidden shadow-2xl flex"
          style={{
            boxShadow:
              "0 0 60px rgba(201,167,118,0.2), inset 0 0 40px rgba(0,0,0,0.8)",
          }}
        >
          {/* Left Door Leaf */}
          <motion.div
            className="w-1/2 h-full bg-[#1e130e] border-r border-[#c9a776]/50 relative flex items-center justify-end pr-2"
            style={{
              transformOrigin: "left center",
              backgroundImage:
                "linear-gradient(135deg, rgba(201,167,118,0.1) 0%, transparent 50%), radial-gradient(circle at 10% 50%, rgba(107,45,42,0.5), transparent 70%)",
            }}
            animate={
              isOpening
                ? { rotateY: -95, opacity: 0.1 }
                : { rotateY: 0, opacity: 1 }
            }
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          >
            {/* Palace Brass Studs / Floral carvings */}
            <div className="absolute inset-2 border border-[#c9a776]/25 rounded-tl-full pointer-events-none" />
            <div className="w-4 h-12 rounded-full border border-[#c9a776]/70 bg-[#c9a776]/20 mr-1 shadow-sm" />
          </motion.div>

          {/* Right Door Leaf */}
          <motion.div
            className="w-1/2 h-full bg-[#1e130e] border-l border-[#c9a776]/50 relative flex items-center justify-start pl-2"
            style={{
              transformOrigin: "right center",
              backgroundImage:
                "linear-gradient(225deg, rgba(201,167,118,0.1) 0%, transparent 50%), radial-gradient(circle at 90% 50%, rgba(107,45,42,0.5), transparent 70%)",
            }}
            animate={
              isOpening
                ? { rotateY: 95, opacity: 0.1 }
                : { rotateY: 0, opacity: 1 }
            }
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="absolute inset-2 border border-[#c9a776]/25 rounded-tr-full pointer-events-none" />
            <div className="w-4 h-12 rounded-full border border-[#c9a776]/70 bg-[#c9a776]/20 ml-1 shadow-sm" />
          </motion.div>

          {/* Center Monogram Wax Seal on Doors - Geometric Crystal Wireframe Logo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#541e1b] via-[#3a1311] to-[#220908] flex items-center justify-center shadow-2xl cursor-pointer z-20 border border-[#c9a776]/50"
            style={{
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.8), 0 0 18px rgba(201,167,118,0.25), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.6)",
            }}
            animate={
              isOpening
                ? { scale: 0.3, opacity: 0 }
                : { scale: [1, 1.03, 1] }
            }
            transition={
              isOpening
                ? { duration: 0.4 }
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Monogram
              variant="framed"
              beat
              bright
              style={{ width: 68, height: 68 }}
            />
          </motion.div>
        </div>
      </div>

      {/* GREETING TEXT AT TOP */}
      {(phase === "ready" || phase === "opening") && (
        <motion.div
          className="fixed inset-x-0 top-[12vh] z-40 text-center px-4 pointer-events-none"
          initial={{ opacity: 0, y: -15 }}
          animate={isOpening ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-6xl text-[#fbf1dd] leading-tight"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-cursive)"
                  : "var(--font-kannada-display)",
              textShadow:
                "0 2px 10px rgba(20,10,4,0.9), 0 0 25px rgba(201,167,118,0.5)",
            }}
          >
            {guestName ? (
              <span>
                {t("greeting.dear", lang)}{" "}
                <span className="italic">{guestName}</span>
                {rel === "elder"
                  ? t("greeting.suffix.elder", lang)
                  : t("greeting.suffix.default", lang)}
              </span>
            ) : (
              <span>{t("door.welcome", lang)}</span>
            )}
          </h1>
        </motion.div>
      )}

      {/* TAP TO OPEN CALLOUT */}
      {phase === "ready" && (
        <motion.div
          className="fixed inset-x-0 bottom-[14vh] z-40 flex flex-col items-center pointer-events-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            onClick={onTapDoor}
            className="group flex flex-col items-center cursor-pointer outline-none"
          >
            {/* Glowing ring */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border-2 border-[#ffe9c4]/75 animate-ping opacity-60" />
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#fff6e2] to-[#ffd98f] shadow-[0_0_20px_rgba(255,214,140,0.8)]" />
            </div>

            <p
              className="mt-3 px-5 py-2 rounded-full bg-black/60 backdrop-blur-xs border border-[#ffe9c4]/35 text-xs text-[#fff6e6] font-sans uppercase tracking-[0.26em] shadow-lg group-hover:scale-105 transition-transform"
              style={
                lang !== "en"
                  ? {
                      fontFamily: "var(--font-kannada)",
                      letterSpacing: "normal",
                      fontSize: "1.1rem",
                    }
                  : undefined
              }
            >
              {t("door.tap", lang)}
            </p>
          </button>
        </motion.div>
      )}

      {/* CLICKABLE OVERLAY ACROSS SCREEN */}
      {phase === "ready" && (
        <button
          type="button"
          aria-label={t("door.tap", lang)}
          onClick={onTapDoor}
          className="fixed inset-0 z-20 bg-transparent cursor-pointer"
        />
      )}

      {/* GOLDEN WARM FLOOD LIGHT SWEEP ON OPEN */}
      <motion.div
        className="fixed inset-0 z-45 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, #fff6e6 0%, #ffe9c4 45%, #f3d8a8 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={isOpening ? { opacity: [0, 1, 0.95] } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeIn" }}
      />
    </div>
  );
}
