import { useRef, useState } from "react";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FileUploadProps = {
  /** Label shown on the button */
  label?: string;
  /** Accepted MIME types e.g. "image/*" or "image/*,video/mp4" */
  accept?: string;
  /** Allow picking multiple files at once */
  multiple?: boolean;
  /**
   * Called with each selected File. The caller is responsible for
   * doing the actual upload (e.g. calling uploadFileFn from their route).
   * Should return the public URL string on success.
   */
  onFile: (file: File) => Promise<string>;
  /** Called with all successfully uploaded URLs */
  onUploaded: (urls: string[]) => void;
};

type FileState = {
  name: string;
  status: "uploading" | "done" | "error";
  url?: string;
  error?: string;
};

/**
 * Reusable file upload button for admin pages.
 * Delegates the actual upload to the parent via `onFile` to keep
 * server-only imports out of this shared component.
 */
export function FileUpload({
  label = "Upload from device",
  accept = "image/*",
  multiple = false,
  onFile,
  onUploaded,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileState[]>([]);

  const handleFiles = async (picked: File[]) => {
    const entries: FileState[] = picked.map((f) => ({ name: f.name, status: "uploading" as const }));
    setFiles(entries);

    const urls: string[] = [];

    for (let i = 0; i < picked.length; i++) {
      try {
        const url = await onFile(picked[i]);
        urls.push(url);
        setFiles((prev) =>
          prev.map((f, j) => (j === i ? { ...f, status: "done" as const, url } : f))
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setFiles((prev) =>
          prev.map((f, j) => (j === i ? { ...f, status: "error" as const, error: msg } : f))
        );
      }
    }

    if (urls.length > 0) onUploaded(urls);
    setTimeout(() => setFiles([]), 4000);
  };

  const isUploading = files.some((f) => f.status === "uploading");

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {isUploading ? "Uploading…" : label}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const picked = Array.from(e.target.files ?? []);
          if (picked.length > 0) handleFiles(picked);
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs">
              {f.status === "uploading" && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
              {f.status === "done" && <CheckCircle2 className="h-3 w-3 text-green-500" />}
              {f.status === "error" && <AlertCircle className="h-3 w-3 text-destructive" />}
              <span className="truncate max-w-[200px] text-muted-foreground">{f.name}</span>
              {f.status === "error" && <span className="text-destructive">{f.error}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
