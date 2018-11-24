import mutara from "./mutara";
import utopia from "./utopia";
import determineCandidates from "./association";
import { report, warn } from "../util";
import { repr } from "declepticon";

export default async () => {
	let mutaraCards = await load(mutara);
	let utopiaCards = await load(utopia);

	mutaraCards.forEach((cards, type) => {
		let counterparts = utopiaCards.get(type);
		counterparts = counterparts && Array.from(counterparts.values());
		if(!counterparts || !counterparts.length) {
			warn(`missing counterparts for ${repr(type)}`);
			return;
		}

		mutaraCards.get(type).forEach(card => {
			let candidates = determineCandidates(card, counterparts);
			reportCandidates(card, candidates);
		});
	});
};

function reportCandidates(card, candidates) {
	if(candidates.length === 0) {
		report(`✗ ${card}`);
		return;
	}

	report(`✓ ${candidates.length} ${card}`, candidates.map(({ card, exact }) => {
		let prefix = exact ? "=" : "≈";
		return `[${prefix}] ${card.name} ${repr(card.id)}`;
	}).join(", "));
}

async function load(loadCards) {
	let cards = await loadCards();
	cards.forEach((items, type) => {
		let count = `${items.size}`.padStart(4); // XXX: hard-coded
		report(`… imported ${count} ${type} cards`);
	});
	return cards;
}
