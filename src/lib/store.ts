import { useSyncExternalStore } from "react";

const DATA_KEY = "asahene:data:v2";
const AUTH_KEY = "asahene:auth:v2";

export type ID = string;
export type Award = { id: ID; year: string; title: string; body: string };
export type Member = { id: ID; name: string; role: string; bio: string; photo: string };
export type Instrument = { id: ID; name: string; desc: string };
export type GalleryImage = { id: ID; url: string; alt: string };
export type VideoItem = { id: ID; title: string; embedUrl: string; platform: "youtube" | "facebook" | "other" };
export type PressMention = { id: ID; outlet: string; note: string; url: string; posterUrl: string };
export type PressKitFile = { id: ID; label: string; url: string };
export type Country = { id: ID; name: string; cx: number; cy: number; home: boolean };
export type LineupItem = { id: ID; label: string; note: string };
export type Affiliation = { id: ID; name: string };
export type SubmissionKind = "contact" | "booking" | "volunteer" | "partner" | "registration";
export type Submission = {
  id: ID;
  createdAt: number;
  kind: SubmissionKind;
  read: boolean;
  data: Record<string, string>;
};

export type Settings = {
  hero: { eyebrow: string; titleA: string; titleB: string; subtitle: string; heroImage: string };
  event: { name: string; dateISO: string; location: string; highlight: string; description: string };
  mission: {
    eyebrow: string; heading: string; body1: string; body2: string;
    stats: { k: string; v: string }[];
  };
  about: {
    history: string[];
    directorName: string; directorRole: string; directorBio: string;
    legalBody: string;
  };
  contact: {
    email: string; phone: string; facebook: string; youtube: string;
  };
  support: { donateAmounts: number[]; donateHeading: string };
  pressKitNote: string;
  admin: { email: string; password: string };
};

export type Data = {
  settings: Settings;
  awards: Award[];
  members: Member[];
  instruments: Instrument[];
  gallery: GalleryImage[];
  videos: VideoItem[];
  press: PressMention[];
  pressKit: PressKitFile[];
  countries: Country[];
  lineup: LineupItem[];
  affiliations: Affiliation[];
  submissions: Submission[];
};

const uid = () => Math.random().toString(36).slice(2, 10);

const SEED: Data = {
  settings: {
    hero: {
      eyebrow: "Est. 2006 • Renamed 2023",
      titleA: "Preserving Ghanaian Culture Through",
      titleB: "Music & Dance",
      subtitle: "Asahene Foundation — Honoring Our Roots, Building Our Future.",
      heroImage: "",
    },
    event: {
      name: "Ghana Day 2025 — South Australia",
      dateISO: "2025-04-21T00:00:00+09:30",
      location: "South Australia",
      highlight: "Traditional Ruler of the Year",
      description:
        "Easter Monday, 21 April 2025. A day of traditional music, dance, food and the appointment of our Traditional Ruler of the Year.",
    },
    mission: {
      eyebrow: "Our Mission",
      heading: "Honoring tradition. Touching lives.",
      body1:
        "Asahene Foundation exists to preserve Ghanaian culture at home and abroad — through authentic music, dance and theatre arts — while touching lives and supporting the less privileged in our communities.",
      body2:
        "Founded in 2006 as the Amamere Folks Music and Dance Ensemble and renamed in 2023 in honor of our mentor, the late Evans Badu, we carry our heritage forward with pride.",
      stats: [
        { k: "2006", v: "Founded as Amamere" },
        { k: "15+", v: "Countries performed" },
        { k: "6+", v: "Major awards won" },
        { k: "100s", v: "Lives touched yearly" },
      ],
    },
    about: {
      history: [
        "The group was founded in 2006 as the Amamere Folks Music and Dance Ensemble, dedicated to performing and preserving Ghana's rich traditional repertoire.",
        "On June 25, 2023, after the passing of our mentor and friend Evans Badu, the ensemble was renamed Asahene Foundation — a tribute to his vision and a renewed commitment to community service.",
        "Today the Foundation operates as a registered Ghanaian non-profit, working at home and across the diaspora.",
      ],
      directorName: "Lawrence Quaye",
      directorRole: "Director • Dance Instructor",
      directorBio:
        "Lawrence Quaye serves as the Director of Asahene Foundation and is a respected Dance Instructor at Knutsford University College. He leads the artistic direction of the ensemble and represents the Foundation at national and international engagements.",
      legalBody:
        "Legally incorporated in Ghana under the Companies Act, 1963 (Act 179) on December 12, 2018, as a company limited by guarantee.",
    },
    contact: {
      email: "director@asahenefoundation.org",
      phone: "+233 (0) 00 000 0000",
      facebook: "https://www.facebook.com/Anamereconcepts",
      youtube: "https://www.youtube.com/playlist?list=PLJAPanOB1rkGzTeBMRBvmVseDqujYJFP1",
    },
    support: { donateAmounts: [25, 50, 100, 250], donateHeading: "Choose an amount that's meaningful to you." },
    pressKitNote: "Logos, bios, high-res photos and fact sheet.",
    admin: { email: "admin@asahene.local", password: "asahene2025" },
  },
  awards: [
    { id: uid(), year: "2019", title: "Ghana Traditional Performing Act — Winner", body: "Ghana Music Awards UK" },
    { id: uid(), year: "2018", title: "Best Traditional Music Performing Acts — Nominee", body: "Ghana Music Awards UK" },
    { id: uid(), year: "2017", title: "Best Traditional Music Group — Winner", body: "Vodafone / Ghana Music Awards" },
    { id: uid(), year: "2017", title: "Best Performing Group", body: "Parazafik Festival — Bulgaria" },
    { id: uid(), year: "2017", title: "Best Entertaining Group", body: "Ankara Inter-tik Festival — Turkey" },
    { id: uid(), year: "2015", title: "Ghana Music Honour — Best Traditional Dance Group", body: "MUSIGA Ghana" },
  ],
  members: [
    { id: uid(), name: "Lawrence Quaye", role: "Director / Lead Choreographer", bio: "Dance Instructor at Knutsford University College.", photo: "" },
  ],
  instruments: [
    { id: uid(), name: "Atumpan (Talking Drums)", desc: "Twin master drums voicing proverbs and royal speech." },
    { id: uid(), name: "Djembe", desc: "Goblet hand drum carrying rhythm and energy." },
    { id: uid(), name: "Gyil (Xylophone)", desc: "Wooden Dagara/Lobi xylophone with calabash resonators." },
    { id: uid(), name: "Kpanlogo Drum", desc: "Conical Ga drum at the heart of urban folk dance." },
    { id: uid(), name: "Dawuro (Bell)", desc: "Forged iron bell that anchors the polyrhythm." },
    { id: uid(), name: "Shekere", desc: "Gourd shaker wrapped in beaded netting." },
  ],
  gallery: [],
  videos: [
    { id: uid(), title: "Asahene Foundation playlist", platform: "youtube", embedUrl: "https://www.youtube.com/embed/videoseries?list=PLJAPanOB1rkGzTeBMRBvmVseDqujYJFP1" },
  ],
  press: [
    { id: uid(), outlet: "Ghana Music Awards UK", note: "Poster placeholder", url: "", posterUrl: "" },
    { id: uid(), outlet: "MUSIGA Honours", note: "Poster placeholder", url: "", posterUrl: "" },
    { id: uid(), outlet: "Parazafik Festival", note: "Poster placeholder", url: "", posterUrl: "" },
    { id: uid(), outlet: "Vodafone Ghana", note: "Poster placeholder", url: "", posterUrl: "" },
  ],
  pressKit: [],
  countries: [
    { id: uid(), name: "Ghana", cx: 49, cy: 56, home: true },
    { id: uid(), name: "Togo", cx: 50, cy: 56, home: false },
    { id: uid(), name: "Benin", cx: 51, cy: 56, home: false },
    { id: uid(), name: "South Africa", cx: 55, cy: 80, home: false },
    { id: uid(), name: "Bulgaria", cx: 55, cy: 36, home: false },
    { id: uid(), name: "Turkey", cx: 59, cy: 39, home: false },
    { id: uid(), name: "Greece", cx: 54, cy: 38, home: false },
    { id: uid(), name: "Finland", cx: 55, cy: 22, home: false },
    { id: uid(), name: "Georgia", cx: 62, cy: 37, home: false },
    { id: uid(), name: "Germany", cx: 51, cy: 33, home: false },
    { id: uid(), name: "USA", cx: 22, cy: 40, home: false },
    { id: uid(), name: "Canada", cx: 22, cy: 28, home: false },
    { id: uid(), name: "Brazil", cx: 33, cy: 70, home: false },
    { id: uid(), name: "Chile", cx: 30, cy: 80, home: false },
  ],
  lineup: [
    { id: uid(), label: "Opening Procession & Libation", note: "TBA" },
    { id: uid(), label: "Traditional Dance Showcase", note: "TBA" },
    { id: uid(), label: "Master Drumming Performance", note: "TBA" },
    { id: uid(), label: "Appointment of Traditional Ruler", note: "TBA" },
    { id: uid(), label: "Community Feast & Music", note: "TBA" },
  ],
  affiliations: [
    { id: uid(), name: "MUSIGA Ghana" },
    { id: uid(), name: "Knutsford University College" },
    { id: uid(), name: "Ghana Music Awards UK" },
    { id: uid(), name: "Diaspora Cultural Partners" },
  ],
  submissions: [],
};

// Deep-merge stored data with SEED so newly added fields don't break older saves.
function merge<T>(base: T, override: any): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (typeof base === "object" && typeof override === "object") {
    const out: any = { ...base };
    for (const k of Object.keys(base as any)) out[k] = merge((base as any)[k], override[k]);
    return out;
  }
  return (override ?? base) as T;
}

let state: Data = SEED;
let initialized = false;

function load() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  try {
    const raw = localStorage.getItem(DATA_KEY);
    if (raw) state = merge(SEED, JSON.parse(raw));
  } catch { /* ignore */ }
}

const listeners = new Set<() => void>();
function emit() {
  if (typeof window !== "undefined") {
    try { localStorage.setItem(DATA_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getData(): Data { load(); return state; }

export function useStore<T>(selector: (d: Data) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getData()),
    () => selector(SEED),
  );
}

export function setData(updater: (d: Data) => Data) {
  load();
  state = updater(state);
  emit();
}

/* -------- Generic CRUD helpers -------- */
type Listish = {
  [K in keyof Data]: Data[K] extends Array<infer U> ? (U extends { id: string } ? K : never) : never;
}[keyof Data];

export function addItem<K extends Listish>(key: K, item: Omit<Data[K][number], "id">): Data[K][number] {
  const next = { ...(item as any), id: uid() } as Data[K][number];
  setData((d) => ({ ...d, [key]: [...(d[key] as any[]), next] } as Data));
  return next;
}
export function updateItem<K extends Listish>(key: K, id: string, patch: Partial<Data[K][number]>) {
  setData((d) => ({
    ...d,
    [key]: (d[key] as any[]).map((it) => (it.id === id ? { ...it, ...patch } : it)),
  } as Data));
}
export function removeItem<K extends Listish>(key: K, id: string) {
  setData((d) => ({ ...d, [key]: (d[key] as any[]).filter((it: any) => it.id !== id) } as Data));
}

export function updateSettings(patch: Partial<Settings> | ((s: Settings) => Settings)) {
  setData((d) => ({
    ...d,
    settings: typeof patch === "function" ? (patch as any)(d.settings) : { ...d.settings, ...patch },
  }));
}

export function resetAllData() {
  state = SEED;
  emit();
}

export function exportData(): string { return JSON.stringify(getData(), null, 2); }

export function importData(json: string) {
  const parsed = JSON.parse(json);
  state = merge(SEED, parsed);
  emit();
}

/* -------- Submissions -------- */
export function addSubmission(kind: SubmissionKind, data: Record<string, string>) {
  setData((d) => ({
    ...d,
    submissions: [
      { id: uid(), createdAt: Date.now(), kind, read: false, data },
      ...d.submissions,
    ],
  }));
}

/* -------- Admin auth (client-side only) -------- */
type Auth = { email: string; at: number } | null;
let auth: Auth = null;
let authInitialized = false;
const authListeners = new Set<() => void>();

function loadAuth() {
  if (authInitialized || typeof window === "undefined") return;
  authInitialized = true;
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (raw) auth = JSON.parse(raw);
  } catch { /* ignore */ }
}
function emitAuth() {
  if (typeof window !== "undefined") {
    try {
      if (auth) sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      else sessionStorage.removeItem(AUTH_KEY);
    } catch { /* ignore */ }
  }
  authListeners.forEach((l) => l());
}
function subscribeAuth(l: () => void) {
  loadAuth();
  authListeners.add(l);
  return () => authListeners.delete(l);
}

export function useAuth() {
  return useSyncExternalStore(
    subscribeAuth,
    () => { loadAuth(); return auth; },
    () => null,
  );
}

export function isAuthed(): boolean { loadAuth(); return !!auth; }

export function login(email: string, password: string): { ok: true } | { ok: false; error: string } {
  const cred = getData().settings.admin;
  if (email.trim().toLowerCase() !== cred.email.trim().toLowerCase() || password !== cred.password) {
    return { ok: false, error: "Invalid email or password." };
  }
  auth = { email: cred.email, at: Date.now() };
  emitAuth();
  return { ok: true };
}

export function logout() { auth = null; emitAuth(); }

export function changeCredentials(newEmail: string, newPassword: string) {
  updateSettings((s) => ({ ...s, admin: { email: newEmail, password: newPassword } }));
  auth = { email: newEmail, at: Date.now() };
  emitAuth();
}
