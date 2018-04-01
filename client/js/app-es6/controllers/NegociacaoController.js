import NegociacaoService from './../services/NegociacaoService';
import Bind from './../helpers/Bind';
import DateHelper from './../helpers/DateHelper';

import ListaNegociacoesModel from './../models/ListaNegociacoesModel';
import MensagemModel from './../models/MensagemModel';
import NegociacaoModel from './../models/NegociacaoModel';

import MensagemView from './../views/MensagemView';
import NegociacoesView from './../views/NegociacoesView';

class NegociacaoController {
  // A boa prática é definir no constructor somente as propriedades
  // que as novas instâncias da classe vão ter
  constructor() {
    // O this de querySelector precisa ser o document, por isso o bind
    const $ = document.querySelector.bind(document);

    // Na criação de uma instância, já se guarda os seletores no DOM (como um cache)
    // Percorrer o DOM é custoso em termos de performance,
    // então dessa forma se acessa somente uma vez
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._ordemAtual = '';

    this._service = new NegociacaoService();

    // MODELS
    this._listaNegociacoes = new Bind(
      new ListaNegociacoesModel(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona',
      'esvazia',
      'ordena',
    );

    this._mensagem = new Bind(
      new MensagemModel(),
      new MensagemView($('#mensagemView')),
      'texto',
    );

    this._init();
  }

  _init() {
    this._service
      .lista()
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
          this._listaNegociacoes.adiciona(negociacao),
        ),
      )
      .catch(erro => (this._mensagem.texto = erro));

    setInterval(() => this.importaNegociacoes(), 3000);
  }

  _criaNegociacao() {
    return new NegociacaoModel(
      DateHelper.textoParaData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value),
    );
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();
    this._service
      .cadastra(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })
      .catch(erro => (this._mensagem.texto = erro));
  }

  apaga() {
    this._service
      .apaga()
      .then(mensagem => {
        this._mensagem.texto = mensagem;
        this._listaNegociacoes.esvazia();
      })
      .catch(erro => (this._mensagem.texto = erro));
  }

  importaNegociacoes() {
    this._service
      .importa(this._listaNegociacoes.negociacoes)
      .then(negociacoes => {
        negociacoes.forEach(negociacao =>
          this._listaNegociacoes.adiciona(negociacao),
        );
        this._mensagem.texto = 'Negociações obtidas com sucesso';
      })
      .catch(erro => (this._mensagem.texto = erro));
  }

  ordena(coluna) {
    this._listaNegociacoes.ordena(coluna, this._ordemAtual);
    this._mensagem.texto = 'Negociações ordenadas com sucesso';
    this._ordemAtual = this._ordemAtual === coluna ? '' : coluna;
  }
}

// Todos os outros módulos vão importar a mesma instância
let negociacaoController = new NegociacaoController();

export function currentInstance() {
  return negociacaoController;
}
