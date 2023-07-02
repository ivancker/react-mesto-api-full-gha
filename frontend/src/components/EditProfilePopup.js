import {
  useState,
  useEffect,
  useContext,
} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
}) {
  const currentUser = useContext(
    CurrentUserContext
  );
  const [name, setName] = useState('');
  const [description, setDescription] =
    useState('');

  function handleNameChange({
    target,
  }) {
    setName(target.value);
  }

  function handleDescriptChange({
    target,
  }) {
    setDescription(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      children={
        <>
          <input
            value={name || ''}
            onChange={handleNameChange}
            id="form__input-name"
            type="text"
            name="name"
            className="popup__input popup__input_value_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__span form__input-name-error"></span>

          <input
            value={description}
            onChange={handleDescriptChange}
            id="form__input-description"
            type="text"
            name="about"
            className="popup__input popup__input_value_description"
            placeholder="Занятие"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__span form__input-description-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
