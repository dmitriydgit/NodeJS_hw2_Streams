const http = require("http");
const fs = require('fs');
const gzip = require('zlib')


const server = http.createServer(function (req, res) {
	const fileName = req.headers.filename;
	console.log(req.headers);
	console.log("File requested : " + fileName);

	req
		.on('error', function (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Error ocured');
			console.error(err.stack);
		})

		.pipe(gzip.Unzip())
		.pipe(fs.createWriteStream(fileName))
		.on('finish', function () {
			res.writeHead(201, { 'Content-Type': 'text/plain' })
			res.end('That\'s it\n');
			console.log('File saved' + fileName);

		})
})


const hostname = '127.0.0.1';
const port = 3000;



server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});