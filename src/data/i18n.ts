/**
 * Complete i18n dictionaries for English & Kannada (ಕನ್ನಡ)
 */

export const TRANSLATIONS: {
  en: Record<string, string | ((params: any) => string)>;
  kn: Record<string, string | ((params: any) => string)>;
  te?: Record<string, string | ((params: any) => string)>;
} = {
  en: {
    "seal.tap": "tap the seal to open",
    hello: "Hello,",
    "verse.text": "Two souls, two hearts, joined together in sacred love and harmony.",
    "verse.ref": "Sacred Union",
    "invited.eyebrow": "You are cordially invited",
    "hero.families": "Together with their families, invite you to celebrate the wedding ceremony of Nischay & Yashaswini.",
    "hero.note": "Everyone is welcome — come just as you are and celebrate with us.",
    welcome: "A heartfelt welcome",
    countdown: (e: { n: number }) => `${e.n} ${1 === Number(e.n) ? "day" : "days"} until the celebration`,
    
    // Main Dates
    "when.label": "When",
    "when.date": "November 25 & 26, 2026",
    "when.time": "Reception: 25th Nov 7:00 PM | Muhurtha: 26th Nov 8:45 AM",
    "when.reception.date": "Wednesday, November 25, 2026",
    "when.reception.time": "Reception: 7:00 PM onwards",
    "when.muhurtha.date": "Thursday, November 26, 2026",
    "when.muhurtha.time": "Muhurtha: 8:45 AM – 9:30 AM",
    
    // Venue
    "where.label": "Where",
    "where.venue": "Savithramma Kariyappa Gowda Kalyana Mantapa",
    "where.address": "B.M. Road, Channarayapatna, Hassan District, Karnataka 573116",
    "map.view": "View on Map",
    "map.preview": "Preview map",
    "map.hide": "Hide map",
    
    // Day Schedule
    "day.label": "Wedding Events",
    "itin.reception.title": "Grand Reception",
    "itin.reception.sub": "25th Nov · 7:00 PM onwards · Greetings & Dinner",
    "itin.muhurtha.title": "Shubha Muhurtha",
    "itin.muhurtha.sub": "26th Nov · 8:45 AM to 9:30 AM · Mangalya Dharana",
    "itin.feast.title": "Kalyana Bhojana",
    "itin.feast.sub": "26th Nov · 12:30 PM onwards · Traditional Feast",

    // Buttons & Controls
    "btn.calendar": "Add to Calendar",
    "btn.calendar.google": "Google Calendar",
    "btn.calendar.apple": "Apple Calendar",
    "btn.calendar.outlook": "Outlook",
    "btn.save": "Save invitation",
    "btn.return": "Seal & Return",
    "lang.toggle.kn": "ಕನ್ನಡ",
    "lang.toggle.en": "English",
    "greeting.dear": "Dear",
    "greeting.suffix.elder": " avaru,",
    "greeting.suffix.default": ",",
    "door.loading": "lighting the auspicious lamps…",
    "door.welcome": "Welcome",
    "door.tap": "tap the door to open",
    "door.close": "Close the door",

    // RSVP
    "rsvp.fab": "RSVP",
    "rsvp.modal.close": "Close",
    "rsvp.label": "Will you join us?",
    "rsvp.lead": "Tell us who's coming — you and anyone joining you — so we can welcome you warmly.",
    "rsvp.progress": "RSVP progress",
    "rsvp.name.label": "Full name *",
    "rsvp.name.ph": "Your full name",
    "rsvp.phone.label": "Phone *",
    "rsvp.phone.ph": "So we can reach you",
    "rsvp.side.label": "Here for",
    "rsvp.side.both": "Both",
    "rsvp.side.bride": "Bride (Yashaswini)",
    "rsvp.side.groom": "Groom (Nischay)",
    "rsvp.attend.legend": "Will you be there?",
    "rsvp.attend.yes": "Joyfully accepts",
    "rsvp.attend.no": "Regretfully declines",
    "rsvp.party.label": "Anyone joining you?",
    "rsvp.party.hint": (e: { max: number }) => `Guests joining you, besides yourself (up to ${e.max}).`,
    "rsvp.party.fewer": "Fewer guests",
    "rsvp.party.more": "More guests",
    "rsvp.guest.title": (e: { n: number }) => `Guest ${e.n}`,
    "rsvp.guest.name.label": "Name *",
    "rsvp.guest.name.ph": "Their name",
    "rsvp.guest.rel.label": "Who are they?",
    "rsvp.guest.age.label": "Adult / Child",
    "rsvp.age.adult": "Adult",
    "rsvp.age.child": "Child",
    "rsvp.food.you.label": "Your meal",
    "rsvp.food.label": "Meal",
    "rsvp.food.veg": "Vegetarian",
    "rsvp.food.nonveg": "Traditional Feast",
    "rsvp.food.hint": "Traditional South Indian feast served with love.",
    "rsvp.rel.spouse": "Spouse/Partner",
    "rsvp.rel.child": "Child",
    "rsvp.rel.parent": "Parent",
    "rsvp.rel.sibling": "Sibling",
    "rsvp.rel.friend": "Friend",
    "rsvp.rel.relative": "Relative",
    "rsvp.rel.other": "Other",
    "rsvp.note.label": "A blessing to the couple (optional)",
    "rsvp.note.ph.yes": "Blessings, wishes, or notes for Nischay & Yashaswini…",
    "rsvp.note.ph.no": "We'll miss you — send your blessings to the couple…",
    "rsvp.btn.next": "Next",
    "rsvp.btn.back": "Back",
    "rsvp.btn.send": "Send RSVP",
    "rsvp.btn.sending": "Sending…",
    "rsvp.err.name": "Please tell us your name first.",
    "rsvp.err.phone": "Please add a phone number so we can reach you.",
    "rsvp.err.guest": (e: { n: number }) => `Please add a name for guest ${e.n} (or lower the count).`,
    "rsvp.err.failed": (e: { phone: string }) => `Something hiccuped — try again, or WhatsApp us at ${e.phone}.`,
    "rsvp.done.headline.yes": (e: { name: string; n: number }) => `See you there, ${e.name} — party of ${e.n}!`,
    "rsvp.done.headline.no": (e: { name: string }) => `Thank you, ${e.name}.`,
    "rsvp.done.line.solo": "We've saved your place — looking forward to celebrating with you.",
    "rsvp.done.line.one": (e: { guest: string }) => `We've saved a place for you and ${e.guest} — see you in Channarayapatna!`,
    "rsvp.done.line.many": (e: { n: number }) => `We've saved a place for you and your ${e.n} guests — details to follow soon.`,
    "rsvp.done.line.no": "We will miss your presence dearly — thank you for your warm blessings.",
  },

  kn: {
    "seal.tap": "ಆಹ್ವಾನ ತೆರೆಯಲು ಮುದ್ರೆಯನ್ನು ಒತ್ತಿರಿ",
    hello: "ನಮಸ್ಕಾರ,",
    "verse.text": "ಮಾಂಗಲ್ಯಂ ತಂತುನಾನೇನ ಮಮ ಜೀವನ ಹೇತುನಾ | ಕಂಠೇ ಬಧ್ನಾಮಿ ಶುಭಗೇ ತ್ವಂ ಜೀವ ಶರದಃ ಶತಮ್ ||",
    "verse.ref": "ಮಂಗಳ ಶ್ಲೋಕ",
    "invited.eyebrow": "ವಿವಾಹ ಮಹೋತ್ಸವದ ಆದರದ ಆಮಂತ್ರಣ",
    "hero.families": "ಇರು ಕುಟುಂಬದ ಹಿರಿಯರ ಮತ್ತು ಬಂಧು-ಮಿತ್ರರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ, ನಿಶ್ಚಯ್ ಮತ್ತು ಯಶಸ್ವಿನಿ ಅವರ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ತಮ್ಮನ್ನು ಸಕುಟುಂಬ ಸಮೇತ ಆತ್ಮೀಯವಾಗಿ ಆಹ್ವಾನಿಸುತ್ತಿದ್ದೇವೆ.",
    "hero.note": "ತಮ್ಮ ಆಗಮನವೇ ನಮಗೆ ಸಡಗರ — ಬಂದು ನವಜೋಡಿಯನ್ನು ಹರಸಿ ಆಶೀರ್ವದಿಸಿ.",
    welcome: "ಹೃತ್ಪೂರ್ವಕ ಸ್ವಾಗತ",
    countdown: (e: { n: number }) => `ಶುಭ ಮುಹೂರ್ತಕ್ಕೆ ಇನ್ನು ${e.n} ದಿನಗಳು ಬಾಕಿ`,
    
    // Main Dates
    "when.label": "ಶುಭ ದಿನ ಮತ್ತು ಸಮಯ",
    "when.date": "2026 ನವೆಂಬರ್ 25 ಮತ್ತು 26",
    "when.time": "ಆರತಕ್ಷತೆ: ನವೆಂಬರ್ 25 ಸಂಜೆ 7:00 ರಿಂದ | ಮುಹೂರ್ತ: ನವೆಂಬರ್ 26 ಬೆಳಗ್ಗೆ 8:45",
    "when.reception.date": "2026 ನವೆಂಬರ್ 25, ಬುಧವಾರ",
    "when.reception.time": "ವರೋಪಚಾರ & ಆರತಕ್ಷತೆ: ಸಂಜೆ 7:00 ಗಂಟೆಯಿಂದ",
    "when.muhurtha.date": "2026 ನವೆಂಬರ್ 26, ಗುರುವಾರ",
    "when.muhurtha.time": "ಶುಭ ಮುಹೂರ್ತ: ಬೆಳಗ್ಗೆ 8:45 ರಿಂದ 9:30 ರವರೆಗೆ",
    
    // Venue
    "where.label": "ವಿವಾಹ ಸ್ಥಳ",
    "where.venue": "ಸಾವಿತ್ರಮ್ಮ ಕರಿಯಪ್ಪ ಗೌಡ ಕಲ್ಯಾಣ ಮಂಟಪ",
    "where.address": "ಬಿ.ಎಂ. ರಸ್ತೆ, ಚನ್ನರಾಯಪಟ್ಟಣ, ಹಾಸನ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ 573116",
    "map.view": "ಗೂಗಲ್ ಮ್ಯಾಪ್‌ನಲ್ಲಿ ನೋಡಿ",
    "map.preview": "ಮ್ಯಾಪ್ ವೀಕ್ಷಿಸಿ",
    "map.hide": "ಮ್ಯಾಪ್ ಮರೆಮಾಡಿ",
    
    // Day Schedule
    "day.label": "ಶುಭ ಸಮಾರಂಭಗಳ ವಿವರ",
    "itin.reception.title": "ವರೋಪಚಾರ & ಆರತಕ್ಷತೆ",
    "itin.reception.sub": "ನವೆಂಬರ್ 25, ಬುಧವಾರ · ಸಂಜೆ 7:00 ರಿಂದ · ಶುಭಾಶಯ & ಪ್ರೀತಿಯ ಭೋಜನ",
    "itin.muhurtha.title": "ಶುಭ ಮುಹೂರ್ತ (ಮಾಂಗಲ್ಯ ಧಾರಣೆ)",
    "itin.muhurtha.sub": "ನವೆಂಬರ್ 26, ಗುರುವಾರ · ಬೆಳಗ್ಗೆ 8:45 ರಿಂದ 9:30 ರವರೆಗೆ ಧನುರ್ ಲಗ್ನ ಸುಮುಹೂರ್ತದಲ್ಲಿ",
    "itin.feast.title": "ಕಲ್ಯಾಣ ಮಹಾ ಭೋಜನ",
    "itin.feast.sub": "ನವೆಂಬರ್ 26, ಗುರುವಾರ · ಮಧ್ಯಾಹ್ನ 12:00 ಗಂಟೆಯಿಂದ",

    // Buttons & Controls
    "btn.calendar": "ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ",
    "btn.calendar.google": "ಗೂಗಲ್ ಕ್ಯಾಲೆಂಡರ್",
    "btn.calendar.apple": "ಆಪಲ್ ಕ್ಯಾಲೆಂಡರ್",
    "btn.calendar.outlook": "ಔಟ್‌ಲುಕ್",
    "btn.save": "ಆಹ್ವಾನ ಪತ್ರಿಕೆ ಡೌನ್‌ಲೋಡ್",
    "btn.return": "ಮುಚ್ಚಿ ಹಿಂತಿರುಗಿ",
    "lang.toggle.kn": "ಕನ್ನಡ",
    "lang.toggle.en": "English",
    "greeting.dear": "ಆತ್ಮೀಯ",
    "greeting.suffix.elder": " ಅವರೇ,",
    "greeting.suffix.default": ",",
    "door.loading": "ಮಂಗಳ ದೀಪಗಳನ್ನು ಬೆಳಗಿಸಲಾಗುತ್ತಿದೆ…",
    "door.welcome": "ಸುಸ್ವಾಗತ",
    "door.tap": "ಆಹ್ವಾನ ತೆರೆಯಲು ಬಾಗಿಲನ್ನು ಸ್ಪರ್ಶಿಸಿ",
    "door.close": "ಬಾಗಿಲು ಮುಚ್ಚಿರಿ",

    // RSVP
    "rsvp.fab": "RSVP",
    "rsvp.modal.close": "ಮುಚ್ಚಿರಿ",
    "rsvp.label": "ತಾವು ಬರುತ್ತೀರಾ?",
    "rsvp.lead": "ತಮ್ಮ ಮತ್ತು ತಮ್ಮೊಂದಿಗೆ ಬರುವ ಕುಟುಂಬಸ್ಥರ ವಿವರಗಳನ್ನು ತಿಳಿಸಿ — ತಮಗೆ ಆದರದ ಸ್ವಾಗತ ಕೋರಲು ನಾವು ಸಿದ್ಧರಾಗುತ್ತೇವೆ.",
    "rsvp.progress": "RSVP ಪ್ರಗತಿ",
    "rsvp.name.label": "ಪೂರ್ಣ ಹೆಸರು *",
    "rsvp.name.ph": "ತಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
    "rsvp.phone.label": "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *",
    "rsvp.phone.ph": "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ",
    "rsvp.side.label": "ಯಾರ ಕಡೆಯವರು?",
    "rsvp.side.both": "ಇಬ್ಬರ ಕಡೆಯವರು",
    "rsvp.side.bride": "ವಧು (ಯಶಸ್ವಿನಿ)",
    "rsvp.side.groom": "ವರ (ನಿಶ್ಚಯ್)",
    "rsvp.attend.legend": "ತಾವು ಭಾಗವಹಿಸುತ್ತೀರಾ?",
    "rsvp.attend.yes": "ಖಂಡಿತ ಸಂತೋಷದಿಂದ ಬರುತ್ತೇವೆ",
    "rsvp.attend.no": "ಕ್ಷಮಿಸಿ, ಬರಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ",
    "rsvp.party.label": "ತಮ್ಮೊಂದಿಗೆ ಇತರರು ಬರುತ್ತಿದ್ದಾರೆಯೇ?",
    "rsvp.party.hint": (e: { max: number }) => `ತಮ್ಮ ಜೊತೆಗೆ ಬರುವ ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ (ಗರಿಷ್ಠ ${e.max}).`,
    "rsvp.party.fewer": "ಅತಿಥಿ ಸಂಖ್ಯೆ ಕಡಿಮೆ ಮಾಡಿ",
    "rsvp.party.more": "ಅತಿಥಿಗಳನ್ನು ಸೇರಿಸಿ",
    "rsvp.guest.title": (e: { n: number }) => `ಅತಿಥಿ ${e.n}`,
    "rsvp.guest.name.label": "ಹೆಸರು *",
    "rsvp.guest.name.ph": "ಅವರ ಹೆಸರು",
    "rsvp.guest.rel.label": "ಸಂಬಂಧ",
    "rsvp.guest.age.label": "ವಯಸ್ಕರು / ಮಕ್ಕಳು",
    "rsvp.age.adult": "ವಯಸ್ಕರು",
    "rsvp.age.child": "ಮಕ್ಕಳು",
    "rsvp.food.you.label": "ಊಟದ ಆದ್ಯತೆ",
    "rsvp.food.label": "ಊಟ",
    "rsvp.food.veg": "ಶುದ್ಧ ಸಸ್ಯಾಹಾರ",
    "rsvp.food.nonveg": "ಸಾಂಪ್ರದಾಯಿಕ ಭೋಜನ",
    "rsvp.food.hint": "ಪಾರಂಪರಿಕ ರುಚಿಕರ ಮದುವೆ ಊಟವನ್ನು ಪ್ರೀತಿಯಿಂದ ಬಡಿಸಲಾಗುತ್ತದೆ.",
    "rsvp.rel.spouse": "ಪತಿ / ಪತ್ನಿ",
    "rsvp.rel.child": "ಮಕ್ಕಳು",
    "rsvp.rel.parent": "ತಂದೆ / ತಾಯಿ",
    "rsvp.rel.sibling": "ಸಹೋದರ / ಸಹೋದರಿ",
    "rsvp.rel.friend": "ಸ್ನೇಹಿತರು",
    "rsvp.rel.relative": "ಬಂಧುಗಳು",
    "rsvp.rel.other": "ಇತರರು",
    "rsvp.note.label": "ನವಜೋಡಿಗೆ ಹಾರೈಕೆ / ಸಂದೇಶ (ಐಚ್ಛಿಕ)",
    "rsvp.note.ph.yes": "ನಿಶ್ಚಯ್ ಮತ್ತು ಯಶಸ್ವಿನಿ ಅವರಿಗೆ ತಮ್ಮ ಪ್ರೀತಿಯ ಹಾರೈಕೆಗಳು…",
    "rsvp.note.ph.no": "ತಮ್ಮ ಉಪಸ್ಥಿತಿಯನ್ನು ಮಿಸ್ ಮಾಡಿಕೊಳ್ಳುತ್ತೇವೆ — ಹಾರೈಕೆ ತಿಳಿಸಿ…",
    "rsvp.btn.next": "ಮುಂದೆ",
    "rsvp.btn.back": "ಹಿಂದೆ",
    "rsvp.btn.send": "RSVP ಕಳುಹಿಸಿ",
    "rsvp.btn.sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…",
    "rsvp.err.name": "ದಯವಿಟ್ಟು ತಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    "rsvp.err.phone": "ಸಂಪರ್ಕಕ್ಕಾಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    "rsvp.err.guest": (e: { n: number }) => `ಅತಿಥಿ ${e.n} ಅವರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.`,
    "rsvp.err.failed": (e: { phone: string }) => `ಸಮಸ್ಯೆಯಾಗಿದೆ — ದಯವಿಟ್ಟು WhatsApp ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ: ${e.phone}`,
    "rsvp.done.headline.yes": (e: { name: string; n: number }) => `ಚನ್ನರಾಯಪಟ್ಟಣದಲ್ಲಿ ಭೇಟಿಯಾಗೋಣ, ${e.name} ಅವರೇ (ಒಟ್ಟು ${e.n} ಜನರು)!`,
    "rsvp.done.headline.no": (e: { name: string }) => `ಧನ್ಯವಾದಗಳು, ${e.name} ಅವರೇ.`,
    "rsvp.done.line.solo": "ತಮ್ಮ ಆಗಮನಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದ್ದೇವೆ — ವಿವಾಹ ಮಹೋತ್ಸವದಲ್ಲಿ ಭೇಟಿಯಾಗೋಣ.",
    "rsvp.done.line.one": (e: { guest: string }) => `ತಮಗೆ ಮತ್ತು ${e.guest} ಅವರಿಗೆ ಸ್ವಾಗತ — ಚನ್ನರಾಯಪಟ್ಟಣದಲ್ಲಿ ಭೇಟಿಯಾಗೋಣ!`,
    "rsvp.done.line.many": (e: { n: number }) => `ತಮಗೆ ಮತ್ತು ತಮ್ಮ ${e.n} ಅತಿಥಿಗಳಿಗೆ ಸ್ವಾಗತ — ಪ್ರೀತಿಯಿಂದ ಕಾಯುತ್ತಿದ್ದೇವೆ.`,
    "rsvp.done.line.no": "ತಮ್ಮ ಅನುಪಸ್ಥಿತಿ ಕಾಡುತ್ತದೆ — ತಮ್ಮ ಪ್ರೀತಿಯ ಆಶೀರ್ವಾದಕ್ಕೆ ಹೃತ್ಪೂರ್ವಕ ಧನ್ಯವಾದಗಳು.",
  },
};

// Also alias te to kn for compatibility
TRANSLATIONS.te = TRANSLATIONS.kn;

export function t(key: string, lang: "en" | "kn" | "te" = "en", params?: any): string {
  const normalizedLang = lang === "kn" ? "kn" : "en";
  const dict = TRANSLATIONS[normalizedLang] ?? TRANSLATIONS.en;
  const val = dict[key] ?? TRANSLATIONS.en[key] ?? key;
  if (typeof val === "function") {
    return val(params ?? {});
  }
  return val;
}

export function closingLineI18n(
  name: string,
  rel: "elder" | "family" | "friend" | "" = "",
  lang: "en" | "kn" | "te" = "en",
  honorific?: string
): string {
  const trimmed = name.trim();
  const normalizedLang = lang === "kn" ? "kn" : "en";

  if (normalizedLang === "kn") {
    const h = (honorific ?? "").trim();
    const suffix = h ? ` ${h}` : rel === "elder" ? " ಅವರೇ" : "";
    switch (rel) {
      case "elder":
        return `ತಮ್ಮ ಉಪಸ್ಥಿತಿ ಮತ್ತು ಶುಭಾಶೀರ್ವಾದಗಳು ನಮಗೆ ಅತ್ಯಂತ ಅಮೂಲ್ಯ${trimmed ? `, ${trimmed}${suffix}` : ""}.`;
      case "family":
        return `ಕುಟುಂಬದ ತಮ್ಮಂತಹ ಆತ್ಮೀಯರಿಲ್ಲದೆ ಈ ಶುಭ ಮಹೋತ್ಸವ ಪರಿಪೂರ್ಣವಾಗದು${trimmed ? `, ${trimmed}${suffix}` : ""}.`;
      case "friend":
        return `ನಿಮ್ಮೊಂದಿಗೆ ಈ ಸಡಗರವನ್ನು ಆಚರಿಸಲು ನಾವು ಕಾತರರಾಗಿದ್ದೇವೆ${trimmed ? `, ${trimmed}${suffix}` : ""}!`;
      default:
        return `ತಮ್ಮ ಆಗಮನಕ್ಕಾಗಿ ಪ್ರೀತಿಯಿಂದ ಕಾಯುತ್ತಿದ್ದೇವೆ${trimmed ? `, ${trimmed}${suffix}` : ""}.`;
    }
  }

  const h = (honorific ?? "").trim();
  const suffix = h ? ` ${h}` : rel === "elder" ? " avaru" : "";
  switch (rel) {
    case "elder":
      return `Your presence and blessings would mean everything to us${trimmed ? `, ${trimmed}${suffix}` : ""}.`;
    case "family":
      return `This celebration isn't complete without family like you${trimmed ? `, ${trimmed}${suffix}` : ""}.`;
    case "friend":
      return `We can't wait to celebrate with you${trimmed ? `, ${trimmed}${suffix}` : ""}!`;
    default:
      return `We can't wait to see you${trimmed ? `, ${trimmed}${suffix}` : ""}.`;
  }
}
