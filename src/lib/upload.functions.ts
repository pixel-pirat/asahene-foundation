import { createServerFn } from "@tanstack/react-start";
import { put } from "@vercel/blob";

/**
 * Uploads a file to Vercel Blob and returns the public URL.
 * Called from admin pages via multipart form data.
 */
export const uploadFileFn = createServerFn({ method: "POST" })
  .inputValidator((d: { filename: string; contentType: string; base64: string }) => d)
  .handler(async ({ data }) => {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not configured. Add it in your Vercel project environment variables.");
    }

    // Decode base64 back to binary
    const binary = Buffer.from(data.base64, "base64");

    const blob = await put(data.filename, binary, {
      access: "public",
      contentType: data.contentType,
      token,
    });

    return { url: blob.url };
  });
