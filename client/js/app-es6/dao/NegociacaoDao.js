import NegociacaoModel from './../models/NegociacaoModel';

// Padrão de projeto DAO visa abstrair a complexidade de acessar e escrever em um banco.
export default class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      // Uma transação permite gravação e/ou leitura em uma ObjectStore
      let request = this._connection
        .transaction([this._store], 'readwrite') // Uma transação permite gravação e/ou leitura em uma ObjectStore
        .objectStore(this._store) // Com a transação eu obtenho acesso a ObjectStore
        .add(negociacao); // Escrever uma negociação no banco

      request.onsuccess = e => {
        resolve(); // Em caso de sucesso na escrita
      };

      request.onerror = e => {
        console.log('e', e.target.error);
        reject('Não foi possível adicionar a negociação');
      };
    });
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      let cursor = this._connection
        .transaction([this._store], 'readwrite') // Uma transação permite gravação e/ou leitura em uma ObjectStore
        .objectStore(this._store) // Com a transação eu obtenho acesso a uma ObjectStore
        .openCursor(); // O cursor é o objeto que consegue ler uma objectStore

      let negociacoes = [];

      // É chamado toda vez que se cria um cursor
      // Essa funçào vai percorrer todas as negociações armazenadas no IndexedDB
      cursor.onsuccess = event => {
        // Ponteiro para uma negociacao no banco
        const itemFound = event.target.result;

        // Se o ponteiro achar uma negociacao gravada
        if (itemFound) {
          // Valor do dado (negociação)
          const dado = itemFound.value;

          // Antes de incluir a negociação, criar uma instância da classe
          negociacoes.push(
            new NegociacaoModel(dado._data, dado._quantidade, dado._valor),
          );

          // Continua a busca por novos registros na ObjectStore
          itemFound.continue();
        } else {
          // Exibe todas as negociações que foram encontradas no banco
          resolve(negociacoes);
        }
      };

      cursor.onerror = event => {
        console.log(event.target.error.name);
        reject('Não foi possível listar as negociações');
      };
    });
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite') // Uma transação permite gravação e/ou leitura em uma ObjectStore
        .objectStore(this._store) // Com a transação eu obtenho acesso a uma ObjectStore
        .clear(); // Limpa a objectStore

      request.onsuccess = e => resolve('Negociações apagadas com sucesso');
      request.onerror = e => {
        console.log('e', e.target.error);
        reject('Não foi possível apagar as negociações');
      };
    });
  }
}
