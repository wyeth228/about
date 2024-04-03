let http = require("http");
let fs = require("fs");

http.createServer((req, res) => {
	fs.readFile("./index.html", (err, file) => {
		res.write(file);
		res.end();	
	});
}).listen(8000);
