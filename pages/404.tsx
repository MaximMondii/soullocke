import styles from "styles/Error.module.scss";

function Error() {
  return (
    <div className={styles.errorBox}>
      <div>
        <h1 className={styles.statusCode}>{404}</h1>
        <p className={styles.title}>Diese Seite wurde nicht gefunden</p>
      </div>
    </div>
  );
}

export default Error;
