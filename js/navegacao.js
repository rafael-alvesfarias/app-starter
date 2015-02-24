var selecionado;
var primeiroElemento = $("#app-1");

function navegar(event){
	
	if(event.keyCode == 13){
		if(selecionado){
			selecionado.click();
		}
		return;
	}
	
	if(!selecionado){
		selecionar(primeiroElemento);
	}
	
	switch(event.keyCode){
		case 37: 
			arrayId = selecionado.attr("id").split("-");
			tipo = arrayId[0];
			indice = parseInt(arrayId[1]);
			elementoAnterior = $("#" + tipo + "-" + (indice-1));
			if(elementoAnterior.length){
				selecionar(elementoAnterior);
			}
		break;
		case 38:
			if(selecionado.attr("id").split("-")[0] == "app"){
				selecionar($("#menu-1"));
			}
		break;
		case 39:
			arrayId = selecionado.attr("id").split("-");
			tipo = arrayId[0];
			indice = parseInt(arrayId[1]);
			proxElemento = $("#" + tipo + "-" + (indice+1));
			if(proxElemento.length){
				selecionar(proxElemento);
			}
		break;
		case 40:
			if(selecionado.attr("id").split("-")[0] == "menu"){
				selecionar($("#app-1"));
			}
		break;
	}
}

function selecionar(elemento){
	if(selecionado){
		$(selecionado).trigger("perdeuSelecao");
	}
	$(elemento).trigger("ganhouSelecao");
	selecionado = elemento;
}