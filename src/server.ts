// Server entry point — runs in Node.js on Vercel Functions.
// Re-exports TanStack Start's built-in server handler after wrapping it
// with our branded error page for catastrophic SSR failures.

import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, ...args: unknown[]) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, ...args: unknown[]) {
    try {
      const handler = await getServerEntry();
      return await handler.fetch(request, ...args);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
