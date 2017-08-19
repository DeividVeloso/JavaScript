"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
  function NegociacaoController() {
    _classCallCheck(this, NegociacaoController);

    var $ = document.querySelector.bind(document);
    this._inputData = $("#data");
    this._inputQuantidade = $("#quantidade");
    this._inputValor = $("#valor");
    this._ordemAtual = "";

    this._negociacoesView = new NegociacoesView($("#negociacoesView"));
    this._listaNegociacoes = new Bind(new ListaNegociacoes(), //Meu modelo
    this._negociacoesView, //Minha view
    ["adiciona", "esvazia", "ordena", "inverteOrdem"] // Executa a associação quando? Quando  ['adiciona','esvazia'] forem chamados
    );

    this._mensagemView = new MensagemView($("#mensagemView"));
    this._mensagem = new Bind(new Mensagem(), this._mensagemView, ["texto"]);

    this._init();
  }

  _createClass(NegociacaoController, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      //Primeiro preciso da minha conexão com o Banco IndexDB
      ConnectionFactory.getConnection().then(function (connection) {
        return new NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      }).then(function (negociacoes) {
        return negociacoes.forEach(function (negociacao) {
          return _this._listaNegociacoes.adiciona(negociacao);
        });
      }).catch(function (erro) {
        console.log(erro);
        _this._mensagem.texto = erro;
      });

      //Adicionado no Constructor NegociacaoController()
      //Para ficar vendo se tem novas negociacoes de 3 em 3 segundos
      setInterval(function () {
        _this.importaNegociacoes();
      }, 3000);
    }
  }, {
    key: "ordena",
    value: function ordena(coluna) {
      if (this._ordemAtual == coluna) {
        // inverte a ordem da lista!
        this._listaNegociacoes.inverteOrdem();
      } else {
        this._listaNegociacoes.ordena(function (a, b) {
          return a[coluna] - b[coluna];
        });
      }
      this._ordemAtual = coluna;
    }
  }, {
    key: "importaNegociacoes",
    value: function importaNegociacoes() {
      var _this2 = this;

      var serviceNegociacao = new NegociacaoService();
      serviceNegociacao.obterNegociacoes().then(function (negociacoes) {
        return negociacoes.filter(function (negociacao) {
          return !_this2._listaNegociacoes.negociacoes.some(function (negociacoesView) {
            return JSON.stringify(negociacao) == JSON.stringify(negociacoesView);
          });
        });
      }).then(function (negociacoes) {
        negociacoes.forEach(function (itemResultadoArray) {
          return _this2._listaNegociacoes.adiciona(itemResultadoArray);
        });
        _this2._mensagem.texto = "Negociações obtidas com sucesso!";
      }).catch(function (error) {
        return _this2._mensagem.texto = error;
      });
    }
  }, {
    key: "adiciona",
    value: function adiciona(event) {
      var _this3 = this;

      event.preventDefault();

      ConnectionFactory.getConnection().then(function (connection) {
        new NegociacaoDao(connection).adiciona(_this3._criaNegociacao()).then(function () {
          _this3._listaNegociacoes.adiciona(_this3._criaNegociacao());
          _this3._mensagem.texto = "Negociação adicionada com sucesso";
          _this3._limpaFormulario();
        });
      }).catch(function (erro) {
        return _this3._mensagem.texto = erro;
      });
    }
  }, {
    key: "apaga",
    value: function apaga() {
      var _this4 = this;

      try {
        ConnectionFactory.getConnection().then(function (connection) {
          return new NegociacaoDao(connection);
        }).then(function (dao) {
          return dao.apagaTodos();
        }).then(function (result) {
          _this4._mensagem.texto = result;
          _this4._listaNegociacoes.esvazia();
        }).catch(function (error) {
          console.log(error);
          _this4._mensagem.texto = error;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: "_criaNegociacao",
    value: function _criaNegociacao() {
      return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
    }

    //O método começa com o _ para indicar que é um método privado, pois não faz sentido ele ser chamado externamente,
    //Pois ele será usado dentro do método adiciona.

  }, {
    key: "_limpaFormulario",
    value: function _limpaFormulario() {
      this._inputData.value = "";
      this._inputQuantidade.value = "1";
      this._inputValor.value = 0.0;

      this._inputData.focus(); // Para dar o foco no campo
    }
  }]);

  return NegociacaoController;
}();