import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { login, useAuth } from "@/lib/store";
import { Field, inputCls, Btn } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Asahene Foundation" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth) navigate({ to: "/admin" });
  }, [auth, navigate]);

  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="inline-grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold ring-4 ring-primary/20">A</div>
          <h1 className="mt-4 font-display text-3xl font-bold">Admin Console</h1>
          <p className="mt-1 text-sm text-secondary-foreground/70">Sign in to manage the Asahene Foundation site.</p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            const res = await login(email, password);
            if (!res.ok) setError(res.error);
          }}
          className="rounded-2xl border border-primary/20 bg-secondary/50 p-6 shadow-xl space-y-4 backdrop-blur"
        >
          <Field label="Email">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className={inputCls} />
          </Field>
          <Field label="Password">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className={inputCls} />
          </Field>
          {error && <p className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">{error}</p>}
          <Btn type="submit" className="w-full"><LogIn className="h-4 w-4" /> Sign In</Btn>
          <p className="text-center text-[11px] text-secondary-foreground/60">
            Use the credentials configured in your project's <span className="font-mono">ADMIN_EMAIL</span> / <span className="font-mono">ADMIN_PASSWORD</span> secrets.
          </p>
        </form>
      </div>
    </div>
  );
}
