import type { Data } from "./types";

const uid = () => Math.random().toString(36).slice(2, 10);

export const SEED: Data = {
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