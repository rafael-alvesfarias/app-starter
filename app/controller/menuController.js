var executorService = require("../service/executorService.js");

exports.desligar = function(){
	executorService.executar("desligar");
};

exports.reiniciar = function(){
	executorService.executar("reiniciar");
};

exports.suspender = function(){
	executorService.executar("suspender");
};