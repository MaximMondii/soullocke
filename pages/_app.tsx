import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.scss";
import "../styles/juniper.scss";

import firebase from "firebase";
import firebaseConfig from "firebaseConfig";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

//- Firebase Setup
let db: firebase.database.Database;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();

  // Point to the RTDB emulator running on localhost.
  if (window.location.hostname === "localhost") {
    db.useEmulator("localhost", 9000);
  }
} catch (error: any) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error("Firebase admin initialization error", error.stack);
  }
}
export const FirebaseContext: React.Context<{
  db?: firebase.database.Database;
}> = React.createContext({});

function MyApp({ Component, pageProps }: AppProps | any) {
  const router = useRouter();
  // Every public page is available without a trailing slash, and query
  // parameters do not change the content of our documentation pages. Emit a
  // single canonical URL so search engines do not treat those URL variants as
  // separate pages.
  const canonicalPath =
    router.asPath.split(/[?#]/u)[0].replace(/\/+$/u, "") || "/";
  const canonicalUrl = `https://soullocke.daxim.de${canonicalPath}`;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} key="og:url" />
      </Head>
      <FirebaseContext.Provider value={{ db }}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </>
  );
}

export default MyApp;
