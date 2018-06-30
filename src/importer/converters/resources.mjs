import convert from "./";
import Resource from "../../models/resource";
import { common } from "./slots";

const SOURCE_DESCRIPTOR = {
	type: "resource",
	model: Resource,
	slots: {
		name: common.name,
		cost: common.cost,
		text: common.text,
		set: common.set,
		opBanned: null,
		showShipResourceSlot: null
	}
};

export default resources => resources.map(payload => {
	return convert(payload, SOURCE_DESCRIPTOR);
});
