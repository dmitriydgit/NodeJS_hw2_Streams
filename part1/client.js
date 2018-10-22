let fs = require('fs');
let zlib = require('zlib');
let http = require('http');

let options = {
	hostName: 'localhost',
	port: 3000,
	path: '/',
	method: 'POST',
	headers: {
		fileName: 'data.txt.gz',
		'Content-Type': 'application/octet-stream',
		'Content-Encoding': 'gzip'
	}
}

let req = http.request(options, function (res) {
	console.log('server.response: ' + res.statusCode);

})

fs.createReadStream('input_data.txt')
	.pipe(zlib.createGzip())
	.pipe(req)
	.on('finish', function () {
		console.log("file sucessfully sent");

	})
