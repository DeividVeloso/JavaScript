class NegociacaoService{

    constructor(){
        //Como a classe NegociacaoService agora depende de HttpService
        //é uma boa declarar essa dependência no construtor da classe
        this._http = new HttpService();
    }


  obterNegociacoesDaSemana(){
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
            .then(negociacoes => {
                //Vem uma lista do tipo object, estou transformando para o tipo new Negociacao
                //Como vai me retornar uma nova lista, tenho que passar para o resolver para ser consumido no NegociacaoController
                resolve(negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                    //Logar mensagem de baixo nivel
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana')
                    })
            });
  }

      

    obterNegociacoesDaSemanaAnterior(){
          return new Promise((resolve, reject) => {
            this._http.get('negociacoes/anterior')
            .then(negociacoes => {
                resolve(negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                 console.log(erro);
                 reject('Não foi possível obter as negociações da semana')
                    })
            });
    }
    
    obterNegociacoesDaSemanaRetrasada(){
            return new Promise((resolve, reject) => {
            this._http.get('negociacoes/retrasada')
            .then(negociacoes => {
                resolve(negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                 console.log(erro);
                 reject('Não foi possível obter as negociações da semana')
                    })
            });
    }
}
