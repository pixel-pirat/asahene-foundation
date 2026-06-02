import { useSyncExternalStore } from "react";
import { SEED } from "./seed";
import type {
  Data, Settings, Submission, SubmissionKind,
} from "./types";
import {
  getSite, saveSite, addSubmissionFn, deleteSubmissionFn, markSubmissionReadFn,
  resetSiteFn, loginFn, logoutFn, meFn,
} from "./site.functions";

export * from "./types";

const uid = () => Math.random().toString(36).slice(2, 10);

let state: Data = SEED;
let initialized = false;
let loadingPromise: Promise<void> | null = null;

const listeners = new Set<() => void>();

function notify() { listeners.forEach((l) => l()); }

let saveTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleSave() {
  if (typeof window === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveTimer = null;
    saveSite({ data: { data: state } }).catch((err) => console.error("saveSite failed", err));
  }, 400);
}

function load() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  loadingPromise = (async () => {
    try {
      const remote = await getSite();
      state = remote as Data;
      notify();
    } catch (e) {
      console.error("getSite failed", e);
    }
  })();
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  return () => { listeners.delete(l); };
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
  notify();
  scheduleSave();
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
  notify();
  resetSiteFn().catch((e) => console.error(e));
}

export function exportData(): string { return JSON.stringify(getData(), null, 2); }

export function importData(json: string) {
  const parsed = JSON.parse(json);
  state = { ...SEED, ...parsed } as Data;
  notify();
  scheduleSave();
}

/* -------- Submissions -------- */
export function addSubmission(kind: SubmissionKind, data: Record<string, string>) {
  const optimistic: Submission = { id: uid(), createdAt: Date.now(), kind, read: false, data };
  state = { ...state, submissions: [optimistic, ...state.submissions] };
  notify();
  addSubmissionFn({ data: { kind, data } }).catch((e) => console.error("addSubmission failed", e));
}

export function markSubmissionRead(id: string, read: boolean) {
  state = {
    ...state,
    submissions: state.submissions.map((s) => (s.id === id ? { ...s, read } : s)),
  };
  notify();
  markSubmissionReadFn({ data: { id, read } }).catch((e) => console.error(e));
}

export function removeSubmission(id: string) {
  state = { ...state, submissions: state.submissions.filter((s) => s.id !== id) };
  notify();
  deleteSubmissionFn({ data: { id } }).catch((e) => console.error(e));
}

/* -------- Admin auth (server-backed via cookie) -------- */
type Auth = { email: string } | null;
let auth: Auth = null;
let authInitialized = false;
const authListeners = new Set<() => void>();

function loadAuth() {
  if (authInitialized || typeof window === "undefined") return;
  authInitialized = true;
  meFn().then((r) => {
    auth = r.authed ? { email: r.email } : null;
    authListeners.forEach((l) => l());
  }).catch(() => {});
}

function subscribeAuth(l: () => void) {
  loadAuth();
  authListeners.add(l);
  return () => { authListeners.delete(l); };
}

export function useAuth() {
  return useSyncExternalStore(
    subscribeAuth,
    () => { loadAuth(); return auth; },
    () => null,
  );
}

export function isAuthed(): boolean { return !!auth; }

export async function login(email: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const res = await loginFn({ data: { email, password } });
  if (!res.ok) return { ok: false, error: res.error };
  auth = { email: res.email };
  authListeners.forEach((l) => l());
  return { ok: true };
}

export async function logout() {
  await logoutFn().catch(() => {});
  auth = null;
  authListeners.forEach((l) => l());
}

export function changeCredentials(_newEmail: string, _newPassword: string) {
  // Admin credentials are managed via server environment variables (ADMIN_EMAIL / ADMIN_PASSWORD).
  // Update them in your project Secrets to change login credentials.
  console.warn("changeCredentials is disabled: update ADMIN_EMAIL / ADMIN_PASSWORD secrets instead.");
}
