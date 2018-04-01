'use strict';

System.register(['./HttpService', './ConnectionFactory', './../dao/NegociacaoDao', './../models/NegociacaoModel'], function (_export, _context) {
  "use strict";

  var HttpService, ConnectionFactory, NegociacaoDao, NegociacaoModel, _createClass, NegociacaoService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_HttpService) {
      HttpService = _HttpService.default;
    }, function (_ConnectionFactory) {
      ConnectionFactory = _ConnectionFactory.default;
    }, function (_daoNegociacaoDao) {
      NegociacaoDao = _daoNegociacaoDao.default;
    }, function (_modelsNegociacaoModel) {
      NegociacaoModel = _modelsNegociacaoModel.default;
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

      NegociacaoService = function () {
        function NegociacaoService() {
          _classCallCheck(this, NegociacaoService);

          this._http = new HttpService();
        }

        _createClass(NegociacaoService, [{
          key: 'cadastra',
          value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.adiciona(negociacao);
            }).then(function () {
              return 'Negociação adicionada com sucesso';
            }).catch(function (erro) {
              console.log(erro); // Erro de baixo nível do DAO
              throw new Error('Não foi possível adicionar a negociação');
            });
          }
        }, {
          key: 'lista',
          value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            }).then(function (dao) {
              return dao.listaTodos();
            }).catch(function (erro) {
              console.log(erro); // Erro de baixo nível do DAO
              throw new Error('Não foi possível obter as negociações');
            });
          }
        }, {
          key: 'apaga',
          value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
              return new NegociacaoDao(connection);
            })
            // Com a connection do IndexedDB, usar o DAO para apagar negociações
            .then(function (dao) {
              return dao.apagaTodos();
            }).then(function () {
              return 'Negociações apagadas com sucesso';
            }).catch(function (erro) {
              console.log(erro); // Erro de baixo nível do DAO
              throw new Error('Não foi possível apagar as negociações');
            });
          }
        }, {
          key: 'importa',
          value: function importa(listaAtual) {
            return this.obterNegociacoes().then(function (negociacoes) {
              return negociacoes.filter(function (negociacao) {
                return (
                  // Se não encontrar negociação nas negociações já existentes
                  // me retorna true
                  !listaAtual.some(function (negociacaoLista) {
                    return (
                      // Comparação deep entre objetos
                      negociacaoLista.isEqual(negociacao)
                    );
                  })
                );
              });
            }).catch(function (erro) {
              console.log(erro);
              throw new Error('Não foi possível buscar negociações para importar');
            });
          }
        }, {
          key: 'obterNegociacoes',
          value: function obterNegociacoes() {
            // Promises serão resolvidas fora de ordem
            return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
              return negociacoes.reduce(function (acc, curr) {
                return acc.concat(curr);
              }, []);
            }).catch(function (erro) {
              throw new Error(erro);
            });
          }
        }, {
          key: 'obterNegociacoesDaSemanaRetrasada',
          value: function obterNegociacoesDaSemanaRetrasada() {
            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
              return negociacoes.map(function (negociacao) {
                return new NegociacaoModel(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
              });
            }).catch(function () {
              throw new Error('Não foi possível obter as negociações da semana retrasada');
            });
          }
        }, {
          key: 'obterNegociacoesDaSemanaAnterior',
          value: function obterNegociacoesDaSemanaAnterior() {
            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
              return negociacoes.map(function (negociacao) {
                return new NegociacaoModel(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
              });
            }).catch(function () {
              throw new Error('Não foi possível obter as negociações da semana anterior');
            });
          }
        }, {
          key: 'obterNegociacoesDaSemana',
          value: function obterNegociacoesDaSemana() {
            return this._http.get('negociacoes/semana').then(function (negociacoes) {
              return negociacoes.map(function (negociacao) {
                return new NegociacaoModel(new Date(negociacao.data), negociacao.quantidade, negociacao.valor);
              });
            }).catch(function () {
              throw new Error('Não foi possível obter as negociações dessa semana');
            });
          }
        }]);

        return NegociacaoService;
      }();

      _export('default', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map