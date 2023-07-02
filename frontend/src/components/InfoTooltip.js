import React from 'react';
import iconError from '../images/login-false.svg';
import iconSuccess from '../images/login-true.svg';

function InfoTooltip({
  isOpen,
  onClose,
  isSuccessful,
  onOverlayClick,
}) {
  const message = `${
    isSuccessful
      ? 'Вы успешно зарегистрировались!'
      : `Что-то пошло не так!
      Попробуйте ещё раз.`
  }`;

  const icon = `${
    isSuccessful
      ? iconSuccess
      : iconError
  }`;

  return (
    <section
      className={`popup ${
        isOpen ? 'popup_opened' : ''
      }`}
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          className="popup__icon"
          src={icon}
          alt={message}
        />
        <p className="popup__info">
          {message}
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;
