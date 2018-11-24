import { resolveSets, ensureMarkup } from "./slots";
import { ensureFaction, sanitizedString } from "../common_slots";
import { warn } from "../../util";
import { optional, eager, validators, repr } from "declepticon";

let { arrayOf, nonBlankString, integer, boolean } = validators;

let SHIP_SLOTS = new Set(["crew", "tech", "weapon", "squadron", "borg"]);

let ACTIONS = new Set(["battlestations", "cloak", "evade", "regenerate", "scan",
	"sensor-echo", "target-lock"]);

export default {
	name: "UtopiaShip",
	fields: {
		type: "ship",
		id: sanitizedString,
		name: sanitizedString,
		classId: optional(sanitizedString),
		class: nonBlankString, // XXX: sanitize strings within Utopia
		factions: arrayOf(ensureFaction),
		text: ensureMarkup,
		unique: optional(boolean),
		cost: integer,
		upgrades: arrayOf(ensureShipSlot),
		actions: arrayOf(ensureAction),
		attack: integer,
		agility: integer,
		hull: integer,
		shields: integer,
		squadron: boolean,
		skill: optional(integer),
		set: optional(arrayOf(sanitizedString)),
		intercept: optional(value => JSON.stringify(value) === '{"ship":{},"fleet":{}}'),
		opBanned: optional(true)
	},
	slots: {
		id: eager,
		name: eager,
		class: eager(resolveShipClass),
		factions: true,
		text: ({ text }) => text.trim() || null,
		unique: ({ unique }) => !!unique,
		cost: true,
		upgrades: true,
		actions: true,
		attack: true,
		agility: true,
		hull: true,
		shields: true,
		// NB: `squadron` flag belongs into ship class, but consolidating that
		//     would require significant effort (ensuring that individual ships'
		//     information actually matches that on the corresponding class)
		squadron: true,
		skill: ingestSquadronSkill,
		sets: ({ set }, { sets }) => resolveSets(set, sets),
		banned: ({ opBanned }) => !!opBanned
	},
	// XXX: `klass` guard below is a temporary workaround for faulty Utopia data
	stringify: ({ id, name, class: klass }) => `${id} "${name}" (${klass && klass.name})`
};

function ingestSquadronSkill({ skill, squadron }) {
	let nonBlank = skill || skill === 0;
	if(nonBlank && !squadron) {
		warn(`${this}: unexpected skill ${repr(skill)} for non-squadron ship`);
	}
	return nonBlank ? skill : null;
}

function resolveShipClass({ classId, class: klass }, { shipClasses }) {
	let cls = shipClasses.byID.get(classId) || shipClasses.byName.get(klass);
	if(!cls) {
		warn(`${this}: missing ship class for ID ${repr(classId)} or name ` +
				repr(klass));
		return null;
	}
	return cls;
}

function ensureShipSlot(value) {
	return SHIP_SLOTS.has(value);
}

function ensureAction(value) {
	return ACTIONS.has(value);
}
