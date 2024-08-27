import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthService from "../../services/AuthService";

import logoImage from "../../assets/running-shoe.png";
import profileImage from "../../assets/profile.png";

function MainNavigation() {
  const handleLogin = () => {
    AuthService.doLogin();
  };

  const isLoggedIn = AuthService.isLoggedIn();
  const username = AuthService.getUsername();

  return (
    <header className={classes.mainHeader}>
      <nav className={classes.navContainer}>
        <a href="#">
          <div className={classes.homeIconContainer}>
            <img src={logoImage} alt="Home" class={classes.homeIcon} />
          </div>
        </a>
        <ul className={classes.navList}>
          <li>
            <a href="#">Track a New Run</a>
          </li>
          <li>
            <a href="#">View Runs</a>
          </li>
          <li>
            <a href="#">View Routes</a>
          </li>
        </ul>
        <div className={classes.profileDropdown}>
          <div className={classes.menuTrigger}>
            <img src={profileImage} alt="Profile" />
          </div>
          <div className={classes.dropdownMenu}>
            <h3>Username</h3>
            <ul>
              <li>
                <a href="#">View Profile</a>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
              <li>
                <a href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
