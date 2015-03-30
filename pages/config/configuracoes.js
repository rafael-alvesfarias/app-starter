function Configuracoes(){
	var gui = require('nw.gui');
	var win = gui.Window.get();
	var Mustache = require("mustache");
	
	var tela = {
		init: function(){
			this.adicionarNavegacao();
			this.configurarEventos();
		},
		
		fechar: function(){
			win.close();
		},
		
		voltar: function(){
			if(!$("input:focus").length){
				win.close();
				gui.Window.open('../../index.html', {
					  fullscreen: false,
					  toolbar: true
				});
			}
		},
		
		adicionarNavegacao: function(){
			var navegacao = Navegacao(document);
			navegacao
				.adicionarNavegacao(".menu")
				.adicionarNavegacao(".menuConfig", true);
		},
		
		configurarEventos: function(){
			win.on('close', function() {
				this.hide();
				this.close(true);
			});
			$(document).on("voltar", tela.voltar);
			$(".menuConfig").on("ganhouSelecao", function(e){
				$(this).addClass("menuConfigSelecionado");
				$(this).click();
			});
			$(".menuConfig").on("perdeuSelecao", function(e){
				$(this).removeClass("menuConfigSelecionado");
			});
			$(".menu").on("ganhouSelecao", function(e){
				$(this).attr("class", $(this).attr("class") + "-selecionado");
			});
			$(".menu").on("perdeuSelecao", function(e){
				$(this).attr("class", $(this).attr("class").replace("-selecionado",""));
			});
		},
		
		mostrarAba: function(elemento){
			$(".aba").css("display","none");
			$("#"+$(elemento).attr("id-aba")).fadeIn("slow");
		},
		
		aplicativos: {
			montar: function(){
				var dao = AplicativosDAO();
				var template = $("#tmplApps").html();
				var view = dao.listar();
				Mustache.parse(template);
				var rendered = Mustache.render(template, view);
				$("#aplicativos").html(rendered);
			}
		},
		
		novoAplicativo: {
			carregarLocal: function(chooser){
				$("#txtLocal").val($(chooser).val());
			},
			carregarImagem: function(chooser){
				$("#previewImg").attr("src", $(chooser).val());
			}
		},
		
		aparencia: {
			carregarBackground: function(chooser){
				$("#txtBackground").val($(chooser).val());
			}
		}
	};

	var appManager = {
		nova: function(){
			$(".aba").css("display","none");
			$("#novaApp").fadeIn();
		},
		
		salvar: function(){
			var dao = AplicativosDAO(); 
			var form = document.forms[0];
			var app = new Object();
			app.nome = form.nome.value;
			app.local = form.local.value;
			app.imagem = form.imagem.value;
			dao.salvar(app, function(){
				this.tela.aplicativos.montar();
				this.tela.mostrarAba($("#menuApps"));
			});
		},
		
		excluir: function(id){
			var dao = AplicativosDAO(); 
			dao.excluir(id, function(){
				this.tela.aplicativos.montar();
				this.tela.mostrarAba($("#menuApps"));
			});
		}
	};

	var configManager = {
		salvar: function(){
			var dao = ConfiguracoesDAO();
			var form = document.forms[1];
			var configuracoes = new Object();
			configuracoes.background = form.background.value;
			dao.salvar(configuracoes, function(){
				this.tela.aplicativos.montar();
				this.tela.mostrarAba($("#menuApps"));
			});
		}
	};
	
	return {
		tela: tela,
		appManager: appManager,
		configManager: configManager
	};
}


function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}