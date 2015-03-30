function ConfiguracoesViewHelper(){
	var gui = require('nw.gui');
	var win = gui.Window.get();
	var Mustache = require("mustache");
	
	var viewHelper = {
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
			$("#btnSalvarApp").click(function(){
				controller.salvarApp(function(){
					this.tela.aplicativos.montar();
					this.tela.mostrarAba($("#menuApps"));
				});
			});
			$(".excluirApp").click(function(){
				controller.excluirApp($(this).attr("indice"), function(){
					this.tela.aplicativos.montar();
					this.tela.mostrarAba($("#menuApps"));
				});
			});
			$("#btnSalvarCfg").click(function(){
				controller.salvarConfiguracoes(function(){
					this.tela.aplicativos.montar();
					this.tela.mostrarAba($("#menuApps"));
				});
			}
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
	
	return viewHelper;
};