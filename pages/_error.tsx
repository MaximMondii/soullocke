import { NextPageContext } from "next";
import { ErrorProps } from "next/error";
import styles from "styles/Error.module.scss";

const statusCodes: Record<number, string> = {
  400: "Ungültige Anfrage",
  404: "Diese Seite wurde nicht gefunden",
  405: "Methode nicht erlaubt",
  500: "Interner Serverfehler",
};

function Error({ statusCode, title }: ErrorProps) {
  const errorDetails =
    title || statusCodes[statusCode] || "Es ist ein Fehler aufgetreten";

  return (
    <div className={styles.errorBox}>
      <div>
        <h1 className={styles.statusCode}>{statusCode}</h1>
        <p className={styles.title}>{errorDetails}</p>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
