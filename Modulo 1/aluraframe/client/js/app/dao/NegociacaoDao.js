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
            //Pega a conexão com o IndexDB e pede permissão de escrita e leitura nessa tabela
            let transaction = this_connection.transaction(['negociacoes'], 'readwrite');
            //Pega tabela(StoreObject) negociacoes
            let store = transaction.objectStore('negociacoes');
            //Abre o cursor na store 
            let cursor = store.openCursor();

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
                reject(e);
            }
        });
    }
}