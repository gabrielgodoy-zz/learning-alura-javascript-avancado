'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, stores, version, dbName, connection, close, ConnectionFactory;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
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

      stores = ['negociacoes'];
      version = 4;
      dbName = 'aluraframe';
      connection = null;
      close = null;

      ConnectionFactory = function () {
        function ConnectionFactory() {
          _classCallCheck(this, ConnectionFactory);

          // Não permite que sejam criadas instâncias dessa classe
          throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }

        // Com static, o método só pode ser chamado diretamente da classe
        // e não de uma instância


        _createClass(ConnectionFactory, null, [{
          key: '_createStores',
          value: function _createStores(connection) {
            stores.forEach(function (store) {
              // Apaga a objectStore caso já exista
              if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
              }

              // Cria a ObjectStore
              connection.createObjectStore(store, { autoIncrement: true });
            });
          }
        }, {
          key: 'getConnection',
          value: function getConnection() {
            return new Promise(function (resolve, reject) {
              // Faz uma requisição para abertura de banco
              var openRequest = window.indexedDB.open(dbName, version);

              // Mediante requisição para abertura de banco
              // 3 eventos podem ocorrer
              openRequest.onupgradeneeded = function (event) {
                ConnectionFactory._createStores(event.target.result);
              };

              openRequest.onsuccess = function (event) {
                // Se a conexão ainda não existe, é feita pela primeira vez
                if (!connection) {
                  connection = event.target.result;

                  // Salva o método close antes do monkey patching
                  close = connection.close.bind(connection);

                  // Monkey patching do método close da connection
                  // substituindo por uma nova função
                  connection.close = function () {
                    throw new Error('Você não pode fechar diretamente a conexão!');
                  };
                }

                // Retorna a conexão com resolve() em caso de sucesso
                resolve(connection);
              };

              openRequest.onerror = function (event) {
                reject(event.target.error.name);
              };
            });
          }
        }, {
          key: 'closeConnection',
          value: function closeConnection() {
            if (connection) {
              // Método original sem Monkey patching
              close();

              // Mata a conexão, para quando for chamar
              // getConnection novamente, criar uma nova
              connection = null;
            }
          }
        }]);

        return ConnectionFactory;
      }();

      _export('default', ConnectionFactory);
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map