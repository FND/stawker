import { validators } from "declepticon";

let { nonBlankString } = validators;

let FACTIONS = new Set(["bajoran", "borg", "dominion", "federation",
	"ferengi", "independent", "kazon", "klingon", "mirror-universe",
	"no-faction", "q-continuum", "romulan", "species-8472", "vulcan", "xindi"]);

export function ensureFaction(value) {
	return FACTIONS.has(value);
}

export function sanitizedString(value) { // TODO: move into declepticon
	return nonBlankString(value) && value.trim() === value;
}
