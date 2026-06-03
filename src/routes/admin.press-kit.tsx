import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Card, Field, inputCls, Btn } from "@/components/admin/AdminShell";
import { FileUpload } from "@/components/admin/FileUpload";
import { useStore, addItem, removeItem } from "@/lib/store";
import { uploadFileFn } from "@/lib/upload.functions";
import { Download, Trash2, Plus } from "lucide-react";
import { useState } from "react";

async function uploadFile(file: File): Promise<string> {
  const base64 = await toBase64(file);
  const res = await uploadFileFn({ data: { filename: `asahene/${Date.now()}-${file.name.replace(/\s+/g, "-")}`, contentType: file.type || "application/octet-stream", base64 } });
  return res.url;
}
function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res((r.result as string).split(",")[1]); r.onerror = rej; r.readAsDataURL(file); });
}

export const Route = createFileRoute("/admin/press-kit")({
  head: () => ({ meta: [{ title: "Press Kit — Admin" }] }),
  component: PressKitAdmin,
});

function PressKitAdmin() {
  const files = useStore((d) => d.pressKit);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const add = () => {
    if (!label || !url) return;
    addItem("pressKit", { label, url });
    setLabel(""); setUrl("");
  };

  return (
    <AdminShell title="Press Kit Files">
      <Card>
        <h2 className="font-display text-lg font-bold">Downloadable Files</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Logos, bios, high-res photos and fact sheets shown on the Media page.
        </p>

        <div className="mt-5 space-y-4">
          {/* Upload from device */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upload file from device</p>
            <Field label="Label (shown to visitors)">
              <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Logo pack (ZIP)" />
            </Field>
            <FileUpload
              label="Upload file"
              accept="image/*,application/pdf,application/zip,.pdf,.zip,.png,.jpg,.svg"
              onFile={uploadFile}
              onUploaded={([u]) => {
                if (!label) { setUrl(u); return; }
                addItem("pressKit", { label, url: u });
                setLabel("");
              }}
            />
          </div>

          {/* Or paste URL */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Or add by URL</p>
            <div className="grid gap-2 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
              <Field label="Label">
                <input className={inputCls} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Logo pack (ZIP)" />
              </Field>
              <Field label="File URL">
                <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} type="url" placeholder="https://..." />
              </Field>
              <Btn onClick={add}><Plus className="h-4 w-4" /> Add</Btn>
            </div>
          </div>
        </div>
      </Card>

      {/* Files list */}
      <div className="mt-6 space-y-2">
        {files.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No files yet.</p>
        ) : files.map((f) => (
          <div key={f.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <Download className="h-5 w-5 text-primary shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium">{f.label}</p>
              <a href={f.url} target="_blank" rel="noreferrer" className="truncate text-xs text-primary hover:underline block">{f.url}</a>
            </div>
            <button
              onClick={() => { if (confirm("Remove this file?")) removeItem("pressKit", f.id); }}
              className="grid h-7 w-7 shrink-0 place-items-center rounded text-destructive hover:bg-destructive/10 transition"
            ><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
