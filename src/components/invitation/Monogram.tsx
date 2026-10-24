import React from "react";

interface MonogramProps {
  variant?: "framed" | "frameless" | "golden" | "white";
  color?: string;
  beat?: boolean;
  className?: string;
  style?: React.CSSProperties;
  bright?: boolean;
  src?: string;
}

/**
 * Authentic Nischay & Yashaswini (NY) Wedding Monogram
 * Supports the user's authentic NY-final.png (golden) and NY-white.png (white) logo files.
 */
export function Monogram({
  variant = "golden",
  color,
  beat = false,
  className = "",
  style,
  bright = false,
  src,
}: MonogramProps) {
  const BASE = import.meta.env.BASE_URL?.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL || ""}/`;

  // Use NY-white.png if requested or if variant/color is white, otherwise use NY-final.png (golden)
  const isWhite =
    variant === "white" ||
    color === "white" ||
    color === "cream" ||
    color === "silver";

  const imageSrc =
    src ||
    (isWhite
      ? `${BASE}images/logo/NY-white.png`
      : `${BASE}images/logo/NY-final.png`);

  return (
    <span
      role="img"
      aria-label="Nischay & Yashaswini Monogram"
      className={`relative inline-flex items-center justify-center select-none ${
        beat ? "animate-pulse" : ""
      } ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <img
        src={imageSrc}
        alt="Nischay & Yashaswini Logo"
        className="w-full h-full object-contain pointer-events-none select-none"
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
