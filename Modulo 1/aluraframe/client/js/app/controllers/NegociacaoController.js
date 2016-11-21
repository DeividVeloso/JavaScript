class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        // this._listaNegociacoes = new ListaNegociacoes(function(model){
        //Essa função é chamada no adiciona e esvazia metodos da classe ListaNegociacao
        //Nesse escopo da função esse this que retorna é do método que executou a função,
        //ou seja é o this.armadilha(this) que no caso vem do contexto da ListaNegociacao
        //Por isso o erro Cannot read property 'update' of undefined(…)
        //Porque a ListaNegociacao não tem o a instancia do metodo update e sim a NegociacaoController
        //     this._negociacoesView.update(model);
        // });

        //Para revolver esse problema, vamos usar o this dinamico a nosso favor
        //Primeiro vamos passar  o this como parametro, esse this é o da minha classe NegociacaoController
        //Na ListaNegociacoes constructor vou receber esse this como contexto
        // this._listaNegociacoes = new ListaNegociacoes(function (this, model) {
        //     this._negociacoesView.update(model);
        // });

        //RESOLVENDO SEM O CONTEXTO E COM ARROW function
        //Arrow function não é só um modo de encurtar a forma de escrita 
        //Ela não tem scopo dinamico ela é lexico o escopo não muda
        //Por isso o this dessa função é do NegociacaoController e não de quem chama.
        this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($('#negociacoesView'))
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem.texto);
    };

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();

    };

    apaga() {
        this._listaNegociacoes.esvazia();
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociacao apagada com sucesso.'
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    //O método começa com o _ para indicar que é um método privado, pois não faz sentido ele ser chamado externamente,
    //Pois ele será usado dentro do método adiciona.
    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = "1";
        this._inputValor.value = 0.0;

        this._inputData.focus(); // Para dar o foco no campo
    }
};

// function trataData(data){

//         var dataAlt = [data.split('-')];
//         if(dataAlt[1] == 1){
//             dataAlt[1] = 0;
//         }else{
//             dataAlt[1] = dataAlt[1] - 1;
//         };
//             data = dataAlt;
//     return dataAlt;
// };

//Esta dando erro por que meu model recebe data 
        //e a controller esta passando string, não reconhece o método getTime()
        //console.log(typeof(this._inputData.value));
        // let negociacao = new Negociacao(
        //     this._inputData.value,
        //     this._inputQuantidade.value,
        //     this._inputValor.value
        // );

        //Para concerter uma data elegantemente, 
        //o Date funcina fazendo um join de elementos por virgula(2016,03,30)
        //Para fazer isso usar o split ou replace
        //console.log(new Date(this._inputData.value.split('-')));
        //dessa forma ele converte corretamente;
        //console.log(trataData(this._inputData.value));

       // let novaData = trataData(this._inputData.value);
        //console.log(new Date(novaData));
        //console.log(negociacao);

        //Para passar os parametros no construtor 
        //do método dinamicamento com ... cada ponto representa um parametro que será criado no split
        //  let data = new Date(...
        //         this._inputData.value
        //         .split('-')
        //         //percorre o array e devolve o item, e pega a posição (indice) que estou passando
        //         .map((item,indice) => item - indice % 2)
        //     );

    //let diaMesAno = negociacao.data.getDate() + "/" + (negociacao.data.getMonth() + 1) + "/" + negociacao.data.getFullYear();
    //console.log(diaMesAno);