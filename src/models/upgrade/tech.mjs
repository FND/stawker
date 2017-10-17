import Card from "../card";

export default class TechUpgrade extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "attack",
				"hull", "skill", "talents", "range", "desc");
	}
}
