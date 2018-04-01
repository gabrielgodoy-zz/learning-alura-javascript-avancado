import View from './View';
import DateHelper from './../helpers/DateHelper';
import { currentInstance } from './../controllers/NegociacaoController.js';

export default class NegociacoesView extends View {
  // Se a classe pai da qual se herda (View) tiver parâmetros no constructor dele
  // é necessário passar para ele via super() esse parâmetro
  constructor(elemento) {
    super(elemento);

    elemento.addEventListener('click', function(event) {
      if (event.target.nodeName == 'TH') {
        const theadLabel = event.target.textContent.toLowerCase();
        currentInstance().ordena(theadLabel);
      }
    });
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
            <th>VOLUME</th>
          </tr>
        </thead>
        <tbody>
          ${model.negociacoes
            .map(
              negociacao => `
                <tr>
                  <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
                  <td>${negociacao.quantidade}</td>
                  <td>${negociacao.valor}</td>
                  <td>${negociacao.volume}</td>
                </tr>`,
            )
            .join('')}
        </tbody>

        <tfoot>
            <td colspan="3"></td>
            <td>${model.volumeTotal}</td>
        </tfoot>
      </table>
    `;
  }
}
