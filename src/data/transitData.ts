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

export const TRAIN_INFO = [
  {
    label: "Nearest station",
    value: "Channarayapatna Railway Station (CNPA) · 2.5 km | Hassan Junction (HAS) · 38 km",
  },
  {
    label: "Direct trains from",
    value: "Bengaluru (Yesvantpur / KSR), Hassan, Mangaluru, Mysuru, Hubballi, Karwar",
  },
  {
    label: "Station → venue",
    value: "Auto rickshaw, ~5–10 min · ₹50–80",
  },
];

export const ROAD_INFO = [
  {
    label: "From Bengaluru",
    value: "~145 km · 2.5 hours via NH 75 (Nelamangala – Kunigal – Bellur Cross – Channarayapatna)",
  },
  {
    label: "From Mysuru",
    value: "~85 km · 1.5–2 hours via KR Pete (SH 7)",
  },
  {
    label: "From Hassan",
    value: "~38 km · 35 minutes via NH 75 four-lane expressway",
  },
  {
    label: "From Mangaluru",
    value: "~210 km · 4.5 hours via Sakleshpur & Shiradi Ghat (NH 75)",
  },
];

export interface CityRoute {
  distance: number;
  mode: "train" | "road";
}

export const KNOWN_CITIES: Record<string, CityRoute> = {
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
  chikkamagaluru: { distance: 80, mode: "road" },
  chikmagalur: { distance: 80, mode: "road" },
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
