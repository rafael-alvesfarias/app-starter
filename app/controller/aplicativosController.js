var executor = require("executorComandos.js");
var aplicativosDAO = require("../data/dao/aplicativosDAO.js");
var configuracoesDAO = require("../data/dao/configuracoesDAO.js");

/**
 * Função responsável por listar todos os aplicativos
 * @returns {JSONObject} - lista de todos os aplicativos
 */
exports.listarAplicativos = function(){
	return aplicativosDAO.listar();
};
	
exports.obterConfiguracoes = function(){
	return configuracoesDAO.obter();
};
	
exports.executarAplicativo = function(local){
	executor(local).abrir();
};