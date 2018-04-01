import { currentInstance } from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

const negociacaoController = new currentInstance();

// bind() é para associar o this
document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(
  negociacaoController,
);
document.querySelector('.apagar').onclick = negociacaoController.apaga.bind(
  negociacaoController,
);
