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