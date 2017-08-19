"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {
  var dbName = "aluraframe";
  var dbVersion = 1;
  var stores = ["negociacoes"];

  var connection = null;
  var close = null;
  return function () {
    //para evitar que o programador tente instanciar esssa classe, pois ela é static
    function ConnectionFactory() {
      _classCallCheck(this, ConnectionFactory);

      throw new Error("Não é possível criar instâncias de ConnectionFactory");
    }

    _createClass(ConnectionFactory, null, [{
      key: "getConnection",
      value: function getConnection() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          //Cria o banco de dados
          var openRequest = window.indexedDB.open(dbName, dbVersion);

          openRequest.onupgradeneeded = function (e) {
            _this._createObjectStore(e.target.result);
          };

          openRequest.onsuccess = function (e) {
            if (!connection) {
              connection = e.target.result;
              close = connection.close.bind(connection);
              connection.close = function () {
                throw new Error('Você não pode fechar diretamente a conexão');
              };
            }
            resolve(connection);
          };

          openRequest.onerror = function (e) {
            reject(e.target.error.name);
          };
        });
      }
    }, {
      key: "_createObjectStore",
      value: function _createObjectStore(connection) {
        //Verifica se já existe as stores que estou passando no array STORES para criar no banco
        //Caso exista então apagar as existentes, senão criar as novas stores
        stores.forEach(function (store) {
          if (connection.objectStoreNames.contains(store)) {
            connection.deleteObjectStore(store);
          } else {
            connection.createObjectStore(store, { autoIncrement: true });
          }
        });
      }

      //Método para fechar a conexão

    }, {
      key: "closeConnection",
      value: function closeConnection() {
        if (connection) {
          close();
          connection = null;
        }
      }
    }]);

    return ConnectionFactory;
  }();
}();
//# sourceMappingURL=ConnectionFactory.js.map