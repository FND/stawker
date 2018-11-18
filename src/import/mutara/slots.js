import { ensureFaction } from "../common_slots";

let CARD_TYPES = new Set(["ship", "captain", "admiral", "upgrade", "special"]);

let FACTIONS = { // normalization
	"mirror universe": "mirror-universe",
	"species 8472": "species-8472"
};

export function ensureCardType(value) {
	return CARD_TYPES.has(value);
}

export function resolveFactions(value) {
	return csv(value) || [value];
}

export function ensureFactions(value) {
	let values = value && csv(value);
	let check = faction => ensureFaction(FACTIONS[faction] || faction);
	return values ? values.every(check) : check(value);
}

export function ensureDateString(value) {
	return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);
}

// NB: expects delimiter with whitespace
function csv(value) {
	return value.includes(",") ? value.split(", ") : false;
}
