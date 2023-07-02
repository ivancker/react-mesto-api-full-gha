import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import {
  useState,
  useEffect,
} from 'react';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute.js';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] =
    useState({});
  const [cards, setCards] = useState(
    []
  );
  const [
    isAvatarPopupOpened,
    setIsAvatarPopupOpened,
  ] = useState(false);
  const [
    isEditProfilePopupOpened,
    setIsEditProfilePopupOpened,
  ] = useState(false);
  const [
    isAddPlacePopupOpen,
    setAddPlacePopupOpen,
  ] = useState(false);
  const [
    selectedCard,
    setSelectedCard,
  ] = useState({
    link: '',
    name: '',
    isOpen: false,
  });
  const [
    isInfoTooltipPopupOpen,
    setInfoTooltipPopupOpen,
  ] = useState(false);
  const [
    isSuccessful,
    setIsSuccessful,
  ] = useState(false);
  const [loggedIn, setLoggedIn] =
    useState(false);
  const [email, setEmail] =
    useState('');

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((currentUser) => {
          setCurrentUser(currentUser);
        })
        .catch((error) =>
          console.log(
            `Ошибка: ${error}`
          )
        );
      api
        .getAllCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) =>
          console.log(
            `Ошибка: ${error}`
          )
        );
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt =
      localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );

    api
      .addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            c._id === card._id
              ? newCard
              : c
          )
        );
      })
      .catch((error) =>
        console.log(`Ошибка: ${error}`)
      );
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter(
            (thisCard) =>
              thisCard._id !== card._id
          )
        );
      })
      .catch((error) =>
        console.log(`Ошибка: ${error}`)
      );
  }

  function handleCardClick(data) {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      ...data,
    });
  }

  function handleInfoTooltip() {
    setInfoTooltipPopupOpen(true);
  }

  function handleAvatarClick() {
    setIsAvatarPopupOpened(true);
  }

  function handleProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({
      ...selectedCard,
      isOpen: false,
    });
    setInfoTooltipPopupOpen(false);
  }

  useEffect(() => {
    function closeFromEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener(
      'keydown',
      closeFromEscape
    );
    return () => {
      document.removeEventListener(
        'keydown',
        closeFromEscape
      );
    };
  });

  function handleUpdateUser({
    name,
    about,
  }) {
    api
      .addNewUserInfo(name, about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка: ${error}`)
      );
  }

  function handleUpdateAvatar(avatar) {
    api
      .addNewProfilePick(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка: ${error}`)
      );
  }

  function handleAddPlaceSubmit(
    name,
    link
  ) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) =>
        console.log(`Ошибка: ${error}`)
      );
  }

  // Функция для регистрации нового профиля
  function handleRegister(
    email,
    password
  ) {
    return auth
      .register(email, password)
      .then(() => {
        handleInfoTooltip();
        setIsSuccessful(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsSuccessful(false);
        console.log(err);
      });
  }

  // Функция для логина профиля
  function handleLogin(
    email,
    password
  ) {
    return auth
      .login(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem(
            'jwt',
            data.token
          );
          setLoggedIn(true);
          setEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        handleInfoTooltip();
        setIsSuccessful(false);
        console.log(err);
      });
  }

  // Функция для выхода из профиля
  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
    setLoggedIn(false);
    setEmail('');
  }

  return (
    <CurrentUserContext.Provider
      value={currentUser}
    >
      <div className="page">
        <Header
          email={email}
          loggedIn={loggedIn}
          onSignOut={signOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                handleRegister={
                  handleRegister
                }
                name="register"
                title="Регистрация"
                buttonText="Зарегистрироваться"
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={
                  handleLogin
                }
                name="login"
                title="Вход"
                buttonText="Войти"
              />
            }
          />
          <Route
            path="/"
            element={
              <>
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={
                    handleAvatarClick
                  }
                  onEditProfile={
                    handleProfileClick
                  }
                  onAddPlace={
                    handleAddPlaceClick
                  }
                  onCardClick={
                    handleCardClick
                  }
                  onCardLike={
                    handleCardLike
                  }
                  onCardDelete={
                    handleCardDelete
                  }
                  cards={cards}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/sign-in" />
              )
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={
            isEditProfilePopupOpened
          }
          onClose={closeAllPopups}
          onUpdateUser={
            handleUpdateUser
          }
        />

        <EditAvatarPopup
          isOpen={isAvatarPopupOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={
            handleUpdateAvatar
          }
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={
            handleAddPlaceSubmit
          }
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={
            isInfoTooltipPopupOpen
          }
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
