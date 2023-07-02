function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup-picture ${
        card.isOpen
          ? 'popup_opened'
          : ''
      }`}
      onClick={onClose}
    >
      <div className="popup-picture__element">
        <button
          type="button"
          className="popup__close-button popup-picture__close-button"
          onClick={onClose}
        ></button>

        <img
          src={card.link}
          className="popup-picture__image"
          alt={card.name}
        />
        <h2 className="popup-picture__title">
          {card.name}
        </h2>
      </div>
    </div>
  );
}

export default ImagePopup;
