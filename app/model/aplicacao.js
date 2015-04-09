function Aplicacao(){
	return {
		nome: "",
		
		local: "",
		
		imagem: "",
		
		indice: 0,
		
		getNome: function(){
			return this.nome;
		},
		
		setNome: function(nome){
			this.nome = nome;
		},
		
		getLocal: function(){
			return this.local;
		},
		
		setLocal: function(local){
			this.local = local;
		},
		
		getImagem: function(){
			return this.imagem;
		},
		
		setImagem: function(imagem){
			this.imagem = imagem;
		},
		
		getIndice: function(){
			return this.indice;
		},
		
		setIndice: function(indice){
			this.indice = indice;
		}
	};
}