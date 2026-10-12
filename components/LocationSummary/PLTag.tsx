import cn from "classnames";
import { pokemonLocationLabel } from "lib/de";
import { PokemonLocation } from "models";
import React from "react";
import styles from "styles/Location.module.scss";

export function LocationTag({
  className,
  pokemonLocation,
}: {
  className?: string;
  pokemonLocation: PokemonLocation;
}) {
  return (
    <div className={cn(className, styles.tag, styles[pokemonLocation])}>
      <sup />
      {pokemonLocationLabel(pokemonLocation)}
    </div>
  );
}

export default LocationTag;
