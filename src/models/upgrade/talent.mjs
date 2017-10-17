import Card from "../card";

export default class TalentUpgrade extends Card {
	static get slots() {
		return super.slots.concat("factions", "unique", "cost", "attack",
				"skill", "talents", "range", "desc");
	}
}
