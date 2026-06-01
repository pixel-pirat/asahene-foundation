import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, KeyRound } from "lucide-react";
import { AdminShell, Card, Field, inputCls, Btn } from "@/components/admin/AdminShell";
import { useStore, updateSettings, changeCredentials, getData } from "@/lib/store";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Site Settings — Admin" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const s = useStore((d) => d.settings);

  return (
    <AdminShell title="Site Settings">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hero */}
        <Card>
          <h2 className="font-display text-lg font-bold">Hero (Homepage)</h2>
          <div className="mt-4 space-y-4">
            <Field label="Eyebrow"><input className={inputCls} value={s.hero.eyebrow} onChange={(e) => updateSettings({ hero: { ...s.hero, eyebrow: e.target.value } })} /></Field>
            <Field label="Title — Part A"><input className={inputCls} value={s.hero.titleA} onChange={(e) => updateSettings({ hero: { ...s.hero, titleA: e.target.value } })} /></Field>
            <Field label="Title — Highlighted Part B"><input className={inputCls} value={s.hero.titleB} onChange={(e) => updateSettings({ hero: { ...s.hero, titleB: e.target.value } })} /></Field>
            <Field label="Subtitle"><textarea rows={2} className={inputCls} value={s.hero.subtitle} onChange={(e) => updateSettings({ hero: { ...s.hero, subtitle: e.target.value } })} /></Field>
            <Field label="Hero image URL" hint="Optional. Leave blank to use the default."><input className={inputCls} value={s.hero.heroImage} onChange={(e) => updateSettings({ hero: { ...s.hero, heroImage: e.target.value } })} /></Field>
          </div>
        </Card>

        {/* Mission */}
        <Card>
          <h2 className="font-display text-lg font-bold">Mission Section</h2>
          <div className="mt-4 space-y-4">
            <Field label="Eyebrow"><input className={inputCls} value={s.mission.eyebrow} onChange={(e) => updateSettings({ mission: { ...s.mission, eyebrow: e.target.value } })} /></Field>
            <Field label="Heading"><input className={inputCls} value={s.mission.heading} onChange={(e) => updateSettings({ mission: { ...s.mission, heading: e.target.value } })} /></Field>
            <Field label="Body paragraph 1"><textarea rows={3} className={inputCls} value={s.mission.body1} onChange={(e) => updateSettings({ mission: { ...s.mission, body1: e.target.value } })} /></Field>
            <Field label="Body paragraph 2"><textarea rows={3} className={inputCls} value={s.mission.body2} onChange={(e) => updateSettings({ mission: { ...s.mission, body2: e.target.value } })} /></Field>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stats (4)</p>
              <div className="grid gap-2">
                {s.mission.stats.map((st, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input
                      className={inputCls}
                      placeholder="Number e.g. 15+"
                      value={st.k}
                      onChange={(e) => {
                        const next = [...s.mission.stats];
                        next[i] = { ...next[i], k: e.target.value };
                        updateSettings({ mission: { ...s.mission, stats: next } });
                      }}
                    />
                    <input
                      className={inputCls}
                      placeholder="Label"
                      value={st.v}
                      onChange={(e) => {
                        const next = [...s.mission.stats];
                        next[i] = { ...next[i], v: e.target.value };
                        updateSettings({ mission: { ...s.mission, stats: next } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card>
          <h2 className="font-display text-lg font-bold">About Page</h2>
          <div className="mt-4 space-y-4">
            <Field label="Director Name"><input className={inputCls} value={s.about.directorName} onChange={(e) => updateSettings({ about: { ...s.about, directorName: e.target.value } })} /></Field>
            <Field label="Director Role"><input className={inputCls} value={s.about.directorRole} onChange={(e) => updateSettings({ about: { ...s.about, directorRole: e.target.value } })} /></Field>
            <Field label="Director Bio"><textarea rows={4} className={inputCls} value={s.about.directorBio} onChange={(e) => updateSettings({ about: { ...s.about, directorBio: e.target.value } })} /></Field>
            <Field label="Legal Status text"><textarea rows={3} className={inputCls} value={s.about.legalBody} onChange={(e) => updateSettings({ about: { ...s.about, legalBody: e.target.value } })} /></Field>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">History paragraphs</p>
              <div className="space-y-2">
                {s.about.history.map((p, i) => (
                  <textarea
                    key={i}
                    rows={3}
                    className={inputCls}
                    value={p}
                    onChange={(e) => {
                      const next = [...s.about.history];
                      next[i] = e.target.value;
                      updateSettings({ about: { ...s.about, history: next } });
                    }}
                  />
                ))}
                <div className="flex gap-2">
                  <Btn variant="secondary" onClick={() => updateSettings({ about: { ...s.about, history: [...s.about.history, ""] } })}>+ Add paragraph</Btn>
                  {s.about.history.length > 1 && (
                    <Btn variant="ghost" onClick={() => updateSettings({ about: { ...s.about, history: s.about.history.slice(0, -1) } })}>Remove last</Btn>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card>
          <h2 className="font-display text-lg font-bold">Contact Info</h2>
          <div className="mt-4 space-y-4">
            <Field label="Email"><input className={inputCls} value={s.contact.email} onChange={(e) => updateSettings({ contact: { ...s.contact, email: e.target.value } })} /></Field>
            <Field label="Phone"><input className={inputCls} value={s.contact.phone} onChange={(e) => updateSettings({ contact: { ...s.contact, phone: e.target.value } })} /></Field>
            <Field label="Facebook URL"><input className={inputCls} value={s.contact.facebook} onChange={(e) => updateSettings({ contact: { ...s.contact, facebook: e.target.value } })} /></Field>
            <Field label="YouTube URL"><input className={inputCls} value={s.contact.youtube} onChange={(e) => updateSettings({ contact: { ...s.contact, youtube: e.target.value } })} /></Field>
          </div>
        </Card>

        {/* Support */}
        <Card>
          <h2 className="font-display text-lg font-bold">Support Page</h2>
          <div className="mt-4 space-y-4">
            <Field label="Donate heading"><input className={inputCls} value={s.support.donateHeading} onChange={(e) => updateSettings({ support: { ...s.support, donateHeading: e.target.value } })} /></Field>
            <Field label="Donate amounts (comma-separated)">
              <input
                className={inputCls}
                value={s.support.donateAmounts.join(", ")}
                onChange={(e) => {
                  const arr = e.target.value.split(",").map((v) => Number(v.trim())).filter((n) => !isNaN(n) && n > 0);
                  updateSettings({ support: { ...s.support, donateAmounts: arr } });
                }}
              />
            </Field>
            <Field label="Press kit note"><textarea rows={2} className={inputCls} value={s.pressKitNote} onChange={(e) => updateSettings({ pressKitNote: e.target.value })} /></Field>
          </div>
        </Card>

        {/* Admin credentials */}
        <Card>
          <h2 className="flex items-center gap-2 font-display text-lg font-bold"><KeyRound className="h-4 w-4 text-primary" /> Admin Credentials</h2>
          <CredentialsForm />
        </Card>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        <Save className="mr-1 inline h-3 w-3" /> All changes are saved automatically to your browser storage.
      </p>
    </AdminShell>
  );
}

function CredentialsForm() {
  const current = getData().settings.admin;
  const [email, setEmail] = useState(current.email);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password.length < 6) { setMsg("Password must be at least 6 characters."); return; }
        changeCredentials(email, password);
        setPassword("");
        setMsg("Credentials updated.");
      }}
      className="mt-4 space-y-4"
    >
      <Field label="Admin email"><input className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></Field>
      <Field label="New password" hint="Leave field unchanged to keep current."><input className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter new password" /></Field>
      {msg && <p className="rounded-md bg-primary/10 px-3 py-2 text-xs text-primary">{msg}</p>}
      <Btn type="submit"><Save className="h-4 w-4" /> Update credentials</Btn>
    </form>
  );
}
