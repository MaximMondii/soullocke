import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head>
          <meta
            name="og:title"
            property="og:title"
            content="Soullocke: Soul-Link-Nuzlocke-Tracker"
          />
          <meta
            name="og:description"
            content="Soullocke (Soul-Link-Nuzlocke) Tracker für Begegnungen und Fortschritt. Alle Hauptspiele der Pokémon-Reihe. Am besten für zwei Trainer, geht aber mit beliebig vielen."
          />
          <meta
            property="og:image"
            content="https://soullocke.daxim.de/clip.png"
          />

          <meta name="twitter:card" content="summary" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&family=Teko&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
