class HttpService {

    get(url){
        return new Promise((resolve,reject) => {
                //Fazendo uma chamada Ajax assincrona
                let xhr = new XMLHttpRequest();

                //Abrindo  um endereço
                //Passar Verbo
                //Passar o EndPoint
                //Só não estou passando URL http://servidor.com porque o servico e o site estão no mesmo servidor
                xhr.open('GET', url);

                xhr.onreadystatechange = () => {
                        //Se o estado for igual a 4 - a requisição foi concluida e tem uma resposta
                        //Porém eu não posso confiar só nesse estado, pois as vezes o servidor respondeu erro e mesmo assim é uma requisição válida
                        if (xhr.readyState == 4) {
                            //Só posso confiar se o status for 200 Http - OK
                            if(xhr.status == 200){
                                //adicionando a lista de negociacoes no callback
                                //error, ListaNegociacoes
                                resolve(JSON.parse(xhr.responseText));
                            }else{
                                reject(xhr.responseText);
                            }
                        }
                    };
                    xhr.send();
        });
    }

    post(url, dado){
        return new Promise((resolve, reject) => {

             let xhr = new XMLHttpRequest();
             xhr.open("POST", url, true);
             
             xhr.setRequestHeader("Content-type", "application/json");
             xhr.onreadystatechange = () => {
                 if(xhr.onreadystatechange == 4){
                    if(xhr.status == 200){
                        resolve(JSON.pare(xhr.responseText));
                    }else{
                        reject(xhr.responseText);
                    }
                 }
             };
             console.log(dado);
             xhr.send(JSON.stringify(dado));
        });
    }
}

