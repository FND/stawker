import http from "http";
import https from "https";
import fs from "fs";
import util from "util";

export async function retrieveJSON(uri) {
	try {
		var str = await retrieve(uri); // eslint-disable-line no-var
	} catch(err) {
		throw new Error(`failed to retrieve \`${uri}\`: ${err}`);
	}
	return JSON.parse(str);
}

export function retrieve(uri) {
	if(uri.startsWith("file://")) {
		let readFile = util.promisify(fs.readFile);
		return readFile(uri.substr(7), "utf8");
	}

	let protocol;
	if(uri.startsWith("http://")) {
		protocol = http;
	} else if(uri.startsWith("https://")) {
		protocol = https;
	} else {
		throw new Error(`unrecognized URI: ${uri}`);
	}

	return new Promise((resolve, reject) => {
		protocol.get(uri, res => {
			let { statusCode } = res;
			if(statusCode < 200 || statusCode >= 300) { // XXX: crude
				let err = new Error(`unexpected response: ${statusCode} ${uri}`);
				reject(err);
			}

			let chunks = [];
			res.on("data", chunk => {
				chunks.push(chunk);
			});

			res.on("end", _ => {
				resolve(chunks.join("")); // XXX: assumes string
			});

			res.on("error", err => {
				reject(err);
			});
		});
	});
}

export function repr(value) {
	return `\`${JSON.stringify(value)}\``;
}
