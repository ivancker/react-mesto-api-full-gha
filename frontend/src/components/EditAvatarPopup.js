import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      children={
        <>
          <input
            id="form__input-avatar-link"
            type="url"
            name="avatar"
            className="popup__input popup__input_value_link"
            ref={avatarRef}
            defaultValue=""
            placeholder="Ссылка на аватар"
            required
          />
          <span className="form__span form__input-avatar-link-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
