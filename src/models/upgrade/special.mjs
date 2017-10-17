import Card from "../card";

export default class SpecialUpgrade extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "range", "desc");
	}
}
