import { resolveFactions, ensureFactions, ensureDateString } from "./slots";
import { sanitizedString } from "../common_slots";
import { struct, eager, validators } from "declepticon";

let { string, integer, boolean } = validators;

export default {
	name: "MutaraShipClass",
	fields: {
		id: integer,
		type: "shipclass",
		name: sanitizedString,
		originalName: [sanitizedString, null],
		faction: [ensureFactions, null],
		class: sanitizedString,
		data: [struct("MutaraShipClassData", {
			cost: "",
			utopiaId: ""
		}), null],
		errata: [string, null],
		generic: [boolean, null],
		"new": [boolean, null],
		removed: [boolean, null],
		createdAt: ensureDateString,
		updatedAt: ensureDateString
	},
	slots: {
		id: eager,
		name: eager,
		factions: ({ faction }) => faction ? resolveFactions(faction) : [],
		errata: ({ errata }) => errata || null,
		generic: ({ generic }) => !!generic,
		"new": data => !!data.new,
		removed: ({ removed }) => !!removed
	},
	stringify: ({ id, name }) => `#${id} "${name}"`
};
