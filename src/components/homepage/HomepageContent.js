import { Link } from "react-router-dom";
import { useKeycloak } from "../../state/KeycloakContext";

import classes from "./HomepageContent.module.css";
import AuthService from "../../services/AuthService";

function HomepageContent({}) {
  const { isAuthenticated } = useKeycloak();

  const handleLoginSignup = () => {
    AuthService.doLogin();
  };

  return (
    <div className={classes.content}>
      <h1>Welcome to Runner Utils</h1>
      <p>Record your workout data and manage your running routes with ease.</p>
      {!isAuthenticated && (
        <button className={classes.homeButton} onClick={handleLoginSignup}>
          Login or Signup
        </button>
      )}
      {isAuthenticated && (
        <Link to="/runs">
          <button className={classes.homeButton}>Get Started</button>
        </Link>
      )}
    </div>
  );
}

export default HomepageContent;
