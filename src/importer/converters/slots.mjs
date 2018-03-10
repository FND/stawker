/* eslint-disable indent */
import { ensureArray, ensureNonEmptyString, ensureInteger,
		ensureBoolean } from "../validation";
/* eslint-enable indent */
import { repr } from "../util";

/* eslint-disable indent */
const FACTIONS = new Set(["bajoran", "borg", "dominion", "federation",
		"ferengi", "independent", "kazon", "klingon", "mirror-universe",
		"no-faction", "q-continuum", "romulan", "species-8472", "vulcan",
		"xindi"]);
/* eslint-enable indent */

const TAGS = new Set(["<b>", "</b>", "<i>", "</i>"]);

export default function slot(validator, { optional, permitted }) {
	permitted = new Set(permitted);
	if(optional !== true) {
		optional = new Set(optional);
	}

	return (value, errMsg) => {
		if(optional) {
			if((optional === true && value === undefined) ||
					(optional.has && optional.has(value))) {
				return null;
			}
		}

		if(permitted.has(value)) {
			return value;
		}

		if(validator.substr) {
			validator = common[validator];
		}
		return validator(value, errMsg);
	};
}

export let common = {
	name: ensureNonEmptyString,
	factions: (value, errMsg) => ensureArray(value, { permitted: FACTIONS }, errMsg),
	unique: ensureBoolean,
	cost: ensureInteger,
	attack: ensureInteger,
	skill: ensureInteger,
	talents: ensureInteger,
	range: ensureNonEmptyString,
	text: (value, errMsg) => {
		value = ensureNonEmptyString(value, errMsg);
		validateMarkup(value);
		return value;
	},
	set: (value, errMsg) => ensureArray(value,
			{ validator: ensureNonEmptyString }, errMsg)
};

// XXX: crude and not necessarily foolproof
function validateMarkup(txt) {
	txt.replace(/<[^>]+>/ig, match => {
		if(!TAGS.has(match.toLowerCase())) {
			throw new Error(`invalid markup: ${repr(match)} in ${repr(txt)}`);
		}
	});
}
