'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, HttpService;

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

      HttpService = function () {
        function HttpService() {
          _classCallCheck(this, HttpService);
        }

        _createClass(HttpService, [{
          key: '_handleErrors',
          value: function _handleErrors(response) {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response;
          }
        }, {
          key: 'get',
          value: function get(url) {
            var _this = this;

            // A resposta do fetch vem como ReadableStream, por isso o uso do json()
            return fetch(url).then(function (response) {
              return _this._handleErrors(response);
            }).then(function (response) {
              return response.json();
            });

            // Uma das desvantagens de usar fetch
            // é não poder cancelar uma requisição no meio, como pode ser feito no ajax
          }
        }, {
          key: 'post',
          value: function post(url, dado) {
            var _this2 = this;

            return fetch(url, {
              headers: {
                'Content-type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(dado)
            }).then(function (response) {
              return _this2._handleErrors(response);
            });
          }
        }]);

        return HttpService;
      }();

      _export('default', HttpService);
    }
  };
});
//# sourceMappingURL=HttpService.js.map