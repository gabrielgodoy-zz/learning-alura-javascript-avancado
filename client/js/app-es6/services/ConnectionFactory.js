const stores = ['negociacoes'];
const version = 4;
const dbName = 'aluraframe';

let connection = null;
let close = null;

// Classe especializada na conexão com o IndexedDB
// Module Pattern
// Envolvo um pedaço de código em uma IIFE, trato ele como um módulo,
// e exponho somente o que eu quero
export default class ConnectionFactory {
  constructor() {
    // Não permite que sejam criadas instâncias dessa classe
    throw new Error('Não é possível criar instâncias de ConnectionFactory');
  }

  // Com static, o método só pode ser chamado diretamente da classe
  // e não de uma instância
  static _createStores(connection) {
    stores.forEach(store => {
      // Apaga a objectStore caso já exista
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }

      // Cria a ObjectStore
      connection.createObjectStore(store, { autoIncrement: true });
    });
  }

  static getConnection() {
    return new Promise((resolve, reject) => {
      // Faz uma requisição para abertura de banco
      const openRequest = window.indexedDB.open(dbName, version);

      // Mediante requisição para abertura de banco
      // 3 eventos podem ocorrer
      openRequest.onupgradeneeded = event => {
        ConnectionFactory._createStores(event.target.result);
      };

      openRequest.onsuccess = event => {
        // Se a conexão ainda não existe, é feita pela primeira vez
        if (!connection) {
          connection = event.target.result;

          // Salva o método close antes do monkey patching
          close = connection.close.bind(connection);

          // Monkey patching do método close da connection
          // substituindo por uma nova função
          connection.close = function() {
            throw new Error('Você não pode fechar diretamente a conexão!');
          };
        }

        // Retorna a conexão com resolve() em caso de sucesso
        resolve(connection);
      };

      openRequest.onerror = event => {
        reject(event.target.error.name);
      };
    });
  }

  static closeConnection() {
    if (connection) {
      // Método original sem Monkey patching
      close();

      // Mata a conexão, para quando for chamar
      // getConnection novamente, criar uma nova
      connection = null;
    }
  }
}
