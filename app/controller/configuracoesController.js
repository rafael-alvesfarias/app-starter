var configuracoesDAO = require("../../data/dao/configuracoesDAO");
var appsDAO = require("../../data/dao/aplicativosDAO");

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
		appsDAO.salvar(app, function(){
			success();
		});
	};
		
	this.excluirApp = function(id, success){
		appsDAO.excluir(id, function(){
			success();
		});
	},
		
	this.salvarConfiguracoes = function(success){
		var form = document.forms[1];
		var configuracoes = new Object();
		configuracoes.background = form.background.value;
		configuracoesDAO.salvar(configuracoes, function(){
			success();
		});
	};
		
	this.listarAplicativos = function(){
		return appsDAO.listar();
	};
}