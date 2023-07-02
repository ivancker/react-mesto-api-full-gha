import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({
  handleRegister,
  buttonText,
}) {
  const [
    userDataValue,
    setUserDataValue,
  ] = useState({
    email: '',
    password: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setUserDataValue({
      ...userDataValue,
      [name]: value,
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(
      userDataValue.email,
      userDataValue.password
    );
  };

  return (
    <section className="enter">
      <form
        className="enter-form"
        onSubmit={handleSubmit}
      >
        <h2 className="enter-form__title">
          Регистрация
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
          aria-label="Зарегистрироваться"
          type="submit"
        >
          {buttonText}
        </button>
        <span className="enter-form__message">
          Уже зарегистрированы?
          <Link
            to="/sign-in"
            className="enter-form__link"
          >
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
}

export default Register;
