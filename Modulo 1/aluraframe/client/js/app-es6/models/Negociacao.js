class Negociacao {

	constructor(data, quantidade, valor) {

		this._data = new Date(data.getTime());
		this._quantidade = quantidade;
		this._valor = valor;
		Object.freeze(this);
	}

//Propriedades Get para retornar o valor e deixar as propiedades privadas para classe;
//getData() deixa a propriedade publica de leitura get(pegar, mostrar)
	get volume(){
		return this._quantidade * this._valor;
	};

	get data() {
		return new Date(this._data.getTime());
	};

	get quantidade(){
		return this._quantidade;		
	}

	get valor(){
		return this._valor;
	};



}