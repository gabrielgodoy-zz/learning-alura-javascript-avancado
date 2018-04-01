export default class HttpService {
  _handleErrors(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  get(url) {
    // A resposta do fetch vem como ReadableStream, por isso o uso do json()
    return fetch(url)
      .then(response => this._handleErrors(response))
      .then(response => response.json());

    // Uma das desvantagens de usar fetch
    // é não poder cancelar uma requisição no meio, como pode ser feito no ajax
  }

  post(url, dado) {
    return fetch(url, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(dado),
    })
      .then(response => this._handleErrors(response));
  }
}
