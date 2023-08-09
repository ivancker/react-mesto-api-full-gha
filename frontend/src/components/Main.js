import Card from './Card';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
})
 {
  const { about, name, avatar } =
    useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={avatar}
              alt="Аватар"
            />
            <div
              className="profile__avatar-edit"
              onClick={onEditAvatar}
            ></div>
          </div>
          <div className="profile__info">
            <div className="profile__name-button">
              <h1 className="profile__name">
                {name}
              </h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">
              {about}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClickHandler={
              onCardClick
            }
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
