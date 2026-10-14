import React, { useRef, useEffect, useState, useCallback } from "react";
import { Clock, Calendar } from "lucide-react";
import confetti from "canvas-confetti";
import { Monogram } from "./Monogram";

interface ScratchDateCardProps {
  onRevealed?: () => void;
  lang?: "kn" | "en" | "te";
}

export function ScratchDateCard({ onRevealed, lang = "en" }: ScratchDateCardProps) {
  const isKn = lang === "kn" || lang === "te";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const scratchedPixelsRef = useRef<number>(0);

  // Reception date target: 25 Nov 2026, 7:00 PM IST
  const targetTime = 1795613400000;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  // Render a shiny, lustrous golden foil scratch surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dynamically match container dimensions so foil fits any screen seamlessly
    const rect = container.getBoundingClientRect();
    const width = Math.max(300, Math.round(rect.width || canvas.offsetWidth || 345));
    const height = Math.max(240, Math.round(rect.height || canvas.offsetHeight || 250));

    canvas.width = width;
    canvas.height = height;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // 1. Pale Gold Silk Foil Base Gradient (Soft, delicate champagne pale gold)
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, "#E7D7B5");    // Soft pale champagne gold
    goldGrad.addColorStop(0.18, "#F7EDD5"); // Luminous pale gold silk
    goldGrad.addColorStop(0.35, "#FFFDF5"); // Pale ivory-gold shimmer highlight
    goldGrad.addColorStop(0.5, "#E2CE9F");  // Classic delicate pale gold
    goldGrad.addColorStop(0.68, "#D7BD84"); // Soft warm antique pale gold undertone
    goldGrad.addColorStop(0.82, "#F8F0DD"); // Bright pale gold gleam
    goldGrad.addColorStop(1, "#CFB175");    // Gentle pale gold edge

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Fine Gold Glitter Particle Dust & Flecks
    let seed = 7719;
    const pseudoRandom = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    // Paint a dense field of micro gold glitters (~200 particles)
    const glitterCount = Math.floor((width * height) / 380);
    for (let i = 0; i < glitterCount; i++) {
      const gx = pseudoRandom() * width;
      const gy = pseudoRandom() * height;
      const gr = 0.5 + pseudoRandom() * 1.5;
      const alpha = 0.35 + pseudoRandom() * 0.55;

      const mod = i % 5;
      if (mod === 0) {
        // Bright radiant diamond glint
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      } else if (mod === 1) {
        // Rich warm gold glitter speck
        ctx.fillStyle = `rgba(255, 220, 110, ${alpha})`;
      } else if (mod === 2) {
        // Deep metallic gold flake
        ctx.fillStyle = `rgba(218, 165, 32, ${alpha * 0.85})`;
      } else if (mod === 3) {
        // Pale champagne gold shimmer
        ctx.fillStyle = `rgba(255, 243, 196, ${alpha})`;
      } else {
        // Amber gold sparkle
        ctx.fillStyle = `rgba(238, 190, 80, ${alpha * 0.9})`;
      }

      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Four-point Golden Glitter Star Sparkles
    const drawGlitterStar = (sx: number, sy: number, arm: number) => {
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.shadowColor = "rgba(255, 215, 80, 0.9)";
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.moveTo(sx, sy - arm);
      ctx.quadraticCurveTo(sx, sy, sx + arm, sy);
      ctx.quadraticCurveTo(sx, sy, sx, sy + arm);
      ctx.quadraticCurveTo(sx, sy, sx - arm, sy);
      ctx.quadraticCurveTo(sx, sy, sx, sy - arm);
      ctx.closePath();
      ctx.fill();

      // Golden center core
      ctx.fillStyle = "rgba(255, 228, 120, 0.9)";
      ctx.beginPath();
      ctx.arc(sx, sy, arm * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const sparkleCoords = [
      [width * 0.12, height * 0.22, 5.5],
      [width * 0.86, height * 0.18, 5],
      [width * 0.22, height * 0.80, 4.5],
      [width * 0.84, height * 0.76, 5],
      [width * 0.35, height * 0.26, 3.5],
      [width * 0.68, height * 0.78, 3.8],
      [width * 0.14, height * 0.54, 3.2],
      [width * 0.88, height * 0.48, 3.5],
      [width * 0.50, height * 0.16, 4],
    ];
    for (const [sx, sy, arm] of sparkleCoords) {
      drawGlitterStar(sx, sy, arm);
    }

    // 4. Soft Pale Gold Luminous Sheen Sweep
    const sheenGrad = ctx.createLinearGradient(0, 0, width, height * 0.85);
    sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    sheenGrad.addColorStop(0.38, "rgba(255, 250, 235, 0.06)");
    sheenGrad.addColorStop(0.50, "rgba(255, 255, 255, 0.35)"); // Pale glint
    sheenGrad.addColorStop(0.62, "rgba(255, 250, 235, 0.06)");
    sheenGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, width, height);

    // 5. Pale Gold Delicate Borders
    ctx.strokeStyle = "rgba(165, 130, 65, 0.35)";
    ctx.lineWidth = 1.8;
    ctx.strokeRect(9, 9, width - 18, height - 18);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Subtle inner dashed stitch border
    ctx.strokeStyle = "rgba(180, 145, 80, 0.3)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.strokeRect(16, 16, width - 32, height - 32);
    ctx.setLineDash([]);

    // Corner decorative diamonds with center pearl in pale gold
    const drawCornerDiamond = (cx: number, cy: number, s: number) => {
      ctx.fillStyle = "#A88344";
      ctx.beginPath();
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + s, cy);
      ctx.lineTo(cx, cy + s);
      ctx.lineTo(cx - s, cy);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#FFFDF5";
      ctx.beginPath();
      ctx.arc(cx, cy, 1.2, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCornerDiamond(12, 12, 4);
    drawCornerDiamond(width - 12, 12, 4);
    drawCornerDiamond(12, height - 12, 4);
    drawCornerDiamond(width - 12, height - 12, 4);

    // 6. Central Plaque for "SCRATCH HERE" with Pale Gold & Champagne Tone
    const cx = width / 2;
    const cy = height / 2;
    const plaqueW = Math.min(210, width - 60);
    const plaqueH = 48;
    const plaqueR = 24;

    // Plaque soft golden shadow
    ctx.save();
    ctx.shadowColor = "rgba(110, 80, 30, 0.22)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 2;

    // Pale gold plaque fill
    const plaqueGrad = ctx.createLinearGradient(
      cx - plaqueW / 2,
      cy - plaqueH / 2,
      cx + plaqueW / 2,
      cy + plaqueH / 2
    );
    plaqueGrad.addColorStop(0, "#FFFDF7");
    plaqueGrad.addColorStop(0.35, "#F7EDD0");
    plaqueGrad.addColorStop(0.7, "#E5CE98");
    plaqueGrad.addColorStop(1, "#FAF3DF");

    ctx.beginPath();
    ctx.roundRect(cx - plaqueW / 2, cy - plaqueH / 2, plaqueW, plaqueH, plaqueR);
    ctx.fillStyle = plaqueGrad;
    ctx.fill();
    ctx.restore();

    // Plaque pale gold rim
    ctx.strokeStyle = "#C4A76E";
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Inner bright stitch
    ctx.beginPath();
    ctx.roundRect(
      cx - (plaqueW - 6) / 2,
      cy - (plaqueH - 6) / 2,
      plaqueW - 6,
      plaqueH - 6,
      plaqueR - 3
    );
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 2.5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 7. "SCRATCH HERE" Text - Bold, rich burgundy with subtle golden highlight
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 13.5px -apple-system, BlinkMacSystemFont, 'Montserrat', sans-serif";
    ctx.fillStyle = "#54211D"; // Royal wedding wine
    ctx.fillText("✨  SCRATCH HERE  ✨", cx, cy);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) {
        initCanvas();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initCanvas, isRevealed]);

  // Scratch action handler with continuous brush path
  const scratchAt = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";

    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,0,0,1)";

    if (lastPointRef.current) {
      ctx.lineWidth = 38;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };

    // Check scratch progress
    scratchedPixelsRef.current += 1;
    if (scratchedPixelsRef.current % 8 === 0) {
      checkRevealProgress();
    }
  };

  const checkRevealProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const step = 8;
      const w = canvas.width;
      const h = canvas.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      let transparentCount = 0;
      let totalSampled = 0;

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          totalSampled++;
          const idx = (y * w + x) * 4;
          if (data[idx + 3] < 80) {
            transparentCount++;
          }
        }
      }

      const ratio = transparentCount / totalSampled;
      if (ratio > 0.38 && !isRevealed) {
        triggerReveal();
      }
    } catch {
      // Fallback
    }
  };

  const triggerReveal = () => {
    setIsRevealed(true);
    if (onRevealed) onRevealed();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#d4af37", "#f5d77f", "#6b2d2a", "#fcf8f0"],
        disableForReducedMotion: true,
      });
    } catch {
      // Confetti fallback
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    lastPointRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleRevealAll = () => {
    triggerReveal();
  };

  const handleReset = () => {
    setIsRevealed(false);
    scratchedPixelsRef.current = 0;
    lastPointRef.current = null;
    setTimeout(() => {
      initCanvas();
    }, 50);
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 sm:my-8 w-full">
      {/* Decorative Title Banner */}
      <div className="flex items-center gap-2 mb-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a776]" />
        <span className="font-sans uppercase tracking-[0.22em] text-[10px] sm:text-[11px] text-[#9c825a] font-bold flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#8a6a33]" />
          {isKn ? "ದಿನಾಂಕ ಮತ್ತು ಕ್ಷಣಗಣನೆ" : "Wedding Date & Countdown"}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a776]" />
      </div>

      {/* LUXURY SCRATCH CARD PASS CONTAINER - Fully responsive and height-safe */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[345px] sm:max-w-[420px] min-h-[250px] sm:min-h-[260px] rounded-2xl shadow-[0_12px_32px_-8px_rgba(74,31,29,0.18)] border-2 border-[#DFC995] p-1.5 bg-[#FAF3E8] select-none touch-none overflow-hidden"
      >
        {/* INNER REVEALED CONTENT UNDERNEATH */}
        <div className="relative w-full h-full min-h-[238px] sm:min-h-[248px] rounded-xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F0] to-[#F5ECE0] border border-[#DFC995]/50 p-3 sm:p-3.5 flex flex-col justify-between text-center overflow-hidden">
          {/* Subtle watermark monogram */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]"
          >
            <Monogram
              variant="golden"
              style={{ width: 140, height: 140 }}
            />
          </div>

          {/* Top Row: Auspicious Date Announcement */}
          <div className="z-10 border-b border-[#c9a776]/25 pb-1.5">
            <div className="flex items-baseline justify-between">
              <p
                className="text-base sm:text-lg font-bold text-[#6B2D2A] leading-tight"
                style={{ fontFamily: isKn ? "var(--font-kannada)" : "var(--font-serif)" }}
              >
                {isKn ? "2026 ನವೆಂಬರ್ 25 & 26" : "25 & 26 November 2026"}
              </p>
              <span className="font-sans text-[10px] font-bold text-[#8a6a33] uppercase tracking-wider">
                Channarayapatna
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground font-sans font-medium uppercase tracking-wider text-left mt-0.5">
              {isKn ? "ಬುಧವಾರ & ಗುರುವಾರ" : "Wednesday & Thursday"}
            </p>
          </div>

          {/* Middle Row: Two Events Summary Cards */}
          <div className="w-full grid grid-cols-2 gap-2 z-10 text-left py-1">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/80 border border-[#c9b48c]/40 shadow-2xs">
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#8a6a33] font-bold">
                Grand Reception
              </p>
              <p className="font-serif text-xs sm:text-sm font-bold text-foreground/90 leading-tight pt-0.5">
                25 Nov · 7:00 PM
              </p>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/80 border border-[#c9b48c]/40 shadow-2xs">
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#8a6a33] font-bold">
                Shubha Muhurtha
              </p>
              <p className="font-serif text-xs sm:text-sm font-bold text-foreground/90 leading-tight pt-0.5">
                26 Nov · 8:45 AM
              </p>
            </div>
          </div>

          {/* Bottom Row: Live Countdown Tiles (Guaranteed full visibility, never cut off) */}
          <div className="w-full z-10 pt-1">
            <div className="flex items-center justify-center text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-[#8a6a33] font-semibold mb-1">
              <span className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-[#8a6a33]" />
                {isKn ? "ಉಳಿದಿರುವ ಸಮಯ" : "Countdown to Celebration"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
              {[
                { val: timeLeft.days, label: "Days" },
                { val: timeLeft.hours, label: "Hours" },
                { val: timeLeft.minutes, label: "Mins" },
                { val: timeLeft.seconds, label: "Secs" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-md bg-[#6B2D2A] text-white shadow-2xs border border-[#c9b48c]/30"
                >
                  <span className="font-sans font-bold text-xs sm:text-sm tabular-nums leading-none text-[#FAF3E8]">
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="text-[7.5px] font-sans uppercase tracking-wider opacity-85 pt-0.5 text-[#dfceb7]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* METALLIC SHINY-GOLD FOIL SCRATCH CANVAS OVERLAY */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing rounded-xl transition-opacity duration-700 z-30 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ touchAction: "none" }}
        />
      </div>

      {/* Helper Action Link Below Scratch Card */}
      <div className="mt-2 text-center flex items-center justify-center gap-3">
        {!isRevealed ? (
          <button
            type="button"
            onClick={handleRevealAll}
            className="text-[11px] font-sans font-semibold text-[#8a6a33] hover:text-[#6B2D2A] uppercase tracking-wider underline underline-offset-4 cursor-pointer transition-colors"
          >
            {isKn ? "ದಿನಾಂಕ ತೋರಿಸಿ" : "Tap to reveal directly"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-sans font-semibold text-[#8a6a33] hover:text-[#6B2D2A] uppercase tracking-wider underline underline-offset-4 cursor-pointer transition-colors"
          >
            {isKn ? "ಮತ್ತೆ ಗೀಚಿ" : "Scratch again"}
          </button>
        )}
      </div>
    </div>
  );
}
