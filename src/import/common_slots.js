let FACTIONS = new Set(["bajoran", "borg", "dominion", "federation",
	"ferengi", "independent", "kazon", "klingon", "mirror-universe",
	"no-faction", "q-continuum", "romulan", "species-8472", "vulcan", "xindi"]);

export function ensureFaction(value) {
	return FACTIONS.has(value);
}
