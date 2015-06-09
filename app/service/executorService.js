var http = require("http");

/**
 * Função responsável por abrir um aplicativo
 * @returns {JSONObject} - lista de todos os aplicativos
 */
exports.abrirAplicativo = function(id){
	var options = {
		host : 'localhost',
		port : '3000',
		path : '/server/executor/abrirAplicativo/' + id,
		method : 'POST'
	};

	var req = http.request(options, function(res) {
		var msg = "";

		res.setEncoding("utf8");
		res.on("data", function(chunk) {
			msg += chunk;
		});
		res.on("end", function() {
			console.log(msg);
		});
	});
	
	req.end();
};

exports.executar = function(comando){
	var options = {
		host : 'localhost',
		port : '3000',
		path : '/server/executor/executar/' + comando,
		method : 'POST'
	};

	var req = http.request(options, function(res) {
		var msg = "";

		res.setEncoding("utf8");
		res.on("data", function(chunk) {
			msg += chunk;
		});
		res.on("end", function() {
			console.log(msg);
		});
	});
	
	req.end();
};