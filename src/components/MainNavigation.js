import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";
import AuthService from "../services/AuthService";

function MainNavigation() {
  const handleLogin = () => {
    AuthService.doLogin();
  };

  const isLoggedIn = AuthService.isLoggedIn();
  const username = AuthService.getUsername();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {!isLoggedIn ? (
            <li>
              <button onClick={handleLogin} className={classes.loginButton}>
                Login
              </button>
            </li>
          ) : (
            <li className={classes.username}>{username}</li>
          )}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
