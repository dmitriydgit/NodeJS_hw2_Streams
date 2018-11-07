let fs = require('fs');
let gzip = require('zlib');
let http = require('http');

let options = {
	hostName: 'localhost',
	port: 3000,
	path: '/',
	method: 'POST',
	headers: {
		'filename': 'data.txt',
		'Content-Type': 'application/gzip',
		'Content-Encoding': 'gzip'
	}
}


let req = http.request(options, function (res) {
	console.log('server.response: ' + res.statusCode);

})

fs.createReadStream('input_data.txt')
	.on('error', (err) => {
		console.error(err.stack);
	})
	.pipe(gzip.createGzip())
	.pipe(req)
	.on('finish', function () {
		console.log("file sucessfully sent");
	})
