import { GERMAN_LOCATIONS } from "lib/germanLocations";
import { GERMAN_NAMES } from "lib/germanNames";
import { capitalize, cleanName } from "utils/utils";

/**
 * Anzeigenamen auf Deutsch. Gespeichert wird weiterhin immer der englische
 * Schlüssel (z.B. "bulbasaur", "canalave-city"), nur die Darstellung ändert sich.
 * Fehlt eine Übersetzung, wird der bereinigte englische Name angezeigt.
 */

export function pokemonLabel(name?: string): string {
  if (!name) return "";
  return GERMAN_NAMES[name] ?? capitalize(cleanName(name));
}

export function locationLabel(name?: string): string {
  if (!name) return "";
  return GERMAN_LOCATIONS[name] ?? capitalize(cleanName(name));
}

const POKEMON_LOCATION_LABELS: Record<string, string> = {
  team: "Team",
  box: "Box",
  grave: "Grab",
  daycare: "Pension",
};

export function pokemonLocationLabel(location?: string): string {
  if (!location) return "";
  return POKEMON_LOCATION_LABELS[location] ?? capitalize(cleanName(location));
}

export const EVENT_TYPE_LABELS: Record<string, string> = {
  moved: "Verschoben",
  defeated: "Besiegt",
  evolved: "Entwickelt",
};
