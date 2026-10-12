import {
  EVENT_TYPE_LABELS,
  locationLabel,
  pokemonLocationLabel,
} from "lib/de";
import { pokemonOptions } from "lib/pokemonOptions";
import cn from "classnames";
import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import {
  EVENT_NAME_TO_TYPE,
  EventType,
  IPokemon,
  PlaceName,
  PokemonEvent,
  PokemonLocation,
} from "models";
import { RunContext } from "pages/run/[id]";
import React, { useCallback, useEffect } from "react";
import styles from "styles/Form.module.scss";
import { getLastItem } from "utils/getLastItem";
import { cleanName } from "utils/utils";

function AddEventForm({
  pokemon,
  onFinish,
  onCancel,
}: {
  pokemon: IPokemon;
  onFinish?: (
    eventType: EventType,
    eventLocation: PlaceName,
    eventDetails: PokemonEvent["details"],
  ) => void;
  onCancel?: () => void;
}) {
  const { allPokemon } = React.useContext(RunContext);
  const timelineLocations = useTimelineLocations();
  const latestLocation = getLastItem(timelineLocations);

  //* States----------------------------#07cf7f
  const [location, setLocation] = React.useState<string | undefined>(
    latestLocation?.key,
  );
  const [eventType, setEventType] = React.useState<EventType | undefined>(
    undefined,
  );
  const [pokemonLocation, setPokemonLocation] = React.useState<
    PokemonLocation | undefined
  >(undefined);
  const [evolution, setEvolution] = React.useState<string | undefined>(
    undefined,
  );

  const resetFields = useCallback(() => {
    setLocation(latestLocation?.key);
    setEventType(undefined);
    setPokemonLocation(undefined);
    setEvolution(undefined);
  }, [latestLocation?.key]);

  // WORKAROUND: We set the initial value to the latest location
  // once that data loads. Since we're dependent on the hook, we
  // useEffect to wait for the info.
  useEffect(() => {
    setLocation(latestLocation?.key);
  }, [latestLocation?.key]);

  //* Handlers--------------------------#07cf7f
  const handleFinish = async () => {
    resetFields();
    if (eventType && location)
      onFinish?.(eventType, location, {
        location: pokemonLocation,
        evolution,
      });
  };

  const handleCancel = async () => {
    resetFields();
    onCancel?.();
  };

  //* Options---------------------------#07cf7f
  const eventTypes = ["moved", "defeated", "evolved"];
  const pokemonLocations = Object.values(PokemonLocation).filter(
    (l) => l !== pokemon.location,
  );

  return (
    <form className="flex flex-col" name="addPokemonEvent" method="dialog">
      <div
        className={cn(styles.item, "flex gap-2 items-center")}
        // rules={[
        //   { required: true, message: "Please choose where this happened" },
        // ]}
      >
        <label>
          <span className="color-purple">*</span> Ort:
        </label>
        <SearchableSelect
          className="grow-1"
          onChange={(value) => setLocation(value)}
          value={location}
          placeholder="Ort des Ereignisses wählen"
          options={timelineLocations.map((l) => ({
            value: l.key,
            label: locationLabel(l.name),
            keywords: cleanName(l.name),
          }))}
        />
      </div>

      <div
        className={cn(styles.item, "flex gap-2 items-center")}
        // rules={[{ required: true, message: "Please choose event type" }]}
      >
        <label>
          <span className="color-purple">*</span> Ereignis:
        </label>
        <SearchableSelect
          className="grow-1"
          onChange={(value) => setEventType(value)}
          value={eventType}
          placeholder="Ereignisart wählen"
          options={eventTypes.map((t) => ({
            value: EVENT_NAME_TO_TYPE[t],
            label: EVENT_TYPE_LABELS[t] ?? t,
          }))}
        />
      </div>

      {eventType === EventType.moved && (
        <div
          className={cn(styles.item, "flex gap-2 items-center")}
          // rules={[
          //   {
          //     required: eventType === EventType.moved,
          //     message: "Please choose where your Pokémon was moved to",
          //   },
          // ]}
        >
          <label>
            <span className="color-purple">*</span> Nach:
          </label>
          <SearchableSelect
            className="grow-1"
            onChange={(value) => setPokemonLocation(value)}
            value={pokemonLocation}
            placeholder="Neuen Platz wählen"
            options={pokemonLocations.map((l) => ({
              label: pokemonLocationLabel(l),
              value: l,
            }))}
          />
        </div>
      )}

      {eventType === EventType.evolved && (
        <div
          className={cn(styles.item, "flex gap-2 items-center")}
          // rules={[
          //   {
          //     required: eventType === EventType.evolved,
          //     message: "Please choose the evolution",
          //   },
          // ]}
        >
          <label>
            <span className="color-purple">*</span> Zu:
          </label>
          <SearchableSelect
            className="grow-1"
            onChange={(value) => setEvolution(value)}
            value={evolution}
            placeholder="Entwicklung wählen"
            options={pokemonOptions(allPokemon)}
          />
        </div>
      )}

      <div className={"flex gap-2 justify-end"}>
        <Button className="outline" onClick={handleCancel}>
          Abbrechen
        </Button>

        <Button onClick={handleFinish}>Hinzufügen</Button>
      </div>
    </form>
  );
}

export default AddEventForm;
