import { ensureCardType, resolveFactions, ensureFactions,
		ensureDateString } from "./slots";
import { sanitizedString } from "../common_slots";
import { warn } from "../../util";
import { struct, optional, skipSlot, eager, validators } from "declepticon";

let { arrayOf, string, integerString, integer, boolean } = validators;

export default {
	name: "MutaraCard",
	fields: {
		id: integer,
		type: ensureCardType,
		name: sanitizedString,
		originalName: [sanitizedString, null],
		faction: ensureFactions,
		class: [string, null],
		skill: optional(integer, integerString, ""),
		data: [struct("MutaraCardData", {
			cost: optional(integer, integerString, ""),
			skill: optional(integer, integerString, ""),
			flipSide: optional(integer),
			sets: optional(arrayOf(sanitizedString)),
			utopiaId: optional(string)
		}), "", null],
		errata: [string, null],
		generic: [boolean, null],
		"new": [boolean, null],
		removed: [boolean, null],
		createdAt: ensureDateString,
		updatedAt: ensureDateString
	},
	slots: {
		id: eager,
		type: eager,
		name: eager,
		factions: ({ faction }) => faction ? resolveFactions(faction) : [],
		errata: ({ errata }) => {
			errata = errata && errata.trim();
			return errata || null;
		},
		generic: ({ generic }) => !!generic,
		"new": data => !!data.new,
		removed: ({ removed }) => !!removed,
		shipClass: ingestShipClass
	},
	stringify: ({ id, type, name }) => `#${id} ${type} "${name}"`
};

function ingestShipClass({ type, class: klass }, shipClasses) {
	if(type !== "ship") {
		return skipSlot;
	}

	let cls = shipClasses.get(klass) || null;
	if(!cls) {
		warn(`${this} has no associated ship class`);
	}
	return cls;
}
