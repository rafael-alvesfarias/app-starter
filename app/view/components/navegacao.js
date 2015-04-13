/**
 * Função responsável por construir um objeto de navegação para determinado alvo informado.
 * Permite que determinados seletores sejam navegáveis via teclado.
 * Para adicionar funcionalidade quando um elemento navegável é selecionado, será necessário
 * escutar os eventos ganhouSelecao e perdeuSelecao.
 * @author Rafael Alves Farias
 * @param target - o alvo para vinculação com os eventos de teclado.
 * @returns navegacao
 */
Navegacao = function(target, cfg){
	var config = {
		audioSource: "../../../resources/sons/cursor.ogg",
		primeiroElemento: false
	};
	
	if(cfg){
		if(cfg.primeiroElemento){
			config.primeiroElemento = cfg.primeiroElemento;
		}
		
		if(cfg.audioSource){
			config.audioSource = cfg.audioSource;
		}
	}
	
	var objeto = {
		
		selecionado: false,
		
		verticalIndex: 0,
		
		primeiroElemento: config.primeiroElemento,
		
		/**
		 * Função que adiciona a funcionalidade de navegação para o seletor informado.
		 * @param seletor - o seletor que será usado para identificação da sequência dos elementos.
		 * @param isVertical - indicador para adicionar navegação vertical.
		 */
		adicionarNavegacao: function(seletor, isVertical){
			var elementos = $(seletor);
			if(elementos.length > 0){
				if(this.primeiroElemento == false){
					this.primeiroElemento = $(elementos[0]);
				}
				if(!isVertical){
					for(var index = 0; index < elementos.length;  index++){
						$(elementos[index]).attr("horizontal-index", index);
						$(elementos[index]).attr("vertical-index", this.verticalIndex);
					}
					this.verticalIndex++;
				}else{
					for(var index = 0; index < elementos.length;  index++){
						$(elementos[index]).attr("horizontal-index", 0);
						$(elementos[index]).attr("vertical-index", this.verticalIndex);
						this.verticalIndex++;
					}
				}
			}
			
			return this;
		},
		
		/**
		 * Remove todas as navegações.
		 */
		removerNavegacao: function(){
			if(this.selecionado){
				this.selecionado.trigger("perdeuSelecao");
			}
			this.selecionado = null;
			$("*[horizontal-index]").each(function(){
				$(this).removeAttr("horizontal-index");
				$(this).removeAttr("vertical-index");
			});
			$(target).unbind("keydown");
			$(target).unbind("keyup");
		},
		
		keyUp: function(event){
			switch(event.keyCode){
				case 8:
					$(target).trigger("voltar");
				break;
			}
		},
		
		keyDown: function(event){
			switch(event.keyCode){
				case 37: 
					if(this.selecionado){
						var indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						var indiceHorizontal = parseInt(this.selecionado.attr("horizontal-index"));
						var elementoAnterior = $("*[horizontal-index='" + (indiceHorizontal - 1) + "'][vertical-index='" + indiceVertical + "']");
						if(elementoAnterior.length){
							this.selecionar(elementoAnterior, "esquerda");
						}
					}else{
						this.selecionar(this.primeiroElemento, "esquerda");
					}
				break;
				case 38:
					if(this.selecionado){
						var indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						var elementoSuperior = $("*[vertical-index='" + (indiceVertical - 1) + "'][horizontal-index='0']");
						if(elementoSuperior.length){
							this.selecionar(elementoSuperior, "cima");
						}
					}else{
						this.selecionar(this.primeiroElemento, "cima");
					}
				break;
				case 39:
					if(this.selecionado){
						var indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						var indiceHorizontal = parseInt(this.selecionado.attr("horizontal-index"));
						var proxElemento = $("*[horizontal-index='" + (indiceHorizontal + 1) + "'][vertical-index='" + indiceVertical + "']");
						if(proxElemento.length){
							this.selecionar(proxElemento, "direita");
						}
					}else{
						this.selecionar(this.primeiroElemento, "direita");
					}
				break;
				case 40:
					if(this.selecionado){
						var indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						var elementoInferior = $("*[vertical-index='" + (indiceVertical + 1) + "'][horizontal-index='0']");
						if(elementoInferior.length){
							this.selecionar(elementoInferior, "baixo");
						}
					}else{
						this.selecionar(this.primeiroElemento, "baixo");
					}
				break;
				case 13:
					if(this.selecionado){
						this.selecionado.click();
					}
				break;
			}
		},
	
		/**
		 * Função responsável por selecionar os elementos e
		 * lançar os eventos pertinentes.
		 * O evento perdeuSelecao é lançado quando um elemento perde a seleção.
		 * O evento ganhouSelecao é lançado quando um elemento ganha a seleção.
		 * @param elemento - elemento que será selecionado
		 */
		selecionar: function(elemento, tecla){
			if(this.selecionado){
				this.selecionado.trigger("perdeuSelecao");
			}
			elemento.trigger("ganhouSelecao", tecla);
			this.selecionado = elemento;
			this.playSound();
		},
		
		playSound: function(){
			target.getElementById("som_cursor").play();
		}
	};
	
	$("body").append("<audio src='" + config.audioSource + "' id='som_cursor'></audio>");
	
	$(target).keydown(function(event){
		objeto.keyDown.call(objeto, event);
	});
	$(target).keyup(function(event){
		objeto.keyUp.call(objeto, event);
	});
	
	return objeto;
};