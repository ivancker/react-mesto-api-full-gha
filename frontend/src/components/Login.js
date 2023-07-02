import React, { useState } from 'react';

function Login({
  handleLogin,
  buttonText,
}) {
  const [
    userDataValue,
    setUserDataValue,
  ] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setUserDataValue({
      ...userDataValue,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    if (
      !userDataValue.email ||
      !userDataValue.password
    ) {
      return;
    }
    handleLogin(
      userDataValue.email,
      userDataValue.password
    );
  }

  return (
    <section className="enter">
      <form
        className="enter-form"
        onSubmit={handleSubmit}
      >
        <h2 className="enter-form__title">
          Вход
        </h2>
        <input
          className="enter-form__item"
          name="email"
          type="email"
          placeholder="Email"
          value={
            userDataValue.email || ''
          }
          onChange={handleChange}
          required
        />
        <input
          className="enter-form__item"
          name="password"
          type="password"
          placeholder="Пароль"
          value={
            userDataValue.password || ''
          }
          onChange={handleChange}
          required
        />
        <button
          className="enter-form__button form__submit"
          aria-label="Зайти в аккаунт"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default Login;
