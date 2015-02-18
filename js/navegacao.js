var selecionado;

function navegar(event){
	console.log(event);
	switch(event.keyCode){
		case 37: 
			if(selecionado){
				arrayId = selecionado.id.split("-");
				tipo = arrayId[0];
				indice = parseInt(arrayId[1]);
				elementoAnterior = document.getElementById(tipo+"-"+(indice-1));
				if(elementoAnterior){
					selecionar(elementoAnterior);
				}
			}else{
				selecionar(document.getElementById("app-1"));
			}
		break;
		case 38:
			if(selecionado){
				if(selecionado.id.split("-")[0] == "app"){
					selecionar(document.getElementById("menu-1"));
				}
			}else{
				selecionar(document.getElementById("app-1"));
			}
		break;
		case 39:
			if(selecionado){
				arrayId = selecionado.id.split("-");
				tipo = arrayId[0];
				indice = parseInt(arrayId[1]);
				proxElemento = document.getElementById(tipo+"-"+(indice+1));
				if(proxElemento){
					selecionar(proxElemento);
				}
			}else{
				selecionar(document.getElementById("app-1"));
			}
		break;
		case 40:
			if(selecionado){
				if(selecionado.id.split("-")[0] == "menu"){
					selecionar(document.getElementById("app-1"));
				}
			}else{
				selecionar(document.getElementById("app-1"));
			}
		break;
		case 13:{
			if(selecionado){
				selecionado.click();
			}
		}
	}
}

//TODO MUDAR PARA JQUERY

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

function selecionar(elemento){
	if(selecionado){
		removeClass(selecionado, "selecionado");
	}
	addClass(elemento,"selecionado");
	selecionado = elemento;
}

document.addEventListener("keydown", navegar);