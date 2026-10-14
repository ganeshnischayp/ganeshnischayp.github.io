import React from "react";

interface FloraConfig {
  f: string;
  r?: number;
  rot?: number;
  origin?: string;
  pin?: string;
  dur?: number;
  delay?: number;
  cls: string;
  fade?: string;
  breathe?: boolean;
  shadow?: boolean;
  h?: string;
  bgSize?: string;
  bgPos?: string;
  drift?: boolean;
  flip?: boolean;
}

const BASE = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL || ""}/`;

const FLORAS: FloraConfig[] = [
  // ==================== TOP-LEFT CORNER ====================
  {
    f: "spray-04",
    r: 0.818,
    rot: -18,
    origin: "top left",
    dur: 8,
    delay: 0,
    shadow: true,
    cls: "-top-2 -left-2 w-[22%] max-w-[85px] opacity-85 sm:w-[20%] md:-top-5 md:-left-4 md:w-[18%] md:opacity-95",
  },
  {
    f: "bloom-14",
    r: 1.0,
    rot: 18,
    origin: "center",
    dur: 6.5,
    delay: 0.8,
    breathe: true,
    shadow: true,
    cls: "top-1.5 left-1.5 w-[8.5%] max-w-[32px] opacity-90 sm:w-[8%] md:top-3 md:left-4 md:w-[7%]",
  },
  {
    f: "bloom-29",
    r: 0.632,
    rot: 45,
    origin: "bottom center",
    dur: 7.5,
    delay: 1.5,
    breathe: true,
    cls: "top-[3.5%] left-[10%] w-[6.5%] max-w-[24px] opacity-75 sm:w-[6%] md:top-[6%] md:left-[10%] md:w-[5.5%]",
  },

  // ==================== TOP-RIGHT CORNER ====================
  {
    f: "spray-04",
    r: 0.818,
    rot: 18,
    origin: "top right",
    dur: 8.5,
    delay: 0.4,
    flip: true,
    shadow: true,
    cls: "-top-2 -right-2 w-[22%] max-w-[85px] opacity-85 sm:w-[20%] md:-top-5 md:-right-4 md:w-[18%] md:opacity-95",
  },
  {
    f: "bloom-14",
    r: 1.0,
    rot: -22,
    origin: "center",
    dur: 7,
    delay: 0.6,
    flip: true,
    breathe: true,
    shadow: true,
    cls: "top-1.5 right-1.5 w-[8.5%] max-w-[32px] opacity-90 sm:w-[8%] md:top-3 md:right-4 md:w-[7%]",
  },
  {
    f: "bloom-25",
    r: 0.694,
    rot: -35,
    origin: "bottom center",
    dur: 8,
    delay: 2.0,
    breathe: true,
    cls: "top-[3.5%] right-[10%] w-[6.5%] max-w-[24px] opacity-75 sm:w-[6%] md:top-[6%] md:right-[10%] md:w-[5.5%]",
  },

  // ==================== BOTTOM-LEFT CORNER ====================
  {
    f: "spray-04",
    r: 0.818,
    rot: -165,
    origin: "bottom left",
    dur: 9,
    delay: 1.0,
    shadow: true,
    cls: "-bottom-2 -left-2 w-[24%] max-w-[95px] opacity-85 sm:w-[22%] md:-bottom-5 md:-left-4 md:w-[20%] md:opacity-95",
  },
  {
    f: "bloom-25",
    r: 0.694,
    rot: 65,
    origin: "bottom center",
    dur: 7,
    delay: 1.8,
    breathe: true,
    shadow: true,
    cls: "bottom-2 left-2 w-[9%] max-w-[34px] opacity-90 sm:w-[8.5%] md:bottom-4 md:left-5 md:w-[7.5%]",
  },
  {
    f: "bloom-11",
    r: 0.424,
    rot: 25,
    origin: "center",
    dur: 7.8,
    delay: 1.2,
    breathe: true,
    cls: "bottom-[4%] left-[10%] w-[6.5%] max-w-[24px] opacity-75 sm:w-[6%] md:bottom-[7%] md:left-[11%] md:w-[5%]",
  },

  // ==================== BOTTOM-RIGHT CORNER ====================
  {
    f: "spray-03",
    r: 1.278,
    rot: -4,
    origin: "bottom right",
    dur: 8.5,
    delay: 1.4,
    breathe: true,
    shadow: true,
    cls: "-bottom-2 -right-2 w-[34%] max-w-[130px] opacity-90 sm:w-[34%] md:-bottom-5 md:-right-5 md:w-[34%] md:opacity-98",
  },
  {
    f: "bloom-29",
    r: 0.632,
    rot: -45,
    origin: "center",
    dur: 7.5,
    delay: 1.1,
    breathe: true,
    shadow: true,
    cls: "bottom-3 right-3 w-[9%] max-w-[34px] opacity-90 sm:w-[8%] md:bottom-6 md:right-8 md:w-[7%]",
  },

  // ==================== MID-BORDERS (DELICATE SPRIGS WITH SWAY) ====================
  {
    f: "spray-07",
    r: 1.008,
    rot: 10,
    dur: 11,
    delay: 1.5,
    drift: true,
    cls: "top-[36%] -left-1.5 w-[11%] max-w-[42px] opacity-70 sm:w-[10%] md:top-[36%] md:-left-1 md:w-[8%] md:opacity-85",
  },
  {
    f: "spray-06",
    r: 0.896,
    rot: -12,
    dur: 12,
    delay: 2.5,
    drift: true,
    flip: true,
    cls: "top-[56%] -right-1.5 w-[10%] max-w-[40px] opacity-70 sm:w-[9%] md:top-[55%] md:-right-1 md:w-[8%] md:opacity-85",
  },

  // ==================== BOTTOM GARLAND BASE ====================
  {
    f: "spray-02",
    r: 2.338,
    origin: "bottom center",
    dur: 10,
    cls: "bottom-0 left-0 w-full h-[65px] opacity-40 sm:h-[90px] md:h-[130px] md:opacity-[0.50]",
    h: "fixed",
    bgSize: "100% auto",
    bgPos: "top center",
  },
];

// Falling/Drifting Petal Configuration for Romantic Motion
interface FallingPetalConfig {
  id: number;
  bloom: string;
  left: string;
  size: string;
  dur: string;
  delay: string;
  driftX: string;
  opacity: number;
}

const FALLING_PETALS: FallingPetalConfig[] = [
  { id: 1, bloom: "bloom-11", left: "7%", size: "w-4 sm:w-5 md:w-7", dur: "11s", delay: "0s", driftX: "28px", opacity: 0.75 },
  { id: 2, bloom: "bloom-29", left: "19%", size: "w-5 sm:w-6 md:w-8", dur: "14s", delay: "2.5s", driftX: "-32px", opacity: 0.7 },
  { id: 3, bloom: "bloom-25", left: "34%", size: "w-4 sm:w-5 md:w-7", dur: "12.5s", delay: "5s", driftX: "24px", opacity: 0.65 },
  { id: 4, bloom: "bloom-11", left: "48%", size: "w-3.5 sm:w-4.5 md:w-6", dur: "15s", delay: "1.2s", driftX: "-20px", opacity: 0.7 },
  { id: 5, bloom: "bloom-29", left: "63%", size: "w-5 sm:w-6 md:w-8", dur: "13s", delay: "6.5s", driftX: "35px", opacity: 0.75 },
  { id: 6, bloom: "bloom-25", left: "78%", size: "w-4 sm:w-5 md:w-7", dur: "11.5s", delay: "3.8s", driftX: "-28px", opacity: 0.7 },
  { id: 7, bloom: "bloom-14", left: "88%", size: "w-5 sm:w-6 md:w-8", dur: "13.5s", delay: "4.5s", driftX: "20px", opacity: 0.7 },
];

function getPinTransform(pin?: string) {
  switch (pin) {
    case "tl":
      return "-translate-x-1/2 -translate-y-1/2";
    case "tr":
      return "translate-x-1/2 -translate-y-1/2";
    case "bl":
      return "-translate-x-1/2 translate-y-1/2";
    case "br":
      return "translate-x-1/2 translate-y-1/2";
    default:
      return "";
  }
}

/**
 * Royal Gold Corner Filigree Flourish (SVG)
 */
function GoldCornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute w-8 h-8 sm:w-14 sm:h-14 pointer-events-none ${className}`}
    >
      <path
        d="M 6 6 L 50 6 C 26 12, 12 26, 6 50 Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path
        d="M 6 6 L 6 70 M 6 6 L 70 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 12 12 L 12 56 M 12 12 L 56 12"
        stroke="currentColor"
        strokeWidth="1.0"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function FloraDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Golden Corner Flourishes behind flowers */}
      <GoldCornerFlourish className="top-1.5 left-1.5 sm:top-4 sm:left-4 text-[#c9a776]/50" />
      <GoldCornerFlourish className="top-1.5 right-1.5 sm:top-4 sm:right-4 text-[#c9a776]/50 -scale-x-100" />
      <GoldCornerFlourish className="bottom-1.5 left-1.5 sm:bottom-4 sm:left-4 text-[#c9a776]/50 -scale-y-100" />
      <GoldCornerFlourish className="bottom-1.5 right-1.5 sm:bottom-4 sm:right-4 text-[#c9a776]/50 -scale-x-100 -scale-y-100" />

      {/* Layered watercolor floral arrangements with graceful wind motion */}
      {FLORAS.map((e, index) => {
        const pinCls = getPinTransform(e.pin);
        const animCls = e.drift ? "flora-drift" : "flora-sway";
        const breatheCls = e.breathe ? "flora-breathe" : "";

        return (
          <div
            key={`${e.f}-${index}`}
            className={`absolute ${e.cls} ${pinCls}`}
            style={e.h ? undefined : { aspectRatio: e.r }}
          >
            <div
              className={`w-full h-full ${animCls}`}
              style={
                {
                  "--rot": `${e.rot ?? 0}deg`,
                  "--origin": e.origin ?? "center",
                  "--dur": `${e.dur ?? 8}s`,
                  "--delay": `${e.delay ?? 0}s`,
                } as React.CSSProperties
              }
            >
              <div
                className={`w-full h-full ${breatheCls}`}
                style={
                  {
                    "--dur2": `${(e.dur ?? 8) * 0.65}s`,
                    "--delay2": `${(e.delay ?? 0) + 0.8}s`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${BASE}images/einvitation/flora/${e.f}.webp)`,
                    backgroundSize: e.bgSize ?? "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: e.bgPos ?? "center",
                    transform: e.flip ? "scaleX(-1)" : undefined,
                    filter: e.shadow
                      ? "drop-shadow(0 10px 18px rgba(92,72,44,0.18))"
                      : undefined,
                    maskImage:
                      e.fade === "t"
                        ? "linear-gradient(to bottom, transparent 0%, #000 22%)"
                        : undefined,
                    WebkitMaskImage:
                      e.fade === "t"
                        ? "linear-gradient(to bottom, transparent 0%, #000 22%)"
                        : undefined,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Romantic Falling/Drifting Petals & Blossoms across the letter */}
      {FALLING_PETALS.map((petal) => (
        <div
          key={`falling-petal-${petal.id}`}
          className={`absolute top-0 pointer-events-none flora-petal aspect-square ${petal.size}`}
          style={
            {
              left: petal.left,
              "--fall-dur": petal.dur,
              "--fall-delay": petal.delay,
              "--drift-x": petal.driftX,
              "--petal-op": petal.opacity,
            } as React.CSSProperties
          }
        >
          <img
            src={`${BASE}images/einvitation/flora/${petal.bloom}.webp`}
            alt=""
            className="w-full h-full object-contain drop-shadow-sm select-none"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
