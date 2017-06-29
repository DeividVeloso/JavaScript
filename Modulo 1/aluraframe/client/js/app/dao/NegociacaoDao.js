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
}