import BorgUpgrade from "../../../models/upgrade/borg";
import slot, { common } from "../slots";

export default {
	type: "borg",
	model: BorgUpgrade,
	slots: {
		name: common.name,
		factions: common.factions,
		unique: slot("unique", { optional: true }),
		cost: common.cost,
		attack: slot("attack", { optional: true }),
		skill: slot("skill", { optional: true }),
		talents: slot("talents", { optional: true }),
		range: slot("range", { optional: [undefined, ""] }),
		text: common.text,
		set: common.set,
		opBanned: null
	}
};
