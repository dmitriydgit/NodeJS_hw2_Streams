let http = require('http');

let options = {
	hostName: 'localhost',
	port: 3000,
	path: '/',
	method: 'GET',
}

let req = http.request(options, function (res) {
	console.log('server.response: ' + res.statusCode);
	console.log('server.massage: ' + res.statusMessage);
	//console.log(res.data); как прочитать тело ответа в этом месте????


	let rawData = '';
	res.on('data', (chunk) => {
		rawData += chunk;
		//console.log(chunk); Что это??? <Buffer 5b 7b 22 55 70 64 61 74 65 22 3a
		//console.log(JSON.parse(chunk)); Работает, но будет ли работать с большим обьемом до аккумулятора???
	});
	res.on('end', () => {
		try {
			console.log('Response received')
			console.log(JSON.parse(rawData));
		} catch (e) {
			console.error(e.message);
		}
	});
}).on('error', (e) => {
	console.error(`Got error: ${e.message}`);


})
req.end();

