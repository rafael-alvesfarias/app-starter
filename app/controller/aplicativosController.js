var configuracoesDAO = require("../data/dao/configuracoesDAO.js");
var aplicativosService = require("../service/aplicativosService.js");
var executorService = require("../service/executorService.js");

/**
 * Função responsável por listar todos os aplicativos
 * @param success - função de sucesso com a lista de aplicativos
 */
exports.listarAplicativos = function(success){
	aplicativosService.listarAplicativos(success);
};
	
exports.obterConfiguracoes = function(){
	return configuracoesDAO.obter();
};
	
exports.executarAplicativo = function(id){
	executorService.abrirAplicativo(id);
};