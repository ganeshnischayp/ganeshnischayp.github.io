import confetti from "canvas-confetti";

/**
 * Royal South Indian Wedding Confetti Celebration
 * Triggers a multi-stage, canvas-based confetti explosion with royal gold,
 * deep burgundy, auspicious vermilion, and champagne shimmer.
 */
export function triggerWeddingArrivalConfetti() {
  if (typeof window === "undefined") return;

  const royalPalette = [
    "#ffd700", // Royal Gold
    "#f5d799", // Champagne Gold
    "#c9a776", // Traditional Zari Gold
    "#6B2D2A", // Deep Royal Burgundy
    "#853733", // Rich Maroon
    "#b82d23", // Auspicious Sindoor Vermilion
    "#fffdf9", // Pearl / Ivory Shimmer
  ];

  // Stage 1: Dual angled cannon blast from bottom-left & bottom-right
  confetti({
    particleCount: 65,
    angle: 60,
    spread: 60,
    origin: { x: 0.05, y: 0.82 },
    colors: royalPalette,
    zIndex: 9999,
    ticks: 280,
    gravity: 0.85,
    scalar: 1.1,
    drift: 0.1,
  });

  confetti({
    particleCount: 65,
    angle: 120,
    spread: 60,
    origin: { x: 0.95, y: 0.82 },
    colors: royalPalette,
    zIndex: 9999,
    ticks: 280,
    gravity: 0.85,
    scalar: 1.1,
    drift: -0.1,
  });

  // Stage 2: Central royal canopy burst in the sky
  setTimeout(() => {
    confetti({
      particleCount: 85,
      spread: 110,
      origin: { x: 0.5, y: 0.3 },
      colors: royalPalette,
      zIndex: 9999,
      ticks: 320,
      gravity: 0.9,
      scalar: 1.25,
      shapes: ["circle", "square"],
    });
  }, 220);

  // Stage 3: Cascading golden rain as the invitation settles into view (1 second duration)
  const duration = 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 50,
      origin: { x: 0.08, y: 0.75 },
      colors: royalPalette,
      zIndex: 9999,
      gravity: 1.1,
      scalar: 0.9,
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 50,
      origin: { x: 0.92, y: 0.75 },
      colors: royalPalette,
      zIndex: 9999,
      gravity: 1.1,
      scalar: 0.9,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  setTimeout(() => {
    requestAnimationFrame(frame);
  }, 450);
}
