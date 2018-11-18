import { loadLocal } from "../util";
import { transformation, log, repr } from "declepticon";

export async function load({ uri, mirror }, descriptor) {
	let data = await loadLocal(uri, mirror);
	let transform = transformation(descriptor);
	return transform(data);
}

export function setUnique(map, key, value, type) {
	if(map.has(key)) {
		log.warn(`duplicate ${type} ${repr(key)}`);
	}
	map.set(key, value);
}

export let ignoreField = () => true;

export let merge = (template, obj) => Object.assign({}, template, obj);