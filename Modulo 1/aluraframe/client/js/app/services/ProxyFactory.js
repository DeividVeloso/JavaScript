"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProxyFactory = function () {
    function ProxyFactory() {
        _classCallCheck(this, ProxyFactory);
    }

    _createClass(ProxyFactory, null, [{
        key: "create",

        //criando um método estatico para não ter que ficar instanciando a classe
        //Recebe o objeto que eu quero criar o proxy (ListaNegociacoes)
        //Recebe as propriedades que eu quero observar (['adiciona', 'esvazia'])
        //Recebe a ação que eu quero executar (self._negociacoesView.update)
        value: function create(objeto, props, acao) {

            return new Proxy(objeto, {
                get: function get(target, prop, receiver) {

                    if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {

                        return function () {

                            //Aqui é minha funcao e o REFLECT apply Substitui o Adiciona por ela.
                            console.log("interceptando o m\xE9todo " + prop);

                            //Chamando o método dessa função
                            //target[prop] = minhas propriedade do meu objeto original Proxy(ListaNegociacoes)
                            //target = contexto - this ele mesmo
                            //arguments - array de argumentos que estou passando no método adiciona(new Negociacao(new Date(),1,100))
                            var retorno = Reflect.apply(target[prop], target, arguments);

                            //Só posso chamar a atualização da view depois do que aplicar o target(model Negociacao)
                            acao(target);

                            //Retornando o apply da função, que é quando troca os dados da acao passada
                            return retorno;
                        };
                    }
                    return Reflect.get(target, prop, receiver);
                },
                set: function set(target, prop, value, receiver) {
                    var retorno = Reflect.set(target, prop, value, receiver);
                    if (props.includes(prop)) {
                        //executa o interceptador(this.mensagem.update(prop.value))
                        acao(target);
                    }
                    //Altera a propriedade
                    return retorno;
                }
            });
        }
    }, {
        key: "_ehFuncao",
        value: function _ehFuncao(func) {
            return (typeof func === "undefined" ? "undefined" : _typeof(func)) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
        }
    }]);

    return ProxyFactory;
}();