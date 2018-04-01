'use strict';

System.register(['./../services/NegociacaoService', './../helpers/Bind', './../helpers/DateHelper', './../models/ListaNegociacoesModel', './../models/MensagemModel', './../models/NegociacaoModel', './../views/MensagemView', './../views/NegociacoesView'], function (_export, _context) {
  "use strict";

  var NegociacaoService, Bind, DateHelper, ListaNegociacoesModel, MensagemModel, NegociacaoModel, MensagemView, NegociacoesView, _createClass, NegociacaoController, negociacaoController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function currentInstance() {
    return negociacaoController;
  }

  _export('currentInstance', currentInstance);

  return {
    setters: [function (_servicesNegociacaoService) {
      NegociacaoService = _servicesNegociacaoService.default;
    }, function (_helpersBind) {
      Bind = _helpersBind.default;
    }, function (_helpersDateHelper) {
      DateHelper = _helpersDateHelper.default;
    }, function (_modelsListaNegociacoesModel) {
      ListaNegociacoesModel = _modelsListaNegociacoesModel.default;
    }, function (_modelsMensagemModel) {
      MensagemModel = _modelsMensagemModel.default;
    }, function (_modelsNegociacaoModel) {
      NegociacaoModel = _modelsNegociacaoModel.default;
    }, function (_viewsMensagemView) {
      MensagemView = _viewsMensagemView.default;
    }, function (_viewsNegociacoesView) {
      NegociacoesView = _viewsNegociacoesView.default;
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

      NegociacaoController = function () {
        // A boa prática é definir no constructor somente as propriedades
        // que as novas instâncias da classe vão ter
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

          // O this de querySelector precisa ser o document, por isso o bind
          var $ = document.querySelector.bind(document);

          // Na criação de uma instância, já se guarda os seletores no DOM (como um cache)
          // Percorrer o DOM é custoso em termos de performance,
          // então dessa forma se acessa somente uma vez
          this._inputData = $('#data');
          this._inputQuantidade = $('#quantidade');
          this._inputValor = $('#valor');

          this._ordemAtual = '';

          this._service = new NegociacaoService();

          // MODELS
          this._listaNegociacoes = new Bind(new ListaNegociacoesModel(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena');

          this._mensagem = new Bind(new MensagemModel(), new MensagemView($('#mensagemView')), 'texto');

          this._init();
        }

        _createClass(NegociacaoController, [{
          key: '_init',
          value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacoes.adiciona(negociacao);
              });
            }).catch(function (erro) {
              return _this._mensagem.texto = erro;
            });

            setInterval(function () {
              return _this.importaNegociacoes();
            }, 3000);
          }
        }, {
          key: '_criaNegociacao',
          value: function _criaNegociacao() {
            return new NegociacaoModel(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
          }
        }, {
          key: '_limpaFormulario',
          value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
          }
        }, {
          key: 'adiciona',
          value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();
            this._service.cadastra(negociacao).then(function (mensagem) {
              _this2._listaNegociacoes.adiciona(negociacao);
              _this2._mensagem.texto = mensagem;
              _this2._limpaFormulario();
            }).catch(function (erro) {
              return _this2._mensagem.texto = erro;
            });
          }
        }, {
          key: 'apaga',
          value: function apaga() {
            var _this3 = this;

            this._service.apaga().then(function (mensagem) {
              _this3._mensagem.texto = mensagem;
              _this3._listaNegociacoes.esvazia();
            }).catch(function (erro) {
              return _this3._mensagem.texto = erro;
            });
          }
        }, {
          key: 'importaNegociacoes',
          value: function importaNegociacoes() {
            var _this4 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
              negociacoes.forEach(function (negociacao) {
                return _this4._listaNegociacoes.adiciona(negociacao);
              });
              _this4._mensagem.texto = 'Negociações obtidas com sucesso';
            }).catch(function (erro) {
              return _this4._mensagem.texto = erro;
            });
          }
        }, {
          key: 'ordena',
          value: function ordena(coluna) {
            this._listaNegociacoes.ordena(coluna, this._ordemAtual);
            this._mensagem.texto = 'Negociações ordenadas com sucesso';
            this._ordemAtual = this._ordemAtual === coluna ? '' : coluna;
          }
        }]);

        return NegociacaoController;
      }();

      negociacaoController = new NegociacaoController();
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map