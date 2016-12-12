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
}


// class ListaNegociacoes {

//     //Estou recebendo meu this da classe NegociacaoController como um contexto
//     constructor(armadilha) {
//         this._negociacoes = [];
//         this._armadilha = armadilha;
//     }

//     adiciona(negociacao) {

//         this._negociacoes.push(negociacao);
//         //Depois que add na lista, executa a função dentrro da variavel armadilah que vem do NegociacaoController
//         //Executo passando o this como parametro que siginifica minha lista de negociação.
//         //this._armadilha(this);

//         //Para resolver o problema de contexto do this dinamico vou usar a classe Reflect.apply do java script
//         //Ela recebe primeiro o método qu eu quero chamar
//         //Segundo quem é o contexto que eu desejo executar essa função (qual é o this) 
//         //Qual é o parametro que essa função precisa receber? é a lista de negociações no caso é o [this]
//         //[this] Representa a minha model no new ListaNegociacoes(function (this, model) 
//         //Reflect.apply(this._armadilha, this._contexto, [this]);

//         this._armadilha(this);
//     }

//     get negociacoes() {
//         return [].concat(this._negociacoes);
//     }

//     esvazia() {
//         this._armadilha(this);
//         this._negociacoes = [];
//         //Reflect.apply(this._armadilha, this._contexto, [this]);
//     }
// }