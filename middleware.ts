import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_COOKIE = "sl_auth";

/** Cookie-Wert = SHA-256(Passwort + Salt). Das Passwort selbst landet nie im Cookie. */
async function tokenFor(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${password}:soullocke-v1`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // Ohne gesetztes Passwort: lokal offen, in Produktion gesperrt (fail closed).
  if (!password) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    // Kein Passwort gesetzt: alle landen auf /login, dort ist keine Anmeldung möglich.
    return redirectToLogin(req);
  }

  const cookie = req.cookies.get(AUTH_COOKIE);
  if (cookie && cookie === (await tokenFor(password))) {
    return NextResponse.next();
  }

  return redirectToLogin(req);
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  const next = req.nextUrl.pathname + req.nextUrl.search;
  if (next !== "/") url.searchParams.set("next", next);
  return NextResponse.redirect(url);
}

export const config = {
  // Alles außer Login, Login-API, Next-Interna und statische Dateien.
  matcher: [
    "/((?!login|api/login|_next/|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt|xml|woff2?)$).*)",
  ],
};
