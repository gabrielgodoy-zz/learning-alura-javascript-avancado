// Padrão de projeto PROXY
// Fornece um objeto substituto do objeto real, para controlar o acesso a esse objeto real
export default class ProxyFactory {
  // Instâncias dessa classe não herdam métodos static,
  // Esses métodos só podem ser chamados pela própria classe em si
  static create(objeto, props, acao) {
    return new Proxy(objeto, {
      /*
        Armadilha de LEITURA definida nesse handler do proxy

        Esse get vai ser sempre chamado quando uma propriedade for lida do objeto original,
        ou quando qualquer método for chamado dentro da classe

        Porque quando se chama um método de uma classe,
        o JS primeiro chama o get(), e depois dá um apply()
      */
      get(target, prop, receiver) {
        if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
          return function() {
            console.log(`Interceptada "${prop}"`);
            const retorno = Reflect.apply(target[prop], target, arguments);

            /*
              Padrão de projeto OBSERVER
              Quando o model muda de estado, a view também tem que mudar
              Função responsável por atualizar a view toda vez que o model muda
              Automatiza o processo de atualização da view toda vez que o modelo muda
            */
            acao(target);

            return retorno;
          };
        }

        return Reflect.get(target, prop, receiver);
      },

      /*
        Armadilha de ESCRITA definida nesse handler do proxy

        Esse set vai ser sempre chamado quando uma propriedade for sobreescrita no objeto original
      */
      set(target, prop, value, receiver) {
        const retorno = Reflect.set(target, prop, value, receiver);

        if (props.includes(prop)) {
          acao(target);
        }

        return retorno;
      },
    });
  }

  static _ehFuncao(funcao) {
    return typeof funcao == typeof Function;
  }
}
