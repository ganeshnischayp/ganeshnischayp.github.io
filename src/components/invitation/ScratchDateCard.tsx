import React, { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Calendar, RotateCcw, Clock } from "lucide-react";
import { Monogram } from "./Monogram";

interface ScratchDateCardProps {
  lang?: "en" | "kn" | "te";
  onReveal?: () => void;
}

export function ScratchDateCard({
  lang = "en",
  onReveal,
}: ScratchDateCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isScratching, setIsScratching] = useState(false);
  const [hasSparkled, setHasSparkled] = useState(false);

  const isKn = lang === "kn";

  // Target: Reception starts Nov 25, 2026 at 7:00 PM IST
  const targetTime = new Date("2026-11-25T19:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  // Render clean, smooth, muted dull-gold scratch foil without patterns
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // 1. Smooth, Muted Antique Champagne Gold Gradient (No Patterns, Clean Matte Surface)
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, "#8f7c63");
    goldGrad.addColorStop(0.25, "#baa88e");
    goldGrad.addColorStop(0.5, "#cfc0a8");
    goldGrad.addColorStop(0.75, "#baa88e");
    goldGrad.addColorStop(1, "#7d6b54");

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Outer Refined Matte Border Frame (Pattern-free, smooth surface)
    ctx.strokeStyle = "rgba(74, 31, 29, 0.35)";
    ctx.lineWidth = 2;
    ctx.strokeRect(9, 9, width - 18, height - 18);

    ctx.strokeStyle = "rgba(235, 226, 212, 0.75)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Subtle inner dashed stitch border
    ctx.strokeStyle = "rgba(74, 31, 29, 0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.strokeRect(16, 16, width - 32, height - 32);
    ctx.setLineDash([]);

    // Corner decorative diamonds
    const drawCornerDiamond = (cx: number, cy: number, s: number) => {
      ctx.fillStyle = "#5a3a34";
      ctx.beginPath();
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + s, cy);
      ctx.lineTo(cx, cy + s);
      ctx.lineTo(cx - s, cy);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#e8ded0";
      ctx.beginPath();
      ctx.arc(cx, cy, 1, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCornerDiamond(12, 12, 4);
    drawCornerDiamond(width - 12, 12, 4);
    drawCornerDiamond(12, height - 12, 4);
    drawCornerDiamond(width - 12, height - 12, 4);

    // 3. Central Plaque for "SCRATCH HERE" with Dulled, Muted Antique Color
    const cx = width / 2;
    const cy = height / 2;
    const plaqueW = 196;
    const plaqueH = 46;
    const plaqueR = 23;

    // Plaque soft shadow
    ctx.save();
    ctx.shadowColor = "rgba(74, 31, 29, 0.25)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;

    // Muted champagne-cream plaque fill
    const plaqueGrad = ctx.createLinearGradient(
      cx - plaqueW / 2,
      cy - plaqueH / 2,
      cx + plaqueW / 2,
      cy + plaqueH / 2
    );
    plaqueGrad.addColorStop(0, "#ece4d7");
    plaqueGrad.addColorStop(0.5, "#e2d7c7");
    plaqueGrad.addColorStop(1, "#d6c7b3");

    ctx.beginPath();
    ctx.roundRect(cx - plaqueW / 2, cy - plaqueH / 2, plaqueW, plaqueH, plaqueR);
    ctx.fillStyle = plaqueGrad;
    ctx.fill();
    ctx.restore();

    // Plaque muted rim
    ctx.strokeStyle = "#9c876e";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner subtle stitch
    ctx.beginPath();
    ctx.roundRect(
      cx - (plaqueW - 6) / 2,
      cy - (plaqueH - 6) / 2,
      plaqueW - 6,
      plaqueH - 6,
      plaqueR - 3
    );
    ctx.strokeStyle = "rgba(156, 135, 110, 0.45)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 2.5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. "SCRATCH HERE" Text - Clean, bold, muted and legible
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 14px -apple-system, BlinkMacSystemFont, 'Montserrat', sans-serif";
    ctx.fillStyle = "#4a2e2b";
    ctx.fillText("SCRATCH HERE", cx, cy);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

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

    const currentX = (clientX - rect.left) * scaleX;
    const currentY = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    if (lastPointRef.current) {
      // Draw smooth continuous stroke connecting last point to current point
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.lineWidth = 42;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }

    // Fill circle at current touch position
    ctx.beginPath();
    ctx.arc(currentX, currentY, 22, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = { x: currentX, y: currentY };

    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      let transparentCount = 0;
      const sampleStep = 16;

      for (let i = 3; i < data.length; i += sampleStep * 4) {
        if (data[i] < 60) {
          transparentCount++;
        }
      }

      const totalSampled = data.length / (sampleStep * 4);
      const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
      setScratchPercent(percent);

      if (percent >= 38 && !isRevealed) {
        triggerCompleteReveal();
      }
    } catch {
      // ignore
    }
  };

  const triggerCompleteReveal = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    lastPointRef.current = null;
    if (!hasSparkled) {
      setHasSparkled(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#c9a776", "#6B2D2A", "#dfbc7c", "#ffffff", "#b89758"],
      });
      if (onReveal) onReveal();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsScratching(true);
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastPointRef.current = null;
  };

  const resetScratch = () => {
    setIsRevealed(false);
    setScratchPercent(0);
    setHasSparkled(false);
    lastPointRef.current = null;
    initCanvas();
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      {/* Decorative Title Banner */}
      <div className="flex items-center gap-2 mb-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9b48c]" />
        <span className="font-sans uppercase tracking-[0.24em] text-[10px] text-[#9c825a] font-bold flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#8a6a33]" />
          {isKn ? "ದಿನಾಂಕ ಮತ್ತು ಕ್ಷಣಗಣನೆ" : "Wedding Date & Countdown"}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9b48c]" />
      </div>

      {/* LUXURY SCRATCH CARD PASS CONTAINER - Dulled, elegant champagne gold */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[340px] sm:max-w-[410px] h-[210px] sm:h-[225px] rounded-2xl shadow-[0_12px_32px_-8px_rgba(74,31,29,0.2)] border-2 border-[#c9b48c] p-1.5 bg-[#FAF3E8] select-none touch-none overflow-hidden"
      >
        {/* INNER REVEALED CONTENT UNDERNEATH */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#FFFDF9] via-[#FCF8F0] to-[#F5ECE0] border border-[#c9b48c]/50 p-3 sm:p-3.5 flex flex-col justify-between text-center overflow-hidden">
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

          {/* Top Row: Auspicious Date Announcement (NO green tag) */}
          <div className="z-10 flex items-center justify-between border-b border-[#c9a776]/25 pb-1.5">
            <div className="text-left w-full">
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
              <p className="text-[10px] text-muted-foreground font-sans font-medium uppercase tracking-wider mt-0.5">
                {isKn ? "ಬುಧವಾರ & ಗುರುವಾರ" : "Wednesday & Thursday"}
              </p>
            </div>
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

          {/* Bottom Row: Live Countdown Tiles */}
          <div className="w-full z-10 pt-0.5">
            <div className="flex items-center justify-center text-[9px] font-sans uppercase tracking-widest text-[#8a6a33] font-semibold mb-1">
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
                  className="flex flex-col items-center justify-center py-1 rounded-md bg-[#6B2D2A] text-white shadow-2xs border border-[#c9b48c]/30"
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

        {/* METALLIC DULL-GOLD FOIL SCRATCH CANVAS OVERLAY (No pattern, clean matte) */}
        <canvas
          ref={canvasRef}
          width={410}
          height={225}
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

      {/* ACTION & HELPER BUTTONS - Dulled, tasteful colors */}
      <div className="mt-3 flex items-center gap-3">
        {!isRevealed ? (
          <button
            type="button"
            onClick={triggerCompleteReveal}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#e8decb] hover:bg-[#dfd3bc] border border-[#c2ae91] text-[#4a2e2b] text-xs font-sans uppercase tracking-wider font-bold transition-all shadow-2xs cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8a6a33]" />
            <span>Tap to Reveal Date</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={resetScratch}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 hover:bg-white border border-[#c9b48c]/50 text-[#6B2D2A] text-[11px] font-sans tracking-wide transition-all shadow-2xs cursor-pointer hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Scratch Again</span>
          </button>
        )}

        {!isRevealed && scratchPercent > 0 && (
          <span className="text-[11px] font-sans text-muted-foreground tabular-nums">
            {scratchPercent}% scratched
          </span>
        )}
      </div>
    </div>
  );
}
