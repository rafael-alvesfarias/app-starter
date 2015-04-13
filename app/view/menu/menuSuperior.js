var cfgNavegacao;
var popupDesligar;
var menuController = require("../../controller/menuController");

function carregarMenu(cfgNav){
	cfgNavegacao = cfgNav;
	$.get("../menu/menu.html", function(template) {
		var menuSuperior = Mustache.render($(template).filter('#menu').html());
		$("#menuSuperior").html(menuSuperior);
		$(".menu").on("ganhouSelecao", function(e){
			$(this).attr("class", $(this).attr("class") + "-selecionado");
		});
		$(".menu").on("perdeuSelecao", function(e){
			$(this).attr("class", $(this).attr("class").replace("-selecionado",""));
		});
		
		var popup = Mustache.render($(template).filter('#popup').html());
		$("body").append(popup);
		popupDesligar = new Popup($("#popupDesligar"));
		$("#popupDesligar input").on("ganhouSelecao", function(e){
			$(this).css("background-image","linear-gradient(to right, #FFF, #CCC)");
		});
		$("#popupDesligar input").on("perdeuSelecao", function(e){
			$(this).css("background-image","linear-gradient(#111, #000)");
		});
		cfgNavegacao();
	});
}

function abrirPopupDesligar(){
	navegacao.removerNavegacao();
	popupDesligar.openDialog(200, 322);
	navegacao = Navegacao(document);
	navegacao.adicionarNavegacao("#popupDesligar input", true);
	$(document).on("voltar", function(){
		if($("#popupDesligar").css("display") == "block"){
			navegacao.removerNavegacao();
			popupDesligar.closeDialog();
			configurarNavegacao();
		}
	});
}

function fecharPopupDesligar(){
	if($("#popupDesligar").css("display") == "block"){
		popupDesligar.closeDialog();
		cfgNavegacao();
	}
}

function abrirConfiguracoes(){
	win.close();
	gui.Window.open('../configuracoes/configuracoes.html', {
		  fullscreen: true,
		  toolbar: true
	});
}