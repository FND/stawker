import Card from "./card";

export default class Resource extends Card {
	static get slots() {
		return super.slots.concat("cost", "desc");
	}
}
