import logo from '../images/logo-white.svg';
import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

function Header({ email, onSignOut }) {
  
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Лого - Место"
      />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link
              className="header__enter"
              to="/sign-up"
            >
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link
              className="header__enter"
              to="/sign-in"
            >
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className="header__exit">
                <p className="header__email">
                  {email}
                </p>
                <button
                  type="button"
                  className="header__exit-button"
                  onClick={onSignOut}
                >
                  Выйти
                </button>
              </div>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
