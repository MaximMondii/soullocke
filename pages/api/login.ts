import { createHash, timingSafeEqual } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

function tokenFor(password: string): string {
  return createHash("sha256").update(`${password}:soullocke-v1`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const password = process.env.SITE_PASSWORD;
  if (req.method !== "POST" || !password) {
    return res.status(405).json({ ok: false });
  }

  const given = typeof req.body?.password === "string" ? req.body.password : "";
  if (!safeEqual(given, password)) {
    return res.status(401).json({ ok: false });
  }

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  // 1 Jahr gültig, damit man sich nur einmal anmelden muss.
  res.setHeader(
    "Set-Cookie",
    `sl_auth=${tokenFor(password)}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${secure}`,
  );
  return res.status(200).json({ ok: true });
}
