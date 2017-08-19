class ListaNegociacoes {

    //Estou recebendo meu this da classe NegociacaoController como um contexto
    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        //Reflect.apply(this._armadilha, this._contexto, [this]);
    }

     // novo método
    get volumeTotal() {
       return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

     // novo método!
    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }

      // novo método!
    inverteOrdem(criterio) {
        this._negociacoes.reverse();        
    }
}


