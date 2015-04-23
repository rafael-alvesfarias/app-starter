var SERVER_INSTANCE = false;

var http = require("http");
var fs = require("fs");

module.exports = function(controlador) {
	var request = function(request, response) {
		if (request.url == "/") {
			fs.readFile("controleRemoto/controle.html", function(err, buffer) {
				var data = buffer.toString("utf8");
				data = data.replace("${enderecoServidor}", request.headers.host);
				response.writeHead(200, {
					"Content-Type" : "text/html"
				});
				response.write(data);
				response.end();
			});
		} else if(request.url == "/controle-remoto") {
			var comando = "";
			request.on("data", function(data) {
				comando += data;
			});
			request.on("end", function() {
				controlador(comando);
				response.writeHead(200);
				response.end();
			});
		}
	};

	if (!SERVER_INSTANCE) {
		SERVER_INSTANCE = http.createServer(request);
		SERVER_INSTANCE.listen(3000, function() {
			console.log("server started");
		});
	} else {
		SERVER_INSTANCE.removeAllListeners("request");
		SERVER_INSTANCE.on("request", request);
	}
};