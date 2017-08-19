class NegociacaoService{

    constructor(){
        //Como a classe NegociacaoService agora depende de HttpService
        //é uma boa declarar essa dependência no construtor da classe
        this._http = new HttpService();
    }

    obterNegociacoes(){
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });
    }

  obterNegociacoesDaSemana(){
       
          return  this._http.get('negociacoes/semana')
            .then(negociacoes => {
                //Vem uma lista do tipo object, estou transformando para o tipo new Negociacao
                //Como vai me retornar uma nova lista, tenho que passar para o resolver para ser consumido no NegociacaoController
                return (negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                    //Logar mensagem de baixo nivel
                    console.log(erro);
                    throw new Error('Não foi possível obter as negociações da semana')
                    })
            };
       

    obterNegociacoesDaSemanaAnterior(){
         
           return this._http.get('negociacoes/anterior')
            .then(negociacoes => {
                return (negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                 console.log(erro);
                 throw new Error('Não foi possível obter as negociações da semana')
                    })
            };
    
    obterNegociacoesDaSemanaRetrasada(){
           
          return  this._http.get('negociacoes/retrasada')
            .then(negociacoes => {
                return(negociacoes
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
            })
            .catch(erro => {
                 console.log(erro);
                 throw new Error('Não foi possível obter as negociações da semana')
                    })
            
    };
}
