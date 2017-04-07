var callback;
var popupDesligar;
var menuController = require("../../controller/menuController");
var mustache = require("mustache");

function carregarMenu(funcCallback, hideBtnConfig){
	var templateMenu = hideBtnConfig ? "menu-no-config" : "menu";
	callback = funcCallback;
	$.get("../menu/menu.html", function(template) {
		var menuSuperior = mustache.render($(template).filter("#" + templateMenu).html());
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
		callback();
	});
}

function abrirPopupDesligar(){
	popupDesligar.openDialog(200, 322);
	var navegacao = Navegacao(document);
	navegacao.adicionarNavegacao("#popupDesligar input", true);
	voltarHelper.add(function(){
		if($("#popupDesligar").css("display") == "block"){
			navegacao.removerNavegacao();
			popupDesligar.closeDialog();
			callback();
		}
	});
}

function abrirConfiguracoes(){
	win.close();
	gui.Window.open('app/view/configuracoes/configuracoes.html', {
		  fullscreen: true
	});
}