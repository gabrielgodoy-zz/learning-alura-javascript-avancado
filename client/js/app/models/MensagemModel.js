'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, MensagemModel;

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

      MensagemModel = function () {
        function MensagemModel() {
          var texto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

          _classCallCheck(this, MensagemModel);

          this._texto = texto;
        }

        _createClass(MensagemModel, [{
          key: 'texto',
          get: function get() {
            return this._texto;
          },
          set: function set(texto) {
            this._texto = texto;
          }
        }]);

        return MensagemModel;
      }();

      _export('default', MensagemModel);
    }
  };
});
//# sourceMappingURL=MensagemModel.js.map