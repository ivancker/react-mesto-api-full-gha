import {
  useState,
  useEffect,
} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  onClose,
  isOpen,
  onAddPlace,
}) {
  const [title, setTitle] =
    useState('');
  const [link, setLink] = useState('');

  function handleTitleInput(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkInput(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(title, link);
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
      children={
        <>
          <input
            onChange={handleTitleInput}
            id="form__input-title"
            type="text"
            name="name"
            className="popup__input popup__input_value_title"
            value={title}
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__span form__input-title-error"></span>

          <input
            onChange={handleLinkInput}
            id="form__input-link"
            type="url"
            name="link"
            value={link}
            className="popup__input popup__input_value_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__span form__input-link-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
