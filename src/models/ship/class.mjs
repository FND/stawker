import Card from "../card";

export default class ShipClass extends Card {
	constructor(fields) {
		super(fields);
		this.arcs = {
			front: fields.frontArc,
			rear: fields.rearArc
		};
	}
}
