import { Button } from "components/ui-library/Button";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke – Soul-Link-Nuzlocke-Tracker</title>
        <meta
          name="description"
          content="Kostenloser Echtzeit-Tracker für Soul-Link-Nuzlocke-Runs. Begegnungen, verknüpfte Pokémon, Teams und Tode über mehrere Trainer verfolgen, ohne Account."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Soullocke</h1>
        <p className={styles.description}>
          Ein Tracker für eure{" "}
          <a href="#whatsASoullocke">Soul-Link-Nuzlocke</a>-Runs. Verfolgt
          gefangene Pokémon über zwei (oder mehr) Trainer hinweg.
        </p>

        <div className="flex center">
          <Link href="/newRun">
            <Button className={styles.startButton}>Run starten</Button>
          </Link>
        </div>
      </main>

      <section className={styles.section}>
        <h3 id="whatsASoullocke">🔗 Was ist eine Soullocke?</h3>
        <p className={styles.description}>
          Eine Soullocke ist eine Nuzlocke-Variante, bei der zwei (oder mehr)
          Trainer gleichzeitig spielen und ihre Begegnungen per Seelenband
          verknüpft sind.
        </p>
        <p className={styles.description}>
          Pokémon, die im selben Gebiet gefangen werden, sind verknüpft. Sie
          kommen zusammen ins Team, zusammen in die Box und zusammen ins Grab.
        </p>
        <p className={styles.description}>
          In dieser Version gilt: Wenn ein Spieler ein Pokémon nicht fängt,
          sperrt das die Slots der anderen nicht. Sie können trotzdem eintragen.
        </p>
        <p className={styles.description}>
          Mehr dazu in den <Link href="/rules">vollständigen Regeln</Link>
          {" "}(Englisch). Neu hier? Dann schau in die{" "}
          <Link href="/guides">Anleitung</Link> (Englisch).
        </p>
      </section>

      <section className={styles.section}>
        <h3>🤝 Run teilen?</h3>
        <p className={styles.description}>
          Jeder Run hat eine eigene URL zum Kopieren und Teilen. Jeder mit der
          URL kann den Run bearbeiten.
        </p>
        <p className={styles.description}>
          Änderungen erscheinen live bei allen Spielern.
        </p>
      </section>

      <section className={styles.section}>
        <h3>📖 Regeln & Anleitungen</h3>
        <p className={styles.description}>
          Diese Seiten sind auf Englisch.
        </p>
        <p className={styles.description}>
          <Link href="/rules">Regeln</Link>
          {" · "}
          <Link href="/about">Über</Link>
          {" · "}
          <Link href="/guides/getting-started">Erste Schritte</Link>
          {" · "}
          <Link href="/guides">Anleitungen</Link>
          {" · "}
          <Link href="/faq">FAQ</Link>
          {" · "}
          <Link href="/privacy">Datenschutz</Link>
        </p>
      </section>

      <footer className={styles.footer}>
        <span style={{ marginRight: "5px" }}>
          Deutsche Fassung des Trackers von{" "}
        </span>
        <a href="https://github.com/jynnie/soullocke">jynnie</a>
        <span style={{ margin: "0 8px", opacity: 0.5 }}>·</span>
        <Link href="/privacy">Datenschutz</Link>
      </footer>
    </div>
  );
}

export default Home;
