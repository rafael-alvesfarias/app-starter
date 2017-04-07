var http = require("http");
var fs = require("fs");
var path = require("path");
var request = require("request");

/**
 * Função responsável por listar todos os aplicativos
 * 
 * @param success({JSONObject}) -
 *            função de sucesso com a lista de aplicativos
 */
exports.listarAplicativos = function(success) {
	var options = {
		host : 'localhost',
		port : '8089',
		path : '/server/aplicativos'
	};

	http.get(options, function(res) {
		var msg = "";

		res.setEncoding("utf8");
		res.on("data", function(chunk) {
			msg += chunk;
		});
		res.on("end", function() {
			success(JSON.parse(msg));
		});
	});
};

/**
 * Função responsável por buscar um aplicativo pelo seu id
 * 
 * @param id -
 *            identificador do aplicativo
 * @param success -
 *            função de sucesso.
 */
exports.obterAplicativoPorId = function(id, success) {
	var options = {
		host : 'localhost',
		port : '8089',
		path : '/server/aplicativos/' + id
	};

	http.get(options, function(res) {
		var msg = "";

		res.setEncoding("utf8");
		res.on("data", function(chunk) {
			msg += chunk;
		});
		res.on("end", function() {
			success(JSON.parse(msg));
		});
	});
};

/**
 * Função responsável por salvar um aplicativo
 * 
 * @param success -
 *            função de sucesso.
 */
exports.salvarAplicativo = function(aplicativo, success) {
	aplicativo.imagem = path.basename(aplicativo.imagem);
	var data = JSON.stringify(aplicativo);
	console.log("salvar aplicativo data:")
	console.log(data);
	var options = {
		host : 'localhost',
		port : '8089',
		path : '/server/aplicativos',
		method : 'POST',
		headers : {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data)
		}
	};

	var req = http.request(options, function(res) {
		var msg = "";

		res.setEncoding("utf8");
		res.on("data", function(chunk) {
			msg += chunk;
		});
		res.on("end", function() {
			success(msg);
		});
	});
	req.write(data)
	req.end();
};

/**
 * Função responsável por excluir um aplicativo
 * 
 * @param id -
 *            identificador do aplicativo
 * @param success -
 *            função de sucesso.
 */
exports.excluirAplicativo = function(id, success) {
	var options = {
		host : 'localhost',
		port : '8089',
		path : '/server/aplicativos/' + id,
		method : 'DELETE'
	};

	var req = http.request(options, function(res) {
		var msg = "";

		res.setEncoding("utf8");
		res.on("data", function(chunk) {
			msg += chunk;
		});
		res.on("end", function() {
			success(msg);
		});
	});
	
	req.end();
};

exports.uploadFile = function(fileName, success) {
	console.log("fileName" + fileName);
	var formData = {
		image: fs.createReadStream(fileName)
	};
	var options = {
		method: "POST",
		uri: "http://localhost:8089/server/upload",
		formData: formData
	};
	request(options, function(error, response, body) {
		if (error) {
			return console.error('upload failed:', err);
		}
		console.log('Upload successful!  Server responded with:', body);
		success();
	});
}