class NegociacaoDao {
    
    constructor(connection){
        this._connection = connection;
        this._store = "negociacoes"
    }

    //Retonando uma promise
    adiciona(negociacao){
        return new Promise((resolve,reject) =>{
            let request = this._connection
                            .transaction(['negociacoes'],'readwrite')
                            .objectStore("negociacoes")
                            .add(negociacao);
            
            request.onsuccess = e => {
                console.log(`${this._store} Inserido com sucesso`);
                resolve(); // Retornando a Promise resolvida sem dados
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject(`Erro ao inserir ${this._store}`);
            }
        })
       
    }

    listaTodos() {
        return new Promise((resolve,reject) => {
            
            let cursor = this._connection
                        .transaction([this._store], 'readwrite') //Pega a conexão com o IndexDB e pede permissão de escrita e leitura nessa tabela
                        .objectStore(this._store) //Pega tabela(StoreObject) negociacoes
                        .openCursor();//Abre o cursor na store 

            let negociacoes = [];

            //percorre o cursor como se fosse um While
            cursor.onsuccess = e => {
                
                //Guarda a linha atual da tabela
                let atual = e.target.result;
                //Se ainda tiver dados para serem lidos adiciona no array negociacoes
                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }else{
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possível listar as negociações');
            }
        });
    }

    apagaTodos(){
        return new Promise((resolve, reject) => {
            //Me devolve uma requisição
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear(); //Apaga a minha obejectStore
            
            request.onsuccess = e => {
                resolve('Dados apagados com sucesso');
            }
            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível apagar os dados')
            }
        });
    }
    
}