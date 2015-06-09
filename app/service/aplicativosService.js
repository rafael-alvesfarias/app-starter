var http = require("http");
var fs = require("fs");
var path = require("path");

/**
 * Função responsável por listar todos os aplicativos
 * 
 * @param success({JSONObject}) -
 *            função de sucesso com a lista de aplicativos
 */
exports.listarAplicativos = function(success) {
	var options = {
		host : 'localhost',
		port : '3000',
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
		port : '3000',
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
	var nomeArquivo = aplicativo.imagem.split("\\").pop();
	var caminho  = path.join("D:/Desenvolvimento/Workspaces/Node JS/app-starter-server/web_app/resources/imagens/", nomeArquivo); 
	fs.createReadStream(aplicativo.imagem).pipe(fs.createWriteStream(caminho))
	var data = JSON.stringify(aplicativo);
	console.log(data);
	var options = {
		host : 'localhost',
		port : '3000',
		path : '/server/aplicativos',
		method : 'POST',
		headers : {
			'Content-Type': 'application/json',
			'Content-Length': data.length
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
		port : '3000',
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