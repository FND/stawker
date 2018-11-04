#!/usr/bin/env node -r esm
import loadCards from "./mutara/index.js";
import { log } from "declepticon";

main();

async function main() {
	let cards = await loadCards();
	cards.forEach((items, type) => {
		let count = `${items.size}`.padStart(3); // XXX: hard-coded
		log.info(`Mutara: imported ${count} ${type} cards`);
	});
}
