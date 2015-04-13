var executor = require("executorComandos.js");

exports.desligar = function(){
	executor("shutdown /s /t 0").executar();
};

exports.reiniciar = function(){
	executor("shutdown /r /t 0").executar();
};

exports.suspender = function(){
	executor("shutdown /h").executar();
};