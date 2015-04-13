var fs = require("fs");
var arquivo = "app/data/apps.json";

exports.salvar = function(aplicativo, success){
	var json = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
	aplicativo.local = replaceAll(aplicativo.local, "\\", "/");
	aplicativo.index = json.apps.length + 1;
	json.apps.push(aplicativo);
	console.log(json);
	
	fs.writeFile(arquivo, JSON.stringify(json), function(err){
		if(err) { 
	        console.log(err);
	    } else {
	    	success();
	    }
	});
};
			
exports.excluir = function(id, success){
	var json = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
	var novasApps = {"apps":[]};
	var newIndex = 0;
	$(json.apps).each(function(){
		if(this.index != id){
			var novaApp = new Object();
			novaApp.local = this.local;
			novaApp.nome = this.nome;
			novaApp.index = newIndex + 1;
			novaApp.imagem = this.imagem;
			novasApps.apps[newIndex] = novaApp;
			newIndex++;
		}
	});
	
	fs.writeFile(arquivo, JSON.stringify(novasApps), function(err){
		if(err) {
	        console.log(err);
	    } else {
	    	success();
	    }
	});
};
	
exports.listar = function(){
	return JSON.parse(fs.readFileSync(arquivo, 'utf8'));
};

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}