var selecionado;

Navegacao = function(primeiroElemento, funcaoVoltar){
	
	this.verticalIndex = 0;
	
	this.adicionarNavegacao = function(seletor, isVertical){
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
	};	
	
	this.navegar = function(event){
		switch(event.keyCode){
			case 37: 
				if(selecionado){
					indiceVertical = parseInt(selecionado.attr("vertical-index"));
					indiceHorizontal = parseInt(selecionado.attr("horizontal-index"));
					elementoAnterior = $("*[horizontal-index='" + (indiceHorizontal - 1) + "'][vertical-index='" + indiceVertical + "']");
					if(elementoAnterior.length){
						selecionar(elementoAnterior);
					}
				}else{
					selecionar(primeiroElemento);
				}
			break;
			case 38:
				if(selecionado){
					indiceVertical = parseInt(selecionado.attr("vertical-index"));
					indiceHorizontal = parseInt(selecionado.attr("horizontal-index"));
					elementoSuperior = $("*[vertical-index='" + (indiceVertical - 1) + "'][horizontal-index='0']");
					if(elementoSuperior.length){
						selecionar(elementoSuperior);
					}
				}else{
					selecionar(primeiroElemento);
				}
			break;
			case 39:
				if(selecionado){
					indiceVertical = parseInt(selecionado.attr("vertical-index"));
					indiceHorizontal = parseInt(selecionado.attr("horizontal-index"));
					proxElemento = $("*[horizontal-index='" + (indiceHorizontal + 1) + "'][vertical-index='" + indiceVertical + "']");
					if(proxElemento.length){
						selecionar(proxElemento);
					}
				}else{
					selecionar(primeiroElemento);
				}
			break;
			case 40:
				if(selecionado){
					indiceVertical = parseInt(selecionado.attr("vertical-index"));
					indiceHorizontal = parseInt(selecionado.attr("horizontal-index"));
					elementoInferior = $("*[vertical-index='" + (indiceVertical + 1) + "'][horizontal-index='0']");
					if(elementoInferior.length){
						selecionar(elementoInferior);
					}
				}else{
					selecionar(primeiroElemento);
				}
			break;
			case 13:
				if(selecionado){
					selecionado.click();
				}
			break;
			case 8:
				if(funcaoVoltar){
					funcaoVoltar();
				}
			break;
		}
	};
}

function selecionar(elemento){
	if(selecionado){
		selecionado.trigger("perdeuSelecao");
	}
	elemento.trigger("ganhouSelecao");
	selecionado = elemento;
}