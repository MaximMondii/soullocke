import { Button } from "components/ui-library/Button";
import { Modal } from "components/ui-library/Modal";
import { useLocationNotes } from "hooks/useLocationNotes";
import { locationLabel } from "lib/de";
import React, { useEffect } from "react";

function NotesModal({
  visible = false,
  locationKey,
  onCancel,
}: {
  visible: boolean;
  locationKey: string;
  onCancel: () => void;
}) {
  const { notes: existingNotes, name } = useLocationNotes(locationKey);
  const [notes, setNotes] = React.useState<string>("");

  useEffect(() => {
    setNotes(existingNotes?.value ?? "");
  }, [existingNotes?.value]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setNotes(evt.target.value);
  };

  const handleSave = () => {
    existingNotes.set(notes);
    onCancel?.();
  };

  return (
    <Modal {...{ visible, onCancel }}>
      <p className="mt-0 text-lg capitalize">Notizen: {locationLabel(name.value)}</p>
      <textarea
        className="w-full"
        placeholder="Notizen eintragen..."
        value={notes}
        onChange={handleChange}
      />

      <div className="mt-4 flex gap-2 justify-end items-center">
        <Button className="outline" key="cancel" onClick={onCancel}>
          Abbrechen
        </Button>
        <Button key="save" onClick={handleSave}>
          Speichern
        </Button>
      </div>
    </Modal>
  );
}

export default NotesModal;
