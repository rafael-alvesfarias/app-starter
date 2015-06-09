var configuracoesDAO = require("../../data/dao/configuracoesDAO");
var aplicativosService = require("../../service/aplicativosService");

function ConfiguracoesController(){
	this.novaApp = function(){
		$(".aba").hide();
		$("#novaApp").fadeIn();
	};
		
	this.salvarApp = function(success){
		var form = document.forms[0];
		var app = new Object();
		app.nome = form.nome.value;
		app.local = form.local.value;
		app.imagem = form.imagem.value;
		aplicativosService.salvarAplicativo(app, success);
	};
		
	this.excluirApp = function(id, success){
		aplicativosService.excluirAplicativo(id, success);
	},
		
	this.salvarConfiguracoes = function(success){
		var form = document.forms[1];
		var configuracoes = new Object();
		configuracoes.background = form.background.value;
		configuracoesDAO.salvar(configuracoes, function(){
			success();
		});
	};
		
	this.listarAplicativos = function(success){
		aplicativosService.listarAplicativos(success);
	};
}