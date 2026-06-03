import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Card, Btn, Field, inputCls } from "@/components/admin/AdminShell";
import { FileUpload } from "@/components/admin/FileUpload";
import { useStore, addItem, removeItem, updateItem } from "@/lib/store";
import { uploadFileFn } from "@/lib/upload.functions";
import { useState } from "react";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";

async function uploadFile(file: File): Promise<string> {
  const base64 = await toBase64(file);
  const res = await uploadFileFn({ data: { filename: `asahene/${Date.now()}-${file.name.replace(/\s+/g, "-")}`, contentType: file.type || "application/octet-stream", base64 } });
  return res.url;
}
function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res((r.result as string).split(",")[1]); r.onerror = rej; r.readAsDataURL(file); });
}

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Admin" }] }),
  component: GalleryAdmin,
});

function GalleryAdmin() {
  const gallery = useStore((d) => d.gallery);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState("");

  return (
    <AdminShell title="Gallery Images">
      <Card>
        <h2 className="font-display text-lg font-bold">Add images</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Upload from your device (stored on Vercel Blob CDN) or paste an image URL.
        </p>

        {/* Upload from device */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upload from device</p>
          <FileUpload
            label="Choose images"
            accept="image/*"
            multiple
            onFile={uploadFile}
            onUploaded={(urls) => {
              urls.forEach((u) => addItem("gallery", { url: u, alt: "" }));
            }}
          />
        </div>

        {/* Or paste URL */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Or add by URL</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!url) return;
              addItem("gallery", { url, alt });
              setUrl(""); setAlt("");
            }}
            className="grid gap-3 sm:grid-cols-[2fr_1fr_auto] sm:items-end"
          >
            <Field label="Image URL">
              <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
            </Field>
            <Field label="Alt text">
              <input className={inputCls} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Description" />
            </Field>
            <Btn type="submit"><Plus className="h-4 w-4" /> Add</Btn>
          </form>
        </div>
      </Card>

      {/* Gallery grid */}
      <div className="mt-6">
        {gallery.length === 0 ? (
          <Card><p className="text-center text-sm text-muted-foreground">No images yet. Upload some above.</p></Card>
        ) : (
          <>
            <p className="mb-3 text-sm text-muted-foreground">{gallery.length} image{gallery.length !== 1 ? "s" : ""}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                  <img src={g.url} alt={g.alt} className="h-full w-full object-cover" />

                  {/* Overlay actions */}
                  <div className="absolute inset-0 flex flex-col justify-between opacity-0 transition-opacity group-hover:opacity-100 bg-secondary/60">
                    <div className="flex justify-end gap-1 p-2">
                      <button
                        onClick={() => { setEditId(g.id); setEditAlt(g.alt); }}
                        className="grid h-7 w-7 place-items-center rounded-md bg-background/90 text-foreground shadow hover:bg-primary hover:text-primary-foreground transition"
                        aria-label="Edit alt text"
                      ><Pencil className="h-3.5 w-3.5" /></button>
                      <button
                        onClick={() => { if (confirm("Remove this image?")) removeItem("gallery", g.id); }}
                        className="grid h-7 w-7 place-items-center rounded-md bg-background/90 text-destructive shadow hover:bg-destructive hover:text-destructive-foreground transition"
                        aria-label="Delete"
                      ><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>

                    {/* Edit alt text inline */}
                    {editId === g.id && (
                      <div className="flex gap-1 p-2">
                        <input
                          autoFocus
                          value={editAlt}
                          onChange={(e) => setEditAlt(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") { updateItem("gallery", g.id, { alt: editAlt }); setEditId(null); }
                            if (e.key === "Escape") setEditId(null);
                          }}
                          placeholder="Alt text"
                          className="flex-1 rounded px-2 py-1 text-xs bg-background text-foreground outline-none ring-1 ring-primary"
                        />
                        <button onClick={() => { updateItem("gallery", g.id, { alt: editAlt }); setEditId(null); }}
                          className="grid h-6 w-6 place-items-center rounded bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </button>
                        <button onClick={() => setEditId(null)} className="grid h-6 w-6 place-items-center rounded bg-muted">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {g.alt && !editId && (
                    <span className="absolute inset-x-0 bottom-0 truncate bg-secondary/80 px-2 py-1 text-[10px] text-secondary-foreground pointer-events-none">
                      {g.alt}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
