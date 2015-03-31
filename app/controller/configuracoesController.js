function ConfiguracoesController(){	
	var controller = {
		novaApp: function(){
			$(".aba").hide();
			$("#novaApp").fadeIn();
		},
		
		salvarApp: function(success){
			var dao = AplicativosDAO(); 
			var form = document.forms[0];
			var app = new Object();
			app.nome = form.nome.value;
			app.local = form.local.value;
			app.imagem = form.imagem.value;
			dao.salvar(app, function(){
				success();
			});
		},
		
		excluirApp: function(id, success){
			var dao = AplicativosDAO(); 
			dao.excluir(id, function(){
				success();
			});
		},
		
		salvarConfiguracoes: function(success){
			var dao = ConfiguracoesDAO();
			var form = document.forms[1];
			var configuracoes = new Object();
			configuracoes.background = form.background.value;
			dao.salvar(configuracoes, function(){
				success();
			});
		}
	};
	
	return controller;
}