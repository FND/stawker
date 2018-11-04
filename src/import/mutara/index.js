import mutaraCard from "./card";
import mutaraShipClass from "./ship_class";
import { loadLocal } from "../../util";
import { mutara } from "../../config";
import { transformation, validators, log, repr } from "declepticon";

let TOP_LEVEL_KEYS = ["cards", "classes"];

export default async function loadCards() {
	let { cards, classes } = await load();
	log.info(`Mutara: importing ${cards.length} cards, ` +
			`${Object.keys(classes).length} ship classes`);

	// index ship classes by name
	let makeShipClass = transformation(mutaraShipClass);
	classes = Object.values(classes).reduce((memo, shipClass) => {
		shipClass = makeShipClass(shipClass);
		memo.set(shipClass.name, shipClass);
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

async function load() {
	let data = await loadLocal(mutara.uri, mutara.mirror);
	validators.objectKeys(data, TOP_LEVEL_KEYS, (type, diff) => {
		log.warn(`Mutara: ${type} entries ${repr(diff, true)}`);
	});
	return data;
}
