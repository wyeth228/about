const http = require("http");
const fs = require("fs");
const path = require("path");

function readAndSendFile(filePath, res) {
	fs.readFile(filePath, (error, file) => {
		res.write(file);
		res.end();
	});
}

http.createServer((req, res) => {
	if (req.url === "/") {
		readAndSendFile("./index.html", res);
	} else {
		const fileStream = fs.createReadStream(
			path.join(__dirname, req.url)
		).on("error", () => {
			res.end();
		}).pipe(res);
	}
}).listen(8000, "127.0.0.1");
