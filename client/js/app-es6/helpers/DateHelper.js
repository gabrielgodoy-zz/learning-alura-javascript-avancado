export default class DateHelper {
  constructor() {
    // Se alguém tentar dar "new" nessa classe, informamos que ela não pode ser instanciada
    throw new Error('Essa classe não pode ser instanciada');
  }

  // Static são método invocados direto na classe, e não em instâncias
  static dataParaTexto(data) {
    // getDate() retorna o dia de uma data
    // getMonth() retorna o mês de uma data com index === 0
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  static textoParaData(texto) {
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
    return new Date(
      ...texto.split('-').map((datePiece, index) => datePiece - index % 2),
    );
    // A expressão "datePiece - index % 2"
    // corrige com -1 só no index do mês que é 1 (1 % 2 === 1)
  }
}
