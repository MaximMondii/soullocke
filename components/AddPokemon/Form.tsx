import classNames from "classnames";
import cn from "classnames";
import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { pokemonLabel } from "lib/de";
import { pokemonOptions } from "lib/pokemonOptions";
import { RunContext } from "pages/run/[id]";
import React from "react";

function AddPokemonForm({
  defaultValues,
  finishText = "Hinzufügen",
  onFinish,
  onCancel,
  showCaughtCheckbox = true,
}: {
  defaultValues?: { pokemon: string; nickname: string };
  finishText?: string;
  onFinish?: (pokemonName: string, nickname: string, caught: boolean) => void;
  onCancel?: () => void;
  showCaughtCheckbox?: boolean;
}) {
  const { allPokemon } = React.useContext(RunContext);
  const [pokemon, setPokemon] = React.useState<string | undefined>(
    defaultValues?.pokemon,
  );
  const [nickname, setNickname] = React.useState<string | undefined>(
    defaultValues?.nickname,
  );
  const [caught, setCaught] = React.useState(true);

  const handleFinish = () => {
    if (pokemon) onFinish?.(pokemon, nickname || pokemonLabel(pokemon), caught);

    setPokemon(undefined);
    setNickname(undefined);
    setCaught(true);
  };

  const handlePokemonChange = (value?: string) => setPokemon(value);
  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt,
  ) => setNickname(evt.target.value);
  const handleCaughtChange = () => setCaught((c) => !c);

  const handleCancel = () => {
    setPokemon(undefined);
    setNickname(undefined);
    setCaught(true);
    if (onCancel) onCancel();
  };

  return (
    <form
      className="flex flex-col gap-2 my-2"
      name="addPokemon"
      method="dialog"
    >
      <SearchableSelect
        onChange={handlePokemonChange}
        value={pokemon}
        placeholder="Pokémon wählen"
        options={pokemonOptions(allPokemon)}
      />

      <div className="w-full">
        <input
          className="w-full"
          type="text"
          onChange={handleNicknameChange}
          value={nickname}
          placeholder="Spitzname"
        />
      </div>

      {showCaughtCheckbox && (
        <div className={classNames("flex gap-1")}>
          <input
            type="checkbox"
            checked={caught}
            onChange={(evt) => setCaught(evt.target.checked)}
          />
          <label onClick={handleCaughtChange}>Gefangen</label>
        </div>
      )}

      <div className={cn("flex justify-end gap-1 pointer")}>
        {onCancel && (
          <Button className="outline" onClick={handleCancel}>
            Abbrechen
          </Button>
        )}

        <Button onClick={handleFinish}>{finishText}</Button>
      </div>
    </form>
  );
}

export default AddPokemonForm;
