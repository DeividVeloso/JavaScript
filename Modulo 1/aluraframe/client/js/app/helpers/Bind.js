"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind =
//model,view,acao(métodos)
function Bind(model, view, props) {
    _classCallCheck(this, Bind);

    //criando o proxy
    //passando o model, porps(Métodos(adiciona,esvazia)), Acao Executa o Update com a model
    //Quando mudar minha model ele executa o update
    var proxy = ProxyFactory.create(model, props, function (model) {
        return view.update(model);
    });
    view.update(model); //Criei minha proxy acima, já posso chamar para renderizar a primeira vez a view

    //ES6 um construtor pode ter return
    //estou retornando meu FactoryProxy
    return proxy;
};
//# sourceMappingURL=Bind.js.map