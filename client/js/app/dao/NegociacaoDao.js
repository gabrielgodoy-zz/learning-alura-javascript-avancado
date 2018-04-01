'use strict';

System.register(['./../models/NegociacaoModel'], function (_export, _context) {
  "use strict";

  var NegociacaoModel, _createClass, NegociacaoDao;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_modelsNegociacaoModel) {
      NegociacaoModel = _modelsNegociacaoModel.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      NegociacaoDao = function () {
        function NegociacaoDao(connection) {
          _classCallCheck(this, NegociacaoDao);

          this._connection = connection;
          this._store = 'negociacoes';
        }

        _createClass(NegociacaoDao, [{
          key: 'adiciona',
          value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {
              // Uma transação permite gravação e/ou leitura em uma ObjectStore
              var request = _this._connection.transaction([_this._store], 'readwrite') // Uma transação permite gravação e/ou leitura em uma ObjectStore
              .objectStore(_this._store) // Com a transação eu obtenho acesso a ObjectStore
              .add(negociacao); // Escrever uma negociação no banco

              request.onsuccess = function (e) {
                resolve(); // Em caso de sucesso na escrita
              };

              request.onerror = function (e) {
                console.log('e', e.target.error);
                reject('Não foi possível adicionar a negociação');
              };
            });
          }
        }, {
          key: 'listaTodos',
          value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              var cursor = _this2._connection.transaction([_this2._store], 'readwrite') // Uma transação permite gravação e/ou leitura em uma ObjectStore
              .objectStore(_this2._store) // Com a transação eu obtenho acesso a uma ObjectStore
              .openCursor(); // O cursor é o objeto que consegue ler uma objectStore

              var negociacoes = [];

              // É chamado toda vez que se cria um cursor
              // Essa funçào vai percorrer todas as negociações armazenadas no IndexedDB
              cursor.onsuccess = function (event) {
                // Ponteiro para uma negociacao no banco
                var itemFound = event.target.result;

                // Se o ponteiro achar uma negociacao gravada
                if (itemFound) {
                  // Valor do dado (negociação)
                  var dado = itemFound.value;

                  // Antes de incluir a negociação, criar uma instância da classe
                  negociacoes.push(new NegociacaoModel(dado._data, dado._quantidade, dado._valor));

                  // Continua a busca por novos registros na ObjectStore
                  itemFound.continue();
                } else {
                  // Exibe todas as negociações que foram encontradas no banco
                  resolve(negociacoes);
                }
              };

              cursor.onerror = function (event) {
                console.log(event.target.error.name);
                reject('Não foi possível listar as negociações');
              };
            });
          }
        }, {
          key: 'apagaTodos',
          value: function apagaTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
              var request = _this3._connection.transaction([_this3._store], 'readwrite') // Uma transação permite gravação e/ou leitura em uma ObjectStore
              .objectStore(_this3._store) // Com a transação eu obtenho acesso a uma ObjectStore
              .clear(); // Limpa a objectStore

              request.onsuccess = function (e) {
                return resolve('Negociações apagadas com sucesso');
              };
              request.onerror = function (e) {
                console.log('e', e.target.error);
                reject('Não foi possível apagar as negociações');
              };
            });
          }
        }]);

        return NegociacaoDao;
      }();

      _export('default', NegociacaoDao);
    }
  };
});
//# sourceMappingURL=NegociacaoDao.js.map