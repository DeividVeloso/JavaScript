class NegociacaoService{

  obterNegociacoesDaSemana(cb){
  //Fazendo uma chamada Ajax assincrona
  let xhr = new XMLHttpRequest();

  //Abrindo  um endereço
  //Passar Verbo
  //Passar o EndPoint
  //Só não estou passando URL http://servidor.com porque o servico e o site estão no mesmo servidor
  xhr.open('GET', 'negociacoes/semana');

  xhr.onreadystatechange = () => {
        //Se o estado for igual a 4 - a requisição foi concluida e tem uma resposta
        //Porém eu não posso confiar só nesse estado, pois as vezes o servidor respondeu erro e mesmo assim é uma requisição válida
        if (xhr.readyState == 4) {
            //Só posso confiar se o status for 200 Http - OK
            if(xhr.status == 200){
                //adicionando a lista de negociacoes no callback
                //error, ListaNegociacoes
                cb(null, JSON.parse(xhr.responseText)
                .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
            }else{
                console.log(xhr.responseText);
                cb('Não foi possivel negociacoes, callback',null);
            }
        }
      };
      xhr.send();
  }
}
