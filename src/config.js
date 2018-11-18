import path from "path";

export let mutara = {
	uri: "https://mutara.herokuapp.com/attack-wing/data",
	mirror: localData("mutara.json")
};

export let utopia = {
	uri: "https://kfnexus.github.io/staw-utopia/data/data.json",
	mirror: localData("utopia.json")
};

function localData(filename) {
	return "file://" + path.resolve(__dirname, "../data", filename);
}
