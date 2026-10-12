import classNames from "classnames";
import { GitHub, X } from "react-feather";
import styles from "styles/WhatsNew.module.scss";

import { Button } from "./ui-library/Button";

export function WhatsNew({
  visible,
  cancel,
}: {
  visible: boolean;
  cancel: () => void;
}) {
  return (
    <div
      className={classNames(styles.container, { [styles.visible]: visible })}
    >
      <Button
        className={classNames(styles.x, "icon text")}
        icon={<X />}
        onClick={cancel}
      />

      <div>
        <h3>Hallo!</h3>
        <p>
          Das ist eine deutsche Fassung des Soullocke-Trackers von jynnie. Das
          Original findest du auf GitHub.
        </p>
        <div className="flex gap-4 center mt-4">
          <a
            className="border-0"
            href="https://github.com/jynnie/soullocke"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub />
          </a>
        </div>
      </div>

      <div className="mt-16" />

      <h3>Was ist neu?</h3>
      <div className="flex flex-col gap-5">
        <div>
          <h5>Diese Version</h5>
          <h4>Deutsch</h4>
          <ul>
            <li>🇩🇪 Pokémon- und Ortsnamen auf Deutsch, auch bei der Suche.</li>
            <li>
              🎣 Ein verpasster Fang sperrt die Slots der anderen Spieler nicht
              mehr.
            </li>
            <li>🔒 Keine Tracker und keine Werbung.</li>
          </ul>
        </div>
        <div>
          <h5>Februar 2023</h5>
          <h4>Someone&apos;s PC</h4>
          <ul>
            <li>
              🎁 Neu: Box. Ist dir egal, wann etwas passiert? Probiere die
              vereinfachte Verwaltung im Box-Tab.
            </li>
            <li>❔ Pokémon bearbeiten, die ohne Angaben hinzugefügt wurden.</li>
            <li>📍 Eigene Fundortnamen eingeben.</li>
          </ul>
        </div>
        <div>
          <h5>Januar 2023</h5>
          <h4>Sootopolis Style</h4>
          <ul>
            <li>🎨 Timeline und Übersicht neu gestaltet.</li>
            <li>📝 Doppelklick auf Pokémon-Infos zum Bearbeiten im Dialog.</li>
            <li>🔍 Bessere Suche.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
