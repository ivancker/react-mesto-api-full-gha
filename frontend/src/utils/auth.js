export const BASE_URL =
  'https://api.mestoo.nomoreparties.sbs';

const getResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        `Ошибка: ${res.status}`
      );
};

export const register = (
  email,
  password
) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type':
        'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(getResponse);
};

export const login = (
  email,
  password
) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type':
        'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then(getResponse)
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data
    }
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type':
        'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};
