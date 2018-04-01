export default class View {
  constructor(elemento) {
    this._elemento = elemento;
  }

  // Vai ser chamado caso alguem crie um view filha
  // e esqueça de declarar o método _template
  template() {
    throw new Error('O método template deve ser implementado.');
  }

  update(model) {
    this._elemento.innerHTML = this.template(model);
  }
}
