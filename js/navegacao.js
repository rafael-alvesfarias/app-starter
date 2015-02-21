var selecionado;

function navegar(event){
	console.log(event);
	switch(event.keyCode){
		case 37: 
			if(selecionado){
				arrayId = selecionado.attr("id").split("-");
				tipo = arrayId[0];
				indice = parseInt(arrayId[1]);
				elementoAnterior = $("#" + tipo + "-" + (indice-1));
				if(elementoAnterior.length){
					selecionar(elementoAnterior);
				}
			}else{
				selecionar($("#app-1"));
			}
		break;
		case 38:
			if(selecionado){
				if(selecionado.attr("id").split("-")[0] == "app"){
					selecionar($("#menu-1"));
				}
			}else{
				selecionar($("#app-1"));
			}
		break;
		case 39:
			if(selecionado){
				arrayId = selecionado.attr("id").split("-");
				tipo = arrayId[0];
				indice = parseInt(arrayId[1]);
				proxElemento = $("#" + tipo + "-" + (indice+1));
				if(proxElemento.length){
					selecionar(proxElemento);
				}
			}else{
				selecionar($("#app-1"));
			}
		break;
		case 40:
			if(selecionado){
				if(selecionado.attr("id").split("-")[0] == "menu"){
					selecionar($("#app-1"));
				}
			}else{
				selecionar($("#app-1"));
			}
		break;
		case 13:{
			if(selecionado){
				selecionado.click();
			}
		}
	}
}

function selecionar(elemento){
	if(selecionado){
		if(selecionado.attr("id").split("-")[0] == "menu"){
			selecionado.attr("class", selecionado.attr("class").replace("-selecionado",""));
		}else{
			selecionado.removeClass("selecionado");
			$("#titulo-app-"+selecionado.attr("id").split("-")[1]).css("visibility","hidden");
		}
	}
	if(elemento.attr("id").split("-")[0] == "menu"){
		elemento.attr("class", elemento.attr("class") + "-selecionado");
	}else{
		elemento.addClass("selecionado");
		$("#titulo-app-"+elemento.attr("id").split("-")[1]).css("visibility","visible");
		playSound();
	}
	selecionado = elemento;
}