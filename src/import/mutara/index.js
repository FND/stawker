import mutaraCard from "./card";
import mutaraShipClass from "./ship_class";
import { load, setUnique } from "../util";
import { report } from "../../util";
import { mutara as config } from "../../config";
import { transformation, validators } from "declepticon";

let { array } = validators;
let root = {
	name: "Mutara",
	fields: {
		cards: array,
		classes: () => true
	},
	slots: {
		cards: true,
		classes: true
	}
};

export default async function loadCards() {
	let { cards, classes } = await load(config, root);
	report(`Mutara: importing ${cards.length} cards, ` +
			`${Object.keys(classes).length} ship classes`);

	// index ship classes by name
	let makeShipClass = transformation(mutaraShipClass);
	let desc = mutaraShipClass.name;
	classes = Object.values(classes).reduce((memo, shipClass) => {
		shipClass = makeShipClass(shipClass);
		setUnique(memo, shipClass.name, shipClass, desc);
		return memo;
	}, new Map());

	// index cards by type and ID
	let makeCard = transformation(mutaraCard);
	return cards.reduce((memo, card) => {
		card = makeCard(card, classes);

		let { type } = card;
		let category = memo.get(type);
		if(!category) {
			category = new Map();
			memo.set(type, category);
		}
		category.set(card.id, card);

		return memo;
	}, new Map());
}
