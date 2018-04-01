import HttpService from './HttpService';
import ConnectionFactory from './ConnectionFactory';
import NegociacaoDao from './../dao/NegociacaoDao';
import NegociacaoModel from './../models/NegociacaoModel';

// Serviço responsável por obter negociações
export default class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  cadastra(negociacao) {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociação adicionada com sucesso')
      .catch(erro => {
        console.log(erro); // Erro de baixo nível do DAO
        throw new Error('Não foi possível adicionar a negociação');
      });
  }

  lista() {
    return ConnectionFactory.getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())
      .catch(erro => {
        console.log(erro); // Erro de baixo nível do DAO
        throw new Error('Não foi possível obter as negociações');
      });
  }

  apaga() {
    return (
      ConnectionFactory.getConnection()
        .then(connection => new NegociacaoDao(connection))
        // Com a connection do IndexedDB, usar o DAO para apagar negociações
        .then(dao => dao.apagaTodos())
        .then(() => 'Negociações apagadas com sucesso')
        .catch(erro => {
          console.log(erro); // Erro de baixo nível do DAO
          throw new Error('Não foi possível apagar as negociações');
        })
    );
  }

  importa(listaAtual) {
    return this.obterNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(
          negociacao =>
            // Se não encontrar negociação nas negociações já existentes
            // me retorna true
            !listaAtual.some(negociacaoLista =>
              // Comparação deep entre objetos
              negociacaoLista.isEqual(negociacao),
            ),
        ),
      )
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível buscar negociações para importar');
      });
  }

  obterNegociacoes() {
    // Promises serão resolvidas fora de ordem
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada(),
    ])
      .then(negociacoes =>
        negociacoes.reduce((acc, curr) => acc.concat(curr), []),
      )
      .catch(erro => {
        throw new Error(erro);
      });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get('negociacoes/retrasada')
      .then(negociacoes =>
        negociacoes.map(
          negociacao =>
            new NegociacaoModel(
              new Date(negociacao.data),
              negociacao.quantidade,
              negociacao.valor,
            ),
        ),
      )
      .catch(() => {
        throw new Error(
          'Não foi possível obter as negociações da semana retrasada',
        );
      });
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then(negociacoes =>
        negociacoes.map(
          negociacao =>
            new NegociacaoModel(
              new Date(negociacao.data),
              negociacao.quantidade,
              negociacao.valor,
            ),
        ),
      )
      .catch(() => {
        throw new Error(
          'Não foi possível obter as negociações da semana anterior',
        );
      });
  }

  obterNegociacoesDaSemana() {
    return this._http
      .get('negociacoes/semana')
      .then(negociacoes =>
        negociacoes.map(
          negociacao =>
            new NegociacaoModel(
              new Date(negociacao.data),
              negociacao.quantidade,
              negociacao.valor,
            ),
        ),
      )
      .catch(() => {
        throw new Error('Não foi possível obter as negociações dessa semana');
      });
  }
}
