// Implementação padrão de projeto FACTORY METHOD
// Uma classe especializada para criar determinado tipo de objeto
class Bind {
  constructor(model, view, ...props) {
    let proxy = ProxyFactory.create(model, props, model => {
      view.update(model);
    });
    view.update(model);

    // Ao invés de retornar uma instância de Bind quando alguém der new Bind(),
    // eu retorno o proxy que foi criado acima
    return proxy;
  }
}
