import retrieveCards from "../../importer";

class CardStore {
	constructor() {
		this._cards = retrieveCards(). // NB: promise
			catch(err => {
				console.error(err);
				process.exit(1); // XXX: excessive?
			});
	}

	async all() {
		return this._cards;
	}
}

export default new CardStore(); // NB: singleton
