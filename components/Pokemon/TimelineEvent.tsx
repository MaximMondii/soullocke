import cn from "classnames";
import EditEvent from "components/EditEvent";
import { Button } from "components/ui-library/Button";
import { Modal, ModalProps } from "components/ui-library/Modal";
import { TimelineBullet } from "components/ui-library/TimelineBullet";
import { useEditEvent } from "hooks/useEditEvent";
import { locationLabel, pokemonLabel, pokemonLocationLabel } from "lib/de";
import Pokeball from "lib/icons/Pokeball";
import { EventType, IPokemon, PokemonLocation } from "models";
import type { PokemonEvent } from "models";
import React from "react";
import { Edit, Frown, Inbox, Star, Users } from "react-feather";
import styles from "styles/Event.module.scss";

interface ModifiedPokemonEvent extends PokemonEvent {
  locationName?: string;
}

function PokemonTimelineEvent({
  event,
  pokemon,
  playerId,
  isLatestEvent,
}: {
  event: ModifiedPokemonEvent;
  pokemon: IPokemon;
  playerId: string;
  isLatestEvent?: boolean;
}) {
  const place = locationLabel(event.locationName || event.location);

  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { editEvent, deleteEvent } = useEditEvent(
    playerId,
    pokemon.origin,
    event.index,
  );

  async function handleSaveEdits(
    eventType: EventType,
    location: string,
    details: PokemonEvent["details"],
  ) {
    await editEvent(eventType, location, details, isLatestEvent);
    setIsEditing(false);
    setIsDeleting(false);
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleDelete() {
    setIsEditing(false);
    setIsDeleting(false);
    return deleteEvent();
  }

  function handleCancel() {
    setIsEditing(false);
    setIsDeleting(false);
  }

  let eventDetails: string = "";
  let eventDot: React.ReactElement | undefined = undefined;
  let eventColor: string = "";
  if (event.type === EventType.catch) {
    eventDot = <Pokeball size={18} />;
    eventDetails = `Gefangen bei ${place}`;
  } else if (event.type === EventType.moved) {
    eventColor = "var(--text-caption)";
    eventDot =
      event.details?.location === PokemonLocation.team ? <Users /> : <Inbox />;
    eventDetails = `Verschoben nach ${pokemonLocationLabel(
      event.details?.location,
    )} bei ${place}`;
  } else if (event.type === EventType.missed) {
    eventColor = "var(--red-primary)";
    eventDot = <Frown />;
    eventDetails = `Verpasst bei ${place}`;
  } else if (event.type === EventType.defeated) {
    eventColor = "var(--red-primary)";
    eventDetails = `Besiegt bei ${place}`;
    eventDot = <Frown />;
  } else if (event.type === EventType.soulDeath) {
    eventColor = "var(--red-primary)";
    eventDot = <Frown />;
    eventDetails = `Soul-Link: gestorben bei ${place}`;
  } else if (event.type === EventType.soulMiss) {
    eventColor = "var(--red-primary)";
    eventDot = <Frown />;
    eventDetails = `Soul-Link: Fang verpasst bei ${place}`;
  } else if (event.type === EventType.evolved) {
    eventColor = "var(--blue-primary)";
    eventDot = <Star />;
    eventDetails = `Entwickelt zu ${
      pokemonLabel(event.details?.evolution) || "?"
    } bei ${place}`;
  }

  if (isEditing) {
    return (
      <div className="py-4">
        <EditEvent
          {...{
            event,
            onCancel: handleCancel,
            onDelete: handleStartDelete,
            onFinish: handleSaveEdits,
            isLatestEvent,
          }}
        />
        <DeleteEventModal
          onCancel={() => setIsDeleting(false)}
          visible={isDeleting}
          onDelete={handleDelete}
        />
      </div>
    );
  }

  return (
    <TimelineBullet color={eventColor} dot={eventDot}>
      <div
        className={styles.container}
        onDoubleClick={() => setIsEditing(true)}
      >
        <span>{eventDetails}</span>
        <Button
          className={cn(styles.action, "icon text")}
          icon={<Edit size="1em" />}
          onClick={() => setIsEditing(true)}
        />
      </div>
    </TimelineBullet>
  );
}

interface DeleteEventModalProps extends ModalProps {
  onDelete?: () => void;
}

function DeleteEventModal(props: DeleteEventModalProps) {
  return (
    <Modal className={styles.modal} {...props}>
      <p className="text-lg m-0">Dieses Ereignis wirklich löschen?</p>
      <p className="my-2">
        Damit wird nur dieses Ereignis bei diesem Pokémon gelöscht. Fundort,
        Name und Aufenthaltsort dieses Pokémon und der verlinkten Pokémon
        bleiben unverändert.
      </p>
      <div className="flex justify-end gap-4">
        <Button className="outline" onClick={props?.onCancel as any}>
          Abbrechen
        </Button>
        <Button className="danger" onClick={props?.onDelete}>
          Löschen
        </Button>
      </div>
    </Modal>
  );
}

export default PokemonTimelineEvent;
