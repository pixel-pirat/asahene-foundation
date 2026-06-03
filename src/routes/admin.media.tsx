import { createFileRoute } from "@tanstack/react-router";
import { AdminShell, Card, Btn, Field, inputCls } from "@/components/admin/AdminShell";
import { FileUpload } from "@/components/admin/FileUpload";
import { CrudList } from "@/components/admin/CrudList";
import { useStore, addItem, updateItem, removeItem } from "@/lib/store";
import { uploadFileFn } from "@/lib/upload.functions";
import { Newspaper, Film, Trash2, Plus } from "lucide-react";
import { useState } from "react";

async function uploadFile(file: File): Promise<string> {
  const base64 = await toBase64(file);
  const res = await uploadFileFn({ data: { filename: `asahene/${Date.now()}-${file.name.replace(/\s+/g, "-")}`, contentType: file.type || "application/octet-stream", base64 } });
  return res.url;
}
function toBase64(file: File): Promise<string> {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res((r.result as string).split(",")[1]); r.onerror = rej; r.readAsDataURL(file); });
}

export const Route = createFileRoute("/admin/media")({
  head: () => ({ meta: [{ title: "Videos & Press — Admin" }] }),
  component: MediaAdmin,
});

function MediaAdmin() {
  const videos = useStore((d) => d.videos);
  const press = useStore((d) => d.press);
  const [videoTitle, setVideoTitle] = useState("");

  return (
    <AdminShell title="Videos & Press">
      <div className="grid gap-6 lg:grid-cols-2">

        {/* ── Videos ── */}
        <Card>
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <Film className="h-4 w-4 text-primary" /> Videos
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload MP4 videos directly, or add YouTube / Facebook embed URLs below.
          </p>

          <div className="mt-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upload video file</p>
            <Field label="Video title (set before uploading)">
              <input
                className={inputCls}
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g. Ghana Day 2025 Performance"
              />
            </Field>
            <FileUpload
              label="Upload MP4 video"
              accept="video/mp4,video/webm,video/quicktime"
              multiple={false}
              onFile={uploadFile}
              onUploaded={([url]) => {
                addItem("videos", {
                  title: videoTitle || "Uploaded video",
                  embedUrl: url,
                  platform: "other",
                });
                setVideoTitle("");
              }}
            />
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Or add YouTube / Facebook embed</p>
            <CrudList
              title=""
              description=""
              items={videos}
              empty={{ title: "", embedUrl: "", platform: "youtube" }}
              fields={[
                { name: "title", label: "Title", full: true },
                { name: "embedUrl", label: "Embed URL", placeholder: "https://www.youtube.com/embed/...", full: true, hint: "Use the /embed/ URL for YouTube." },
                { name: "platform", label: "Platform (youtube | facebook | other)" },
              ]}
              onAdd={(v) => addItem("videos", v as any)}
              onUpdate={(id, v) => updateItem("videos", id, v as any)}
              onRemove={(id) => removeItem("videos", id)}
              renderRow={(v) => (
                <div className="flex items-start gap-3">
                  <Film className="mt-0.5 h-4 w-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{v.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{v.embedUrl}</p>
                    <span className="mt-1 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">{v.platform}</span>
                  </div>
                </div>
              )}
            />
          </div>
        </Card>

        {/* ── Press Mentions ── */}
        <Card>
          <h2 className="font-display text-lg font-bold flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-primary" /> Press Mentions
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Add press coverage. Upload a poster or paste a URL.
          </p>
          <div className="mt-5">
            <PressList press={press} uploadFile={uploadFile} />
          </div>
        </Card>
      </div>
    </AdminShell>
  );
}

function PressList({
  press,
  uploadFile,
}: {
  press: any[];
  uploadFile: (file: File) => Promise<string>;
}) {
  const [outlet, setOutlet] = useState("");
  const [note, setNote] = useState("");
  const [url, setUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const reset = () => { setOutlet(""); setNote(""); setUrl(""); setPosterUrl(""); };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/30">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Add press mention</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Outlet">
            <input className={inputCls} value={outlet} onChange={(e) => setOutlet(e.target.value)} placeholder="Ghana Music Awards UK" />
          </Field>
          <Field label="Note">
            <input className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Winner — Best Traditional Act" />
          </Field>
        </div>
        <Field label="Article URL (optional)">
          <input className={inputCls} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." type="url" />
        </Field>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Poster image</p>
          <FileUpload
            label="Upload poster image"
            accept="image/*"
            onFile={uploadFile}
            onUploaded={([u]) => setPosterUrl(u)}
          />
          <input
            className={`${inputCls} mt-1`}
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="or paste URL…"
          />
          {posterUrl && (
            <img src={posterUrl} alt="Poster preview" className="mt-2 h-20 rounded object-cover border border-border" />
          )}
        </div>
        <Btn onClick={() => { if (!outlet) return; addItem("press", { outlet, note, url, posterUrl }); reset(); }}>
          <Plus className="h-4 w-4" /> Add
        </Btn>
      </div>

      {press.map((p: any) => (
        <div key={p.id} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
          {p.posterUrl
            ? <img src={p.posterUrl} alt={p.outlet} className="h-14 w-14 rounded object-cover shrink-0" />
            : <div className="grid h-14 w-14 shrink-0 place-items-center rounded bg-muted"><Newspaper className="h-5 w-5 text-muted-foreground" /></div>}
          <div className="min-w-0 flex-1">
            <p className="font-medium">{p.outlet}</p>
            <p className="text-xs text-muted-foreground">{p.note}</p>
            {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">View article</a>}
          </div>
          <button
            onClick={() => { if (confirm("Remove?")) removeItem("press", p.id); }}
            className="grid h-7 w-7 shrink-0 place-items-center rounded text-destructive hover:bg-destructive/10 transition"
          ><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      ))}
    </div>
  );
}
