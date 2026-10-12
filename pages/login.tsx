import { Button } from "components/ui-library/Button";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import styles from "styles/Home.module.css";

function Login() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Falsches Passwort.");
        setLoading(false);
        return;
      }
      const next =
        typeof router.query.next === "string" &&
        router.query.next.startsWith("/") &&
        !router.query.next.startsWith("//")
          ? router.query.next
          : "/";
      window.location.href = next;
    } catch {
      setError("Anmeldung fehlgeschlagen.");
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke – Anmelden</title>
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Soullocke</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <p className={styles.description}>Passwort eingeben:</p>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="caption">{error}</p>}
          <Button type="submit" disabled={loading || !password}>
            Anmelden
          </Button>
        </form>
      </main>
    </div>
  );
}

export default Login;
