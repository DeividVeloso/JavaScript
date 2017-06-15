var dbName = "aluraframe";
var dbVersion = 4;
var stores = ["negociacoes"];
class ConnectionFactory {
  //para evitar que o programador tente instanciar esssa classe, pois ela é static
  constructor() {
    throw new Error("Não é possível criar instâncias de ConnectionFactory");
  }

  static getConnection() {
    return new Promise((resolve, reject) => {
      //Cria o banco de dados
      let openRequest = window.indexedDB.open(dbName, dbVersion);

      openRequest.onupgradeneeded = e => {
        this._createObjectStore(e.target.result);
      };

      openRequest.onsuccess = e => {
          resolve(e.target.result)
      };

      openRequest.onerror = e => {
          reject(e.target.error.name)
      };
    });
  }

  static _createObjectStore(connection) {
    //Verifica se já existe as stores que estou passando no array STORES para criar no banco
    //Caso exista então apagar as existentes, senão criar as novas stores
    stores.forEach(store => {
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      } else {
        connection.createObjectStore(store, { autoIncrement: true });
      }
    });
  }
}
