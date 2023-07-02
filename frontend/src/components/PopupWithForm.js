function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onOverlay,
  onSubmit,
  buttonText,
  children,
}) {
  return (
    <div
      className={`popup popup-${name} ${
        isOpen ? 'popup_opened' : ''
      }`}
      onClick={onOverlay}
    >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__close-button popup-${name}__close-button`}
          onClick={onClose}
        ></button>

        <h2 className="popup__title">
          {title}
        </h2>

        <form
          className={`form popup__form popup__form-${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}

          <button
            type="submit"
            className="popup__save-button form__submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
