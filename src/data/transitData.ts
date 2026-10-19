/**
 * Travel and transit guidelines for reaching Channarayapatna (Savithramma Kariyappa Gowda Kalyana Mantapa)
 */

export const VENUE_NAME = "Savithramma Kariyappa Gowda Kalyana Mantapa, Channarayapatna";
export const VENUE_NAME_KN = "ಸಾವಿತ್ರಮ್ಮ ಕರಿಯಪ್ಪ ಗೌಡ ಕಲ್ಯಾಣ ಮಂಟಪ, ಚನ್ನರಾಯಪಟ್ಟಣ";
export const VENUE_ADDRESS = "B.M. Road, Channarayapatna, Hassan District, Karnataka 573116";
export const VENUE_ADDRESS_KN = "ಬಿ.ಎಂ. ರಸ್ತೆ, ಚನ್ನರಾಯಪಟ್ಟಣ, ಹಾಸನ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ 573116";

export const VENUE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Savithramma+Kariyappa+Gowda+Kalyana+Mantapa+Channarayapatna";
export const VENUE_EMBED_URL = "https://maps.google.com/maps?q=Savithramma%20Kariyappa%20Gowda%20Kalyana%20Mantapa%2C%20Channarayapatna&z=16&output=embed";

export const FLIGHT_INFO = [
  {
    label: "Nearest airport",
    value: "Kempegowda International Airport, Bengaluru (BLR) · ~160 km / Mysore (MYQ) · ~90 km",
  },
  {
    label: "Connections",
    value: "Direct flights from all major Indian & international airports to Bengaluru",
  },
  {
    label: "Airport → venue",
    value: "Cab via NH 75 expressway (~2.5–3 hours) or Flybus/cab to Bengaluru and KSRTC bus",
  },
];


export const ROAD_INFO = [
  {
    label: "From Chikkamagaluru",
    highway: "SH 57 / NH 75",
    value: "~80 km · 1.5–2 hours via Belur, Hassan & NH 75 Expressway",
  },
  {
    label: "From Balehonnur",
    highway: "SH 64 / NH 75",
    value: "~135 km · 3–3.5 hours via Aldur, Chikkamagaluru, Belur & Hassan",
  },
  {
    label: "From Bengaluru",
    highway: "NH 75",
    value: "~145 km · 2.5 hours via NH 75 Expressway",
  },
  {
    label: "From Hassan",
    highway: "NH 75",
    value: "~38 km · 35 mins via NH 75 Expressway",
  },
  {
    label: "From Mysuru",
    highway: "SH 7",
    value: "~85 km · 1.5–2 hours via SH 7 (KR Pete)",
  },
  {
    label: "From Mangaluru",
    highway: "NH 75",
    value: "~210 km · 4.5 hours via NH 75 (Shiradi Ghat)",
  },
];

export const TRAIN_INFO = [
  {
    label: "Nearest station",
    value: "Channarayapatna Railway Station (CNPA) · 2.5 km | Hassan Junction (HAS) · 38 km",
  },
  {
    label: "From Chikkamagaluru (CMGR)",
    value: "Direct train: Chikkamagaluru – Yesvantpur Express (Train 16239/16240) connects CMGR directly to Channarayapatna (CNPA) and Hassan Jn (~1.5–2 hrs)",
  },
  {
    label: "From Balehonnur",
    value: "Road to Chikkamagaluru Station (50 km) or Hassan Jn (95 km), then direct train or expressway bus to Channarayapatna (CNPA)",
  },
  {
    label: "Direct trains from",
    value: "Bengaluru (Yesvantpur / KSR), Chikkamagaluru, Hassan, Mangaluru, Mysuru, Hubballi, Karwar",
  },
  {
    label: "Station → venue",
    value: "Auto rickshaw, ~5–10 min · ₹50–80 (2.5 km to Kalyana Mantapa)",
  },
];

export interface DetailedRoute {
  origin: string;
  originKn: string;
  distanceKm: number;
  road: {
    duration: string;
    route: string;
    routeKn: string;
    buses: string;
    busesKn: string;
  };
  train: {
    duration: string;
    station: string;
    details: string;
    detailsKn: string;
  };
}

export const FEATURED_ROUTES: DetailedRoute[] = [
  {
    origin: "Chikkamagaluru (Chikmagalur)",
    originKn: "ಚಿಕ್ಕಮಗಳೂರು",
    distanceKm: 80,
    road: {
      duration: "~1.5 to 2 hours",
      route: "Chikkamagaluru → Belur → Hassan → Channarayapatna (SH 57 / NH 373 & NH 75 Expressway)",
      routeKn: "ಚಿಕ್ಕಮಗಳೂರು → ಬೇಲೂರು → ಹಾಸನ → ಚನ್ನರಾಯಪಟ್ಟಣ (ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ 75)",
      buses: "Very frequent KSRTC buses from Chikkamagaluru KSRTC Bus Stand to Hassan (every 15–20 mins), then direct NH 75 express bus to Channarayapatna (~35 mins).",
      busesKn: "ಚಿಕ್ಕಮಗಳೂರು ಬಸ್ ನಿಲ್ದಾಣದಿಂದ ಹಾಸನಕ್ಕೆ ಪ್ರತಿ 15-20 ನಿಮಿಷಕ್ಕೊಮ್ಮೆ ಬಸ್, ನಂತರ ಹಾಸನದಿಂದ ಚನ್ನರಾಯಪಟ್ಟಣಕ್ಕೆ ಕೇವಲ 35 ನಿಮಿಷಗಳ ಪ್ರಯಾಣ.",
    },
    train: {
      duration: "~1.5 to 2 hours",
      station: "Chikkamagaluru Station (CMGR) → Channarayapatna (CNPA)",
      details: "Direct Train: Chikkamagaluru – Yesvantpur Express (Train 16239/16240) connects CMGR directly to Channarayapatna (CNPA) and Hassan Junction. Auto rickshaws available right outside CNPA station (2.5 km to venue).",
      detailsKn: "ಚಿಕ್ಕಮಗಳೂರು - ಯಶವಂತಪುರ ಎಕ್ಸ್‌ಪ್ರೆಸ್ (ದೈನಂದಿನ ರೈಲು) ನೇರವಾಗಿ ಚನ್ನರಾಯಪಟ್ಟಣ ನಿಲ್ದಾಣಕ್ಕೆ (CNPA) ಸಂಪರ್ಕಿಸುತ್ತದೆ. ನಿಲ್ದಾಣದಿಂದ ಕಲ್ಯಾಣ ಮಂಟಪಕ್ಕೆ ಕೇವಲ 2.5 ಕಿ.ಮೀ.",
    },
  },
  {
    origin: "Balehonnur",
    originKn: "ಬಾಳೆಹೊನ್ನೂರು",
    distanceKm: 135,
    road: {
      duration: "~3 to 3.5 hours",
      route: "Balehonnur → Aldur → Chikkamagaluru → Belur → Hassan → Channarayapatna (via SH 64 / NH 373 & NH 75 Expressway) OR Balehonnur → Mudigere Handpost → Belur → Hassan.",
      routeKn: "ಬಾಳೆಹೊನ್ನೂರು → ಆಲ್ದೂರು → ಚಿಕ್ಕಮಗಳೂರು → ಬೇಲೂರು → ಹಾಸನ → ಚನ್ನರಾಯಪಟ್ಟಣ (ಅಥವಾ ಮೂಡಿಗೆರೆ ಹ್ಯಾಂಡ್‌ಪೋಸ್ಟ್ ಮಾರ್ಗ).",
      buses: "Regular KSRTC buses from Balehonnur to Hassan / Chikkamagaluru. From Hassan, non-stop expressway buses leave for Channarayapatna every 10–15 mins.",
      busesKn: "ಬಾಳೆಹೊನ್ನೂರಿನಿಂದ ಹಾಸನ/ಚಿಕ್ಕಮಗಳೂರಿಗೆ ನಿರಂತರ ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ ಬಸ್‌ಗಳು ಲಭ್ಯ. ಹಾಸನದಿಂದ ಚನ್ನರಾಯಪಟ್ಟಣಕ್ಕೆ ನಿರಂತರ ಬಸ್‌ಗಳಿವೆ.",
    },
    train: {
      duration: "~2.5 to 3 hours total",
      station: "Via Chikkamagaluru Station (CMGR · 50 km) or Hassan Junction (HAS · 95 km)",
      details: "Reach Chikkamagaluru Station (~50 km / 1 hr by road) for the direct Chikkamagaluru-Yesvantpur train to Channarayapatna (CNPA), or take a direct cab/bus to Hassan Junction (HAS) for multiple connecting trains and expressway buses to Channarayapatna.",
      detailsKn: "ಬಾಳೆಹೊನ್ನೂರಿನಿಂದ ಚಿಕ್ಕಮಗಳೂರು ರೈಲು ನಿಲ್ದಾಣಕ್ಕೆ (50 ಕಿ.ಮೀ) ಅಥವಾ ಹಾಸನ ಜಂಕ್ಷನ್‌ಗೆ (95 ಕಿ.ಮೀ) ತೆರಳಿ ಅಲ್ಲಿಂದ ಚನ್ನರಾಯಪಟ್ಟಣಕ್ಕೆ (CNPA) ರೈಲು ಸಂಪರ್ಕ ಪಡೆಯಬಹುದು.",
    },
  },
];

export interface CityRoute {
  distance: number;
  mode: "train" | "road";
}

export const KNOWN_CITIES: Record<string, CityRoute> = {
  balehonnur: { distance: 135, mode: "road" },
  balehonnuru: { distance: 135, mode: "road" },
  chikkamagaluru: { distance: 80, mode: "road" },
  chikmagalur: { distance: 80, mode: "road" },
  chikmagaluru: { distance: 80, mode: "road" },
  chickmagalur: { distance: 80, mode: "road" },
  bengaluru: { distance: 145, mode: "road" },
  bangalore: { distance: 145, mode: "road" },
  hassan: { distance: 38, mode: "road" },
  mysuru: { distance: 85, mode: "road" },
  mysore: { distance: 85, mode: "road" },
  mangaluru: { distance: 210, mode: "road" },
  mangalore: { distance: 210, mode: "road" },
  tumakuru: { distance: 110, mode: "road" },
  tumkur: { distance: 110, mode: "road" },
  mandya: { distance: 75, mode: "road" },
  shivamogga: { distance: 170, mode: "road" },
  shimoga: { distance: 170, mode: "road" },
  hubballi: { distance: 340, mode: "train" },
  hubli: { distance: 340, mode: "train" },
  belagavi: { distance: 430, mode: "train" },
  davanagere: { distance: 200, mode: "road" },
  udupi: { distance: 250, mode: "road" },
  channarayapatna: { distance: 0, mode: "road" },
  shravanabelagola: { distance: 12, mode: "road" },
  hyderabad: { distance: 650, mode: "train" },
  chennai: { distance: 490, mode: "train" },
  mumbai: { distance: 930, mode: "train" },
  delhi: { distance: 2100, mode: "train" },
  pune: { distance: 820, mode: "train" },
  goa: { distance: 540, mode: "train" },
  coimbatore: { distance: 320, mode: "road" },
};

export const CITY_ALIASES: Record<string, string> = {
  balehonnur: "balehonnur",
  balehonnuru: "balehonnur",
  chikmaglur: "chikkamagaluru",
  chikmagalur: "chikkamagaluru",
  chikkamagalur: "chikkamagaluru",
  chickmagalur: "chikkamagaluru",
  blr: "bengaluru",
  bangalore: "bengaluru",
  mysuru: "mysore",
  mangalore: "mangaluru",
  hyd: "hyderabad",
  secunderabad: "hyderabad",
  crpatna: "channarayapatna",
  crp: "channarayapatna",
  bom: "mumbai",
  bombay: "mumbai",
  del: "delhi",
  ncr: "delhi",
  maa: "chennai",
  madras: "chennai",
};
