class NegociacaoController {
  constructor() {
    // O this de querySelector precisa ser o document, por isso o bind
    const $ = document.querySelector.bind(document);

    // Na criação de uma instância, já se guarda os seletores no DOM (como um cache)
    // Percorrer o DOM é custoso em termos de performance,
    // então dessa forma se acessa somente uma vez
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    // MODELS
    this._listaNegociacoes = new Bind(
      new ListaNegociacoesModel(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona',
      'esvazia',
    );

    this._mensagem = new Bind(
      new MensagemModel(),
      new MensagemView($('#mensagemView')),
      'texto',
    );
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }

  _criaNegociacao() {
    return new NegociacaoModel(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value,
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }
}
