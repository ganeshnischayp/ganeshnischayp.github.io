import React from "react";

interface MonogramProps {
  variant?: "framed" | "frameless" | "golden";
  color?: string;
  beat?: boolean;
  className?: string;
  style?: React.CSSProperties;
  bright?: boolean;
  src?: string;
}

/**
 * Authentic Nischay & Yashaswini (NY) Wedding Monogram
 * Supports the user's authentic NY-logo.png and NY-logo-golden.png files.
 */
export function Monogram({
  variant = "framed",
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

  // Use NY-logo-golden.png if requested or if variant/color is golden
  const imageSrc =
    src ||
    (variant === "golden" || color === "gold" || color === "golden"
      ? `${BASE}images/logo/NY-logo-golden.png`
      : `${BASE}images/logo/NY-logo.png`);

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
