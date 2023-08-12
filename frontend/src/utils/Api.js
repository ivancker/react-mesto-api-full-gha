class Api {
  constructor({ url }) {
    this._url = url;
  }

  _responseResult(response) {
    if (response.ok) {
      return response.json();
    } else {
      Promise.reject(
        `Ошибка: ${response.status} ${response.statusText}`
      );
    }
  }

  getUserData() {
    const token = localStorage.getItem('token');
    return fetch(
      `${this._url}users/me`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
      this._responseResult(response)
    );
  }

  getAllCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      this._responseResult(response)
    );
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(
      `${this._url}cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
      this._responseResult(response)
    );
  }

  addNewCard(name, link) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((response) =>
      this._responseResult(response)
    );
  }

  addNewProfilePick(avatar) {
    const token = localStorage.getItem('token');
    return fetch(
      `${this._url}users/me/avatar`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(avatar),
      }
    ).then((response) =>
      this._responseResult(response)
    );
  }

  addNewUserInfo(name, about) {
    const token = localStorage.getItem('token');
    return fetch(
      `${this._url}users/me`,
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }
    ).then((response) =>
      this._responseResult(response)
    );
  }

  addLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(
      `${this._url}cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
      this._responseResult(response)
    );
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(
      `${this._url}cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
      this._responseResult(response)
    );
  }

  changeLikeCard(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.deleteLike(cardId);
  }
}


const api = new Api({
  url: 'https://api.mestoo.nomoreparties.sbs/',
});

export { api };
