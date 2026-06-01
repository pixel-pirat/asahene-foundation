import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Card, Btn, Field, inputCls } from "@/components/admin/AdminShell";
import { useStore, addItem, removeItem } from "@/lib/store";
import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Admin" }] }),
  component: GalleryAdmin,
});

function GalleryAdmin() {
  const gallery = useStore((d) => d.gallery);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      addItem("gallery", { url: dataUrl, alt: file.name });
    };
    reader.readAsDataURL(file);
  };

  return (
    <AdminShell title="Gallery Images">
      <Card>
        <h2 className="font-display text-lg font-bold">Add image</h2>
        <p className="mt-1 text-xs text-muted-foreground">Paste an image URL or upload a file. Uploaded files are stored as data URLs in browser storage.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!url) return;
            addItem("gallery", { url, alt });
            setUrl(""); setAlt("");
          }}
          className="mt-5 grid gap-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end"
        >
          <Field label="Image URL"><input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." /></Field>
          <Field label="Alt text"><input className={inputCls} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Ensemble at festival" /></Field>
          <Btn type="submit"><Plus className="h-4 w-4" /> Add</Btn>
        </form>
        <label className="mt-4 flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10">
          <Upload className="h-4 w-4" /> Upload from device
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => { Array.from(e.target.files ?? []).forEach(onFile); e.target.value = ""; }}
          />
        </label>
      </Card>

      <div className="mt-6">
        {gallery.length === 0 ? (
          <Card><p className="text-center text-sm text-muted-foreground">No images yet.</p></Card>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((g) => (
              <div key={g.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
                <img src={g.url} alt={g.alt} className="h-full w-full object-cover" />
                <button
                  onClick={() => { if (confirm("Remove this image?")) removeItem("gallery", g.id); }}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-md bg-background/90 text-destructive opacity-0 shadow transition group-hover:opacity-100"
                  aria-label="Delete"
                ><Trash2 className="h-4 w-4" /></button>
                {g.alt && <span className="absolute inset-x-0 bottom-0 truncate bg-secondary/80 px-2 py-1 text-[10px] text-secondary-foreground">{g.alt}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
