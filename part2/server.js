const http = require("http");
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer();

server.on('request', (req, res) => {
	console.log(req.url);
	console.log(req.method);
	console.log(req.headers);

	if (req.method === "GET") {
		console.log('Get request received');

		var all = [];
		let templateKeys = [];
		let parseHeadline = true;

		fs.createReadStream('sample.csv')
			.pipe(split2())
			.pipe(through2.obj(function (chunk, enc, callback) {


				if (parseHeadline) {
					templateKeys = chunk.toString().split(',');
					parseHeadline = false;
					return callback(null, null);
				}


				const entries = chunk.toString().split(',');
				const obj = {};
				templateKeys.forEach((el, index) => {
					obj[el] = entries[index];
				});
				return callback(null, obj);
			}))


			.on('data', function (data) {
				all.push(data)
			})
			.on('end', function () {
				//console.log(all)

				res.writeHead(200, { 'Content-Type': 'application/json' }); /* Полюбому указывать надо*/
				res.end(JSON.stringify(all));
			})

	}
	//res.writeHead(200, { 'Content-Type': 'text/plain' });

	//res.end(JSON.stringify(all));
})



server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});