import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { ensureSchema, getPool } from "./db.server";
import { SEED } from "./seed";
import type { Data, Submission, SubmissionKind } from "./types";

const ADMIN_COOKIE = "asahene_admin";

function uid() { return Math.random().toString(36).slice(2, 10); }

function deepMerge<T>(base: T, override: any): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base)) return (Array.isArray(override) ? override : base) as T;
  if (typeof base === "object" && typeof override === "object") {
    const out: any = { ...(base as any) };
    for (const k of Object.keys(base as any)) out[k] = deepMerge((base as any)[k], (override as any)[k]);
    return out;
  }
  return (override ?? base) as T;
}

async function loadSiteRow(): Promise<Data> {
  await ensureSchema();
  const p = getPool();
  const { rows } = await p.query<{ data: Data }>("SELECT data FROM site_state WHERE id = 1");
  if (rows.length === 0) {
    await p.query("INSERT INTO site_state (id, data) VALUES (1, $1) ON CONFLICT (id) DO NOTHING", [SEED]);
    return SEED;
  }
  return deepMerge(SEED, rows[0].data);
}

async function loadSubmissions(): Promise<Submission[]> {
  const p = getPool();
  const { rows } = await p.query<{ id: string; kind: string; data: any; read: boolean; created_at: Date }>(
    "SELECT id, kind, data, read, created_at FROM submissions ORDER BY created_at DESC LIMIT 500"
  );
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind as SubmissionKind,
    data: r.data,
    read: r.read,
    createdAt: new Date(r.created_at).getTime(),
  }));
}

export const getSite = createServerFn({ method: "GET" }).handler(async () => {
  const data = await loadSiteRow();
  const submissions = await loadSubmissions();
  return { ...data, submissions } as Data;
});

export const saveSite = createServerFn({ method: "POST" })
  .inputValidator((d: { data: Data }) => d)
  .handler(async ({ data }) => {
    await ensureSchema();
    const p = getPool();
    // Strip submissions — they live in their own table
    const { submissions: _ignored, ...rest } = data.data as any;
    await p.query(
      `INSERT INTO site_state (id, data, updated_at) VALUES (1, $1, NOW())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [rest]
    );
    return { ok: true };
  });

export const addSubmissionFn = createServerFn({ method: "POST" })
  .inputValidator((d: { kind: SubmissionKind; data: Record<string, string> }) => d)
  .handler(async ({ data }) => {
    await ensureSchema();
    const p = getPool();
    const id = uid();
    await p.query(
      "INSERT INTO submissions (id, kind, data, read) VALUES ($1, $2, $3, false)",
      [id, data.kind, data.data]
    );
    return { ok: true, id };
  });

export const markSubmissionReadFn = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string; read: boolean }) => d)
  .handler(async ({ data }) => {
    await ensureSchema();
    await getPool().query("UPDATE submissions SET read = $2 WHERE id = $1", [data.id, data.read]);
    return { ok: true };
  });

export const deleteSubmissionFn = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await ensureSchema();
    await getPool().query("DELETE FROM submissions WHERE id = $1", [data.id]);
    return { ok: true };
  });

export const resetSiteFn = createServerFn({ method: "POST" }).handler(async () => {
  await ensureSchema();
  await getPool().query("UPDATE site_state SET data = $1, updated_at = NOW() WHERE id = 1", [SEED]);
  return { ok: true };
});

/* ---------------- Admin auth ---------------- */

function cookieToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || "dev-secret";
  return Buffer.from(`admin:${secret}`).toString("base64");
}

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD || "";
    if (!email || !password) {
      return { ok: false as const, error: "Admin credentials not configured on server." };
    }
    if (data.email.trim().toLowerCase() !== email || data.password !== password) {
      return { ok: false as const, error: "Invalid email or password." };
    }
    setCookie(ADMIN_COOKIE, cookieToken(), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return { ok: true as const, email };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  setCookie(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return { ok: true };
});

export const meFn = createServerFn({ method: "GET" }).handler(async () => {
  const c = getCookie(ADMIN_COOKIE);
  if (!c || c !== cookieToken()) return { authed: false as const };
  return { authed: true as const, email: (process.env.ADMIN_EMAIL || "").toLowerCase() };
});