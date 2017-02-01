class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

       this._negociacoesView = new NegociacoesView($('#negociacoesView'))
       this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), //Meu modelo
            this._negociacoesView, //Minha view
             ['adiciona','esvazia'] // Executa a associação quando? Quando  ['adiciona','esvazia'] forem chamados
       );

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
             new Mensagem(),
             this._mensagemView,
            ['texto']
        );

    };

    importaNegociacoes(){

      //Fazendo uma chamada Ajax assincrona
      let xhr = new XMLHttpRequest();

      //Abrindo  um endereço
      //Passar Verbo
      //Passar o EndPoint
      xhr.open('GET', 'negociacoes/semana');

    };

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociação adicionada com sucesso';

        this._limpaFormulario();

    };

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociacao apagada com sucesso.'
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
