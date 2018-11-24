import { warn } from "../../util";
import { validators, repr } from "declepticon";

let { string } = validators;

const TAGS = new Set(["<b>", "</b>", "<i>", "</i>"]);

export function resolveSets(value, sets) {
	return value.reduce((memo, id) => {
		let set = sets.get(id);
		if(set) {
			memo.push(set);
		} else {
			warn(`${this}: missing set ${repr(id)}`);
		}
		return memo;
	}, []);
}

export function ensureMarkup(value) {
	let valid = string(value);
	if(!valid) {
		return false;
	}

	value.replace(/<[^>]+>/ig, match => {
		if(!TAGS.has(match.toLowerCase())) {
			warn(`${this}: invalid markup ${repr(match)} in ${repr(value)}`);
			valid = false;
		}
	});
	return valid;
}
