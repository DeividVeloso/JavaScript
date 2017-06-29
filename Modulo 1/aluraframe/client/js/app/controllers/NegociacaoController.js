class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

       this._negociacoesView = new NegociacoesView($('#negociacoesView'))
       this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), //Meu modelo
            this._negociacoesView, //Minha view
             ['adiciona','esvazia','ordena','inverteOrdem'] // Executa a associação quando? Quando  ['adiciona','esvazia'] forem chamados
       );

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = new Bind(
             new Mensagem(),
             this._mensagemView,
            ['texto']
        );

    };

    ordena(coluna){
       if(this._ordemAtual == coluna) {
            // inverte a ordem da lista!
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    importaNegociacoes(){

        let serviceNegociacao = new NegociacaoService();
        serviceNegociacao
         .obterNegociacoes()
         .then(negociacoes => { 
           negociacoes
                .forEach(itemResultadoArray => this._listaNegociacoes.adiciona(itemResultadoArray));
            this._mensagem.texto = "Negociações obtidas com sucesso!"
        })
        .catch(error => this._mensagem.texto = error);
    };

    adiciona(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                new NegociacaoDao(connection)
                .adiciona(this._criaNegociacao())
                .then(() =>{
                    this._listaNegociacoes.adiciona(this._criaNegociacao());
                    this._mensagem.texto = 'Negociação adicionada com sucesso';
                    this._limpaFormulario();
                })
            })
            .catch(erro => this._mensagem.texto = erro)
    };

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociacao apagada com sucesso.'
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
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
