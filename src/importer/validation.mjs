import { repr } from "./util";

export function ensureArray(value, { validator, permitted }, errMsg) {
	if(!value || !value.pop) {
		abort(errMsg, value);
	}

	return value.map(item => {
		if(permitted && !permitted.has(item)) {
			let err = rpr => errMsg(`${repr(item)} in ${rpr}`);
			abort(err, value);
		}
		return validator ? validator(item, errMsg) : item;
	});
}

export function ensureKeys(value, expected, errMsg) {
	let actual = new Set(Object.keys(value));
	if(!expected.has) {
		expected = new Set(expected);
	}

	let missing = [...expected].filter(item => !actual.has(item));
	let spurious = [...actual].filter(item => !expected.has(item));

	let [diff, type] = missing.length ? [missing, "missing"] : [spurious, "spurious"];
	if(diff.length) {
		let err = repr => errMsg(`${type} ${repr}`);
		abort(err, diff);
	}

	return value;
}

export function ensureNonEmptyString(value, errMsg) { // for convenience
	return ensureString(value, { empty: false }, errMsg);
}

export function ensureString(value, options, errMsg) {
	if(errMsg === undefined) { // shift arguments
		errMsg = options;
		options = {};
	}

	let blank = !value;
	if(blank && options.empty !== false && value === "") {
		blank = false;
	}
	if(blank || !value.substr) {
		abort(errMsg, value);
	}

	return value;
}

export function ensureIntegerString(value, errMsg) {
	let num = parseInt(value, 10);
	if(num.toString() !== value) { // XXX: crude?
		abort(errMsg, value);
	}
	return num;
}

export function ensureInteger(value, errMsg) {
	if(!Number.isInteger(value)) {
		abort(errMsg, value);
	}
	return value;
}

export function ensureBoolean(value, errMsg) {
	if(value !== true && value !== false) {
		abort(errMsg, value);
	}
	return value;
}

function abort(errMsg, value) {
	let msg = errMsg(repr(value));
	throw new Error(msg);
}
