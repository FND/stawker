import * as descriptors from "./descriptors";
import { transformation, log, repr } from "declepticon";

class UpgradeRegistry extends Map {
	get(record) {
		let res = super.get(record.type);
		if(!res) {
			let { id, type } = record;
			log.warn(`<UtopiaUpgrade ${repr(id)}>: unexpected type ${repr(type)}`);
			return;
		}
		return res;
	}
}

export default Object.keys(descriptors).reduce((memo, type) => {
	let descriptor = descriptors[type];
	let transform = transformation(descriptor);
	memo.set(type, [descriptor.name, transform]);
	return memo;
}, new UpgradeRegistry());
