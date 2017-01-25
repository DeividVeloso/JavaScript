class Bind {
    //model,view,acao(métodos)
    constructor(model, view, props){
        //criando o proxy
        //passando o model, porps(Métodos(adiciona,esvazia)), Acao Executa o Update com a model
        //Quando mudar minha model ele executa o update
        let proxy = ProxyFactory.create(model, props, (model) => view.update(model));
        view.update(model); //Criei minha proxy acima, já posso chamar para renderizar a primeira vez a view

        //ES6 um construtor pode ter return
        //estou retornando meu FactoryProxy
        return proxy;
    }
}