import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({
  card,
  onCardClickHandler,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { owner, likes } = card;
  const isOwn = owner.id === currentUser._id;
  // const isLiked = likes.some((like) => like._id === currentUser._id);
  const isLiked = likes.some(id => id === currentUser._id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked &&
    'element__button-like_active'
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClickHandler(card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          type="button"
          className="element__button-delete"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__discription">
        <h2 className="element__title">
          {card.name}
        </h2>
        <div className="element__like-container">
          <button
            type="button"
            className={
              cardLikeButtonClassName
            }
            onClick={handleLikeClick}
          />
          <p className="element__like-number">
            {card.likes.length}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Card;
