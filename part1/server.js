const http = require("http");
const fs = require('fs');
const zlib = require('zlib')

const server = http.createServer((req, res) => {

	var fileName = req.headers.filename;
	console.log("File requested: " + fileName);


	req
		.pipe(fs.createWriteStream(fileName))
		.on('finish', function () {
			res.writeHead(201, { 'content-type': 'text/plain' });
			res.end('Thats it');
			console.log('File saved ' + fileName);
		});

	// 	res.statusCode = 200;
	// 	res.setHeader('Content-Type', 'text/plain');
	// 	res.end(output);
	// });



	// let output;

	// let readStream = fs.createReadStream('input_data.txt')

	// readStream.on('data', function (chunk) {
	// 	console.log('****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************');
	// 	console.log(chunk.toString());
	// 	output = chunk.toString();
	// })
});

const hostname = '127.0.0.1';
const port = 3000;



server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});