class ProxyFactory {
    //criando um método estatico para não ter que ficar instanciando a classe
    //Recebe o objeto que eu quero criar o proxy (ListaNegociacoes)
    //Recebe as propriedades que eu quero observar (['adiciona', 'esvazia'])
    //Recebe a ação que eu quero executar (self._negociacoesView.update)
    static create(objeto, props, acao){

         return  new Proxy(objeto,{

                get(target,prop, receiver){
                   
                    if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){

                        return function(){

                            //Aqui é minha funcao e o REFLECT apply Substitui o Adiciona por ela.
                            console.log(`interceptando o método ${prop}`);

                            //Chamando o método dessa função
                            //target[prop] = minhas propriedade do meu objeto original Proxy(ListaNegociacoes)
                            //target = contexto - this ele mesmo
                            //arguments - array de argumentos que estou passando no método adiciona(new Negociacao(new Date(),1,100))
                            let retorno = Reflect.apply(target[prop],target,arguments);

                            //Só posso chamar a atualização da view depois do que aplicar o target(model Negociacao)
                            acao(target);

                            //Retornando o apply da função, que é quando troca os dados da acao passada
                            return retorno;
                        }
                    }
                    return Reflect.get(target, prop, receiver);
                },

                set(target,prop,value,receiver){
                    let retorno = Reflect.set(target,prop,value,receiver);
                    if(props.includes(prop)){
                        //executa o interceptador(this.mensagem.update(prop.value))
                         acao(target);
                    }
                    //Altera a propriedade
                  return retorno;
                }
        });
    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    }
}