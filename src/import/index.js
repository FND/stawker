#!/usr/bin/env node -r esm
import loadMutaraCards from "./mutara/index.js";
import loadUtopiaCards from "./utopia/index.js";
import { log } from "declepticon";

main();

async function main() {
	let cards = await loadUtopiaCards();
	cards.forEach((items, type) => {
		let count = `${items.size}`.padStart(4); // XXX: hard-coded
		log.info(`Utopia: imported ${count} ${type} cards`);
	});

	cards = await loadMutaraCards();
	cards.forEach((items, type) => {
		let count = `${items.size}`.padStart(3); // XXX: hard-coded
		log.info(`Mutara: imported ${count} ${type} cards`);
	});
}
