var http = require("http");
var dao = require("../app/data/dao/aplicativosDAO");
var fs = require("fs");

function listarAplicativos(){
	return dao.listar();
}

exports.start = function(controleRemoto){
	http.createServer(function(request, response) {
		controleRemoto(request.url.replace("/", ""));
		fs.readFile("server/controle.html", function(err, data) {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("asd");
			response.end();
		});
	}).listen(3000, function() {
		console.log("server started");
	});
};