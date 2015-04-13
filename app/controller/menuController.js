function MenuController(){
	var executor = require("executorComandos.js");
	return {
		desligar: function(){
			alert("desligar");
			executor("shutdown /s /t 0").executar();
		},
		reiniciar:function(){
			alert("reiniciar");
			executor("shutdown /r /t 0").executar();
		},
		suspender: function(){
			alert("suspender");
			executor("shutdown /h").executar();
		}
	};
}