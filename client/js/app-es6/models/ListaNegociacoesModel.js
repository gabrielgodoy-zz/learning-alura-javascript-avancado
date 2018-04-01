export default class ListaNegociacoesModel {
  constructor() {
    this._negociacoes = [];
  }

  // Definindo um getter
  get negociacoes() {
    // Entrega uma cópia no getter para não mudar a lista original
    // para que essa lista não seja passada por referência e não possa ser mudada
    return [...this._negociacoes];
  }

  get volumeTotal() {
    return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
  }

  _compara(a, b, property, isReversed) {
    // se o valor retornado for positivo, b deve vir antes de a
    if (a[property] < b[property]) {
      return isReversed ? 1 : -1;
    }

    // se o valor retornado for negativo, a deve vir antes de b
    if (a[property] > b[property]) {
      return isReversed ? -1 : 1;
    }

    // se o valor retornado for 0 não há alteração
    // a ser feita entre duas comparações
    return 0;
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }

  esvazia() {
    this._negociacoes = [];
  }

  ordena(coluna, ordemAtual) {
    const isReversed = coluna === ordemAtual;

    this._negociacoes = [
      ...this._negociacoes.sort((a, b) =>
        this._compara(a, b, coluna, isReversed),
      ),
    ];
  }
}
