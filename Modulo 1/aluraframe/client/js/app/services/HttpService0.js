"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: "get",
        value: function get(url) {
            return new Promise(function (resolve, reject) {
                //Fazendo uma chamada Ajax assincrona
                var xhr = new XMLHttpRequest();

                //Abrindo  um endereço
                //Passar Verbo
                //Passar o EndPoint
                //Só não estou passando URL http://servidor.com porque o servico e o site estão no mesmo servidor
                xhr.open('GET', url);

                xhr.onreadystatechange = function () {
                    //Se o estado for igual a 4 - a requisição foi concluida e tem uma resposta
                    //Porém eu não posso confiar só nesse estado, pois as vezes o servidor respondeu erro e mesmo assim é uma requisição válida
                    if (xhr.readyState == 4) {
                        //Só posso confiar se o status for 200 Http - OK
                        if (xhr.status == 200) {
                            //adicionando a lista de negociacoes no callback
                            //error, ListaNegociacoes
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };
                xhr.send();
            });
        }
    }, {
        key: "post",
        value: function post(url, dado) {
            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);

                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.onreadystatechange == 4) {
                        if (xhr.status == 200) {
                            resolve(JSON.pare(xhr.responseText));
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };
                console.log(dado);
                xhr.send(JSON.stringify(dado));
            });
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService0.js.map