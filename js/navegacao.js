/**
 * @author Rafael Alves Farias
 * Função responsável por contruir um objeto de navegação para determinado alvo informado.
 * Permite que determinados seletores sejam navegáveis via teclado.
 * Para adicionar funcionalidade quando um elemento navegável é selecionado, será necessário
 * escutar os eventos ganhouSelecao e perdeuSelecao.
 * @param target - o alvo para vinculação com os elementos de teclado.
 * @param primeiroElemento - o primeiro elemento que será selecionado ao navegar pela primeira vez.
 * @returns navegacao
 */
Navegacao = function(target, primeiroElemento){
	var objeto = {
		
		selecionado: false,
		
		verticalIndex: 0,
		
		/**
		 * Função que adiciona a funcionalidade de navegação para o seletor informado.
		 * @param seletor - o seletor que será usado para identificação da sequência dos elementos.
		 * @param isVertical - indicador para adicionar navegação vertical.
		 */
		adicionarNavegacao: function(seletor, isVertical){
			var elementos = $(seletor);
			if(!isVertical){
				for(index = 0; index < elementos.length;  index++){
					$(elementos[index]).attr("horizontal-index", index);
					$(elementos[index]).attr("vertical-index", this.verticalIndex);
				}
			this.verticalIndex++;
			}else{
				for(index = 0; index < elementos.length;  index++){
					$(elementos[index]).attr("horizontal-index", 0);
					$(elementos[index]).attr("vertical-index", this.verticalIndex);
					this.verticalIndex++;
				}
			}
			return this;
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
						indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						indiceHorizontal = parseInt(this.selecionado.attr("horizontal-index"));
						elementoAnterior = $("*[horizontal-index='" + (indiceHorizontal - 1) + "'][vertical-index='" + indiceVertical + "']");
						if(elementoAnterior.length){
							this.selecionar(elementoAnterior);
						}
					}else{
						this.selecionar(primeiroElemento);
					}
				break;
				case 38:
					if(this.selecionado){
						indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						indiceHorizontal = parseInt(this.selecionado.attr("horizontal-index"));
						elementoSuperior = $("*[vertical-index='" + (indiceVertical - 1) + "'][horizontal-index='0']");
						if(elementoSuperior.length){
							this.selecionar(elementoSuperior);
						}
					}else{
						this.selecionar(primeiroElemento);
					}
				break;
				case 39:
					if(this.selecionado){
						indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						indiceHorizontal = parseInt(this.selecionado.attr("horizontal-index"));
						proxElemento = $("*[horizontal-index='" + (indiceHorizontal + 1) + "'][vertical-index='" + indiceVertical + "']");
						if(proxElemento.length){
							this.selecionar(proxElemento);
						}
					}else{
						this.selecionar(primeiroElemento);
					}
				break;
				case 40:
					if(this.selecionado){
						indiceVertical = parseInt(this.selecionado.attr("vertical-index"));
						indiceHorizontal = parseInt(this.selecionado.attr("horizontal-index"));
						elementoInferior = $("*[vertical-index='" + (indiceVertical + 1) + "'][horizontal-index='0']");
						if(elementoInferior.length){
							this.selecionar(elementoInferior);
						}
					}else{
						this.selecionar(primeiroElemento);
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
		 * Função privada responsável por selecionar os elementos e
		 * lançar os eventos pertinentes.
		 * O evento perdeuSelecao é lançado quando um elemento perde a seleção.
		 * O evento ganhouSelecao é lançado quando um elemento ganha a seleção.
		 * @param elemento - elemento que será selecionado
		 */
		selecionar: function(elemento){
			if(this.selecionado){
				this.selecionado.trigger("perdeuSelecao");
			}
			elemento.trigger("ganhouSelecao");
			this.selecionado = elemento;
		} 
	};
	
	$(target).keydown(function(event){
		objeto.keyDown.call(objeto, event);
	});
	
	$(target).keyup(function(event){
		objeto.keyUp.call(objeto, event);
	});
	
	return objeto;
};