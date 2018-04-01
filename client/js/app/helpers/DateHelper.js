'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, DateHelper;

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

      DateHelper = function () {
        function DateHelper() {
          _classCallCheck(this, DateHelper);

          // Se alguém tentar dar "new" nessa classe, informamos que ela não pode ser instanciada
          throw new Error('Essa classe não pode ser instanciada');
        }

        // Static são método invocados direto na classe, e não em instâncias


        _createClass(DateHelper, null, [{
          key: 'dataParaTexto',
          value: function dataParaTexto(data) {
            // getDate() retorna o dia de uma data
            // getMonth() retorna o mês de uma data com index === 0
            return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
          }
        }, {
          key: 'textoParaData',
          value: function textoParaData(texto) {
            console.log('texto', texto);
            console.log('test', /\d{4}-\d{2}-\d{2}/.test(texto));

            if (!/\d{4}-\d{2}-\d{2}/.test(texto)) {
              throw new Error('Deve estar no formato dd/mm/aaaa');
            }

            /**
              Date pode receber um array com ano, mês e dia 
              new Date(["2016", "11", "01"])
               Ou pode ser assim:
              new Date(2016, 11, 12)
              Mas nesse caso acima o mês começa em zero (0)
              Então pra novembro tem que ser 10 ao invés de 11, e janeiro é 0
            */
            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(texto.split('-').map(function (datePiece, index) {
              return datePiece - index % 2;
            })))))();
            // A expressão "datePiece - index % 2"
            // corrige com -1 só no index do mês que é 1 (1 % 2 === 1)
          }
        }]);

        return DateHelper;
      }();

      _export('default', DateHelper);
    }
  };
});
//# sourceMappingURL=DateHelper.js.map