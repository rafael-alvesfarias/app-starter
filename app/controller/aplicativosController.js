function AplicativosController(){
	var executor = require("executorComandos.js");
	var aplicativosDAO = AplicativosDAO();
	var configuracoesDAO = ConfiguracoesDAO();
	return {
		listarAplicativos: function(){
			return aplicativosDAO.listar();
		},
		
		obterConfiguracoes: function(){
			return configuracoesDAO.obter();
		},
		
		executarAplicativo: function(local){
			executor(local).abrir();
		}
	};
}