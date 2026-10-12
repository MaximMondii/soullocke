import classNames from "classnames";
import { Button } from "components/ui-library/Button";
import React from "react";
import styles from "styles/Location.module.scss";

function NotesButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      className={classNames(styles.listingNotesButton, "text no-underline")}
      {...{ onClick }}
    >
      Notizen
    </Button>
  );
}

export default NotesButton;
