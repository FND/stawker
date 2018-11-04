import http from "http";
import https from "https";

export function retrieve(uri) {
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
				let err = new Error(`unexpected HTTP response: ${statusCode} ${uri}`);
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
