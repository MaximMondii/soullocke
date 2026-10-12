import { GERMAN_NAMES } from "lib/germanNames";

/**
 * Optionen für die Pokémon-Suche: Anzeige und Suche auf Deutsch,
 * der gespeicherte Wert bleibt der PokéAPI-Name (Bilder/Daten hängen daran).
 * Der englische Name bleibt als Suchbegriff erhalten.
 */
export function pokemonOptions(allPokemon?: { name: string }[]) {
  return (allPokemon ?? []).map((p) => ({
    value: p.name,
    label: GERMAN_NAMES[p.name] ?? p.name,
    keywords: p.name,
  }));
}
