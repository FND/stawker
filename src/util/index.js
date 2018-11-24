import { retrieve as download } from "./http";
import { repr } from "declepticon";
import fs from "fs";
import { promisify } from "util";

export { warn } from "declepticon/src/util";

let readFile = promisify(fs.readFile);
let _writeFile = promisify(fs.writeFile);

let FILE_SCHEME = "file://";

// emits diagnostics, i.e. user-facing messages not intended for automated processing
export let report = (...msg) => void console.error(...msg);

// load JSON data, locally mirroring remote data
export async function loadLocal(uri, mirror) {
	try { // eslint-disable-next-line no-var
		return await retrieveJSON(mirror);
	} catch(err) {
		report("locally mirroring JSON data");
		let json = await retrieve(uri);
		// TODO: add timestamp to warn about stale data
		await writeFile(mirror, json, "utf8");
		return JSON.parse(json);
	}
}

async function retrieveJSON(uri) {
	try {
		var str = await retrieve(uri); // eslint-disable-line no-var
	} catch(err) {
		throw new Error(`failed to retrieve ${repr(uri)}: ${err}`);
	}
	return JSON.parse(str);
}

function retrieve(uri) {
	if(uri.startsWith(FILE_SCHEME)) {
		return readFile(uri.substr(FILE_SCHEME.length), "utf8");
	}

	return download(uri);
}

function writeFile(filepath, data, options) {
	if(filepath.startsWith(FILE_SCHEME)) {
		filepath = filepath.substr(FILE_SCHEME.length);
	}
	return _writeFile(filepath, data, options);
}
