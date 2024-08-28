import { Link } from "react-router-dom";

import classes from "./HomepageContent.module.css";
import AuthService from "../../services/AuthService";

function HomepageContent({}) {
  const isLoggedIn = AuthService.isLoggedIn();

  const handleLoginSignup = () => {
    AuthService.doLogin();
  };

  return (
    <div className={classes.content}>
      <h1>Welcome to Runner Utils</h1>
      <p>Record your workout data and manage your running routes with ease.</p>
      {!isLoggedIn && (
        <button className={classes.homeButton} onClick={handleLoginSignup}>
          Login or Signup
        </button>
      )}
      {isLoggedIn && (
        <Link to="/runs">
          <button className={classes.homeButton}>Get Started</button>
        </Link>
      )}
    </div>
  );
}

export default HomepageContent;
