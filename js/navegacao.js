var selecionado;

Navegacao = function(primeiroElemento, seletores){
	
	for(i in seletores){
		$(seletores[i]).each(function(index){
			$(this).attr("horizontal-index", index);
			$(this).attr("vertical-index", i);
		});
	}
	
	
	//TODO montar a navegação para os elementos encontrados pelo seletor
	
	
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
		}
	}
}

function selecionar(elemento){
	if(selecionado){
		selecionado.trigger("perdeuSelecao");
	}
	elemento.trigger("ganhouSelecao");
	selecionado = elemento;
}