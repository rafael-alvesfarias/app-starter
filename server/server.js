var http = require("http");
var dao = require("../app/data/dao/aplicativosDAO");

function listarAplicativos(){
	return dao.listar();
}

exports.start = function(controleRemoto){
	http.createServer(function(request, response) {
		controleRemoto(request.url.replace("/", ""));
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<h1>Teste</h1>");
		response.end();
	}).listen(3000, function() {
		console.log("server started");
	});
};