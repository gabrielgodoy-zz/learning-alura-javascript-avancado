import ProxyFactory from './../services/ProxyFactory';

// Padrão de projeto FACTORY METHOD
// Uma classe especializada para criar um determinado tipo de objeto
export default class Bind {
  constructor(model, view, ...props) {
    let proxy = ProxyFactory.create(model, props, model => view.update(model));
    view.update(model);

    // Ao invés de retornar uma instância de Bind quando alguém der new Bind(),
    // eu retorno o proxy que foi criado acima
    return proxy;
  }
}
