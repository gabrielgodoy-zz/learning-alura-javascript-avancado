"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, NegociacaoModel;

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

      NegociacaoModel = function () {
        // Definindo atributos de uma classe no Constructor

        function NegociacaoModel(data, quantidade, valor) {
          _classCallCheck(this, NegociacaoModel);

          // Cada nova instância gerada com new vão possuir
          // essas propriedades listadas no constructor:

          /**
            Nova propriedade data é criada,
            a partir do objeto "data" que o desenvolvedor
            passou ao criar um nova instância
            Se cria uma nova data para não ter o objeto data
            que foi usado na criação da instância,
            como referência da propriedade data da instância criada.
            Isso tudo para evitar que um desenvolvedor altere essa propriedade data,
            depois da instância ter sido criada
          */
          this._data = new Date(data.getTime());
          this._quantidade = quantidade;
          this._valor = valor;
          this._volume = quantidade * valor;

          // Underline (_) é convenção para propriedades privadas da classe

          // Para não alterar as propriedades da instância
          // depois de criadas, se congela as propriedades do objeto
          Object.freeze(this);
          // O freeze é shallow, só consegue congelar tipos primitivos,
          // Propriedades que são objetos aninhados ainda podem ter suas
          // propriedades alteradas, mesmo com freeze
        }

        _createClass(NegociacaoModel, [{
          key: "isEqual",
          value: function isEqual(outraNegociacao) {
            return JSON.stringify(this) == JSON.stringify(outraNegociacao);
          }
        }, {
          key: "volume",
          get: function get() {
            return this._quantidade * this._valor;
          }
        }, {
          key: "data",
          get: function get() {
            // Não entrega o objeto data, cria um novo objeto, para evitar
            // alteração posterior da data das instâncias
            return new Date(this._data.getTime());
          }
        }, {
          key: "quantidade",
          get: function get() {
            return this._quantidade;
          }
        }, {
          key: "valor",
          get: function get() {
            return this._valor;
          }
        }]);

        return NegociacaoModel;
      }();

      _export("default", NegociacaoModel);
    }
  };
});
//# sourceMappingURL=NegociacaoModel.js.map