class ListaNegociacoes {
  constructor() {
    this._negociacoes = [];
  }

  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }

  // Definindo um getter
  get negociacoes() {
    // Entrega uma cópia no getter para não mudar a lista original
    // para que essa lista não seja passada por referência e não possa ser mudada
    return [...this._negociacoes];
  }
}
