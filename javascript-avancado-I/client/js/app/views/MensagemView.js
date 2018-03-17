class MensagemView extends View {
  // Se a classe pai da qual se herda (View) tiver parâmetros no constructor dele
  // é necessário passar para ele via super() esse parâmetro
  constructor(elemento) {
    super(elemento);
  }
  
  template(model) {
    return model.texto
      ? `<p class="alert alert-info">${model.texto}</p>`
      : '<p></p>';
  }
}
