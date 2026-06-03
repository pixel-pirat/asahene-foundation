import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Card, Field, inputCls, Btn } from "@/components/admin/AdminShell";
import { FileUpload } from "@/components/admin/FileUpload";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";
import { uploadFileFn } from "@/lib/upload.functions";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

async function uploadFile(file: File): Promise<string> {
  const base64 = await toBase64(file);
  const res = await uploadFileFn({ data: { filename: `asahene/${Date.now()}-${file.name.replace(/\s+/g, "-")}`, contentType: file.type || "application/octet-stream", base64 } });
  return res.url;
}
function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res((r.result as string).split(",")[1]); r.onerror = rej; r.readAsDataURL(file); });
}

export const Route = createFileRoute("/admin/ensemble")({
  head: () => ({ meta: [{ title: "Ensemble — Admin" }] }),
  component: EnsembleAdmin,
});

function EnsembleAdmin() {
  const members = useStore((d) => d.members);
  const instruments = useStore((d) => d.instruments);

  return (
    <AdminShell title="Ensemble & Instruments">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Members with photo upload */}
        <Card>
          <h2 className="font-display text-lg font-bold">Ensemble Members</h2>
          <MemberList members={members} uploadFile={uploadFile} />
        </Card>

        <CrudList
          title="Traditional Instruments"
          items={instruments}
          empty={{ name: "", desc: "" }}
          fields={[
            { name: "name", label: "Instrument", placeholder: "Atumpan (Talking Drums)" },
            { name: "desc", label: "Description", type: "textarea" },
          ]}
          onAdd={(v) => addItem("instruments", v)}
          onUpdate={(id, v) => updateItem("instruments", id, v)}
          onRemove={(id) => removeItem("instruments", id)}
          renderRow={(i) => (
            <div>
              <p className="font-medium">{i.name}</p>
              <p className="text-xs text-muted-foreground">{i.desc}</p>
            </div>
          )}
        />
      </div>
    </AdminShell>
  );
}

function MemberList({
  members,
  uploadFile,
}: {
  members: any[];
  uploadFile: (file: File) => Promise<string>;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const reset = () => { setName(""); setRole(""); setBio(""); setPhoto(""); };

  return (
    <div className="mt-4 space-y-4">
      {/* Add form */}
      <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/30">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add member</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Full name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field label="Role"><input className={inputCls} value={role} onChange={(e) => setRole(e.target.value)} /></Field>
        </div>
        <Field label="Short bio"><textarea rows={2} className={inputCls} value={bio} onChange={(e) => setBio(e.target.value)} /></Field>

        {/* Photo upload */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Photo</p>
          <FileUpload
            label="Upload photo"
            accept="image/*"
            onFile={uploadFile}
            onUploaded={([u]) => setPhoto(u)}
          />
          <input className={`${inputCls} mt-1`} value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="or paste URL…" />
          {photo && <img src={photo} alt="Preview" className="mt-1 h-14 w-14 rounded-full object-cover border border-border" />}
        </div>

        <Btn onClick={() => { if (!name) return; addItem("members", { name, role, bio, photo }); reset(); }}>
          <Plus className="h-4 w-4" /> Add member
        </Btn>
      </div>

      {/* List */}
      {members.map((m) => (
        <div key={m.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          {m.photo
            ? <img src={m.photo} alt={m.name} className="h-12 w-12 shrink-0 rounded-full object-cover" />
            : <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary font-display font-bold text-primary">{m.name.charAt(0)}</div>}
          <div className="min-w-0 flex-1">
            <p className="font-medium">{m.name}</p>
            <p className="text-xs text-muted-foreground">{m.role}</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => removeItem("members", m.id)}
              className="grid h-7 w-7 place-items-center rounded text-destructive hover:bg-destructive/10 transition"
            ><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
