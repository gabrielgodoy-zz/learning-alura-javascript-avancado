"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, ListaNegociacoesModel;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
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

      ListaNegociacoesModel = function () {
        function ListaNegociacoesModel() {
          _classCallCheck(this, ListaNegociacoesModel);

          this._negociacoes = [];
        }

        // Definindo um getter


        _createClass(ListaNegociacoesModel, [{
          key: "_compara",
          value: function _compara(a, b, property, isReversed) {
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
        }, {
          key: "adiciona",
          value: function adiciona(negociacao) {
            this._negociacoes.push(negociacao);
          }
        }, {
          key: "esvazia",
          value: function esvazia() {
            this._negociacoes = [];
          }
        }, {
          key: "ordena",
          value: function ordena(coluna, ordemAtual) {
            var _this = this;

            var isReversed = coluna === ordemAtual;

            this._negociacoes = [].concat(_toConsumableArray(this._negociacoes.sort(function (a, b) {
              return _this._compara(a, b, coluna, isReversed);
            })));
          }
        }, {
          key: "negociacoes",
          get: function get() {
            // Entrega uma cópia no getter para não mudar a lista original
            // para que essa lista não seja passada por referência e não possa ser mudada
            return [].concat(_toConsumableArray(this._negociacoes));
          }
        }, {
          key: "volumeTotal",
          get: function get() {
            return this._negociacoes.reduce(function (total, n) {
              return total + n.volume;
            }, 0.0);
          }
        }]);

        return ListaNegociacoesModel;
      }();

      _export("default", ListaNegociacoesModel);
    }
  };
});
//# sourceMappingURL=ListaNegociacoesModel.js.map