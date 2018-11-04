let CARD_TYPES = new Set(["ship", "captain", "admiral", "upgrade", "special"]);

let FACTIONS = new Set(["bajoran", "borg", "dominion", "federation", "ferengi",
	"independent", "klingon", "kazon", "mirror universe", "romulan",
	"species 8472", "vulcan", "xindi"]);

export function ensureCardType(value) {
	return CARD_TYPES.has(value);
}

export function resolveFactions(value) {
	return csv(value) || [value];
}

export function ensureFactions(value) {
	let values = value && csv(value);
	if(values) {
		return !values.some(faction => !FACTIONS.has(faction));
	}
	return FACTIONS.has(value);
}

export function ensureDateString(value) {
	return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
}

// NB: expects delimiter with whitespace
function csv(value) {
	return value.includes(",") ? value.split(", ") : false;
}
