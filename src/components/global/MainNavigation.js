import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import AuthService from "../../services/AuthService";

import logoImage from "../../assets/running-shoe.png";
import profileImage from "../../assets/profile.png";

function MainNavigation() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogin = () => {
    AuthService.doLogin();
  };

  const handleLogout = () => {
    AuthService.doLogout();
    AuthService.doLogin();
  };

  const isLoggedIn = AuthService.isLoggedIn();
  const username = AuthService.getUsername();

  const toggleDropdown = (event) => {
    setDropdownActive((prevActive) => !prevActive);
    event.stopPropagation(); // Prevents closing the dropdown immediately after opening
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className={classes.mainHeader}>
      <nav className={classes.navContainer}>
        <Link to={`/`}>
          <div className={classes.homeIconContainer}>
            <img src={logoImage} alt="Home" className={classes.homeIcon} />
          </div>
        </Link>
        <ul className={classes.navList}>
          <li>
            <NavLink to="#">Track a New Run</NavLink>
          </li>
          <li>
            <NavLink to="#">View Runs</NavLink>
          </li>
          <li>
            <NavLink to="#">View Routes</NavLink>
          </li>
        </ul>
        <div className={classes.profileDropdown} ref={dropdownRef}>
          <div className={classes.menuTrigger} onClick={toggleDropdown}>
            <img src={profileImage} alt="Profile" />
          </div>
          <div
            className={`${classes.dropdownMenu} ${
              dropdownActive ? classes.active : ""
            }`}
          >
            <h3>{username || "Username"}</h3>
            <ul>
              {!isLoggedIn && (
                <li onClick={handleLogin}>
                  <NavLink to="#">Login</NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li onClick={handleLogout}>
                  <NavLink to="#">Logout</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
