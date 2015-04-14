function VoltarHelper(){
	var funcoesVoltar = [];
	
	this.add = function(funcao){
		funcoesVoltar.push(funcao);
	};
	
	this.voltar = function(){
		var funcao = funcoesVoltar.pop();
		if(funcao){
			funcao();
		}
	};
}