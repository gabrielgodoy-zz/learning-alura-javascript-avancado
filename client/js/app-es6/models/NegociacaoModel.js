export default class NegociacaoModel {
  // Definindo atributos de uma classe no Constructor

  constructor(data, quantidade, valor) {
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

  get volume() {
    return this._quantidade * this._valor;
  }

  get data() {
    // Não entrega o objeto data, cria um novo objeto, para evitar
    // alteração posterior da data das instâncias
    return new Date(this._data.getTime());
  }

  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }

  isEqual(outraNegociacao) {
    return JSON.stringify(this) == JSON.stringify(outraNegociacao);
  }
}
