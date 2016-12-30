class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
       
        //this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));

     //Forma de guardar o this da classe e usar dentro de métodos profundos
      let self = this;
       this._listaNegociacoes =  new Proxy(new ListaNegociacoes(),{
            
            get: function(target,prop, receiver){
                //Quando eu fizer uma chamada de algum método ou prop
                //verifica se está na lista de métodos que quero executar
                //se contém a props no array -- recurso novo ES6
                //&& é uma função?
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
                    //Vou retornar uma função, não pode ser anonima por que ele precisa ter o this dinamico
                    //Dessa forma eu consigo trocar minha função do modelo pela função do proxy onde vai ser executado minha armadilha

                    //Dessa forma quando chamo a função lista.adiciona eu vou substituir por essa abaixo
                    return function(){

                        //Aqui é minha funcao e o REFLECT apply Substitui o Adicion por ela.
                        console.log(`interceptando o método ${prop}`);

                        

                        //Chamando o método dessa função
                        //target[prop] = minhas propriedade do meu objeto original Proxy(ListaNegociacoes)
                        //target = contexto - this ele mesmo
                        //arguments - array de argumentos que estou passando no método adiciona(new Negociacao(new Date(),1,100))
                        Reflect.apply(target[prop],target,arguments);

                        //Só posso chamar a atualização da view depois do que aplicar o target(model Negociacao)
                        self._negociacoesView.update(target);
                        
                    }

                }

                return Reflect.get(target, prop, receiver);
                
            }
    });


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
