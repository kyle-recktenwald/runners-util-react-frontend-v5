import { Link } from "react-router-dom";
import { useKeycloak } from "../../state/KeycloakContext"; // Import the useKeycloak hook

import classes from "./HomepageContent.module.css";

function HomepageContent() {
  const { isAuthenticated } = useKeycloak(); // Get the authentication state from context

  const backendDomain = "http://backend-service:8080";
  const proxyDomain = "https://runnersutil.local";

  const handleLoginSignup = () => {
    window.location.href = proxyDomain + "/api/auth/public/oauth/login";
  };

  return (
    <div className={classes.content}>
      <h1>Welcome to Runner Utils</h1>
      <p>Record your workout data and manage your running routes with ease.</p>
      {!isAuthenticated && ( // Show button only if not authenticated
        <button className={classes.homeButton} onClick={handleLoginSignup}>
          Login or Signup
        </button>
      )}
      {isAuthenticated && ( // Show "Get Started" button only if authenticated
        <Link to="/runs">
          <button className={classes.homeButton}>Get Started</button>
        </Link>
      )}
    </div>
  );
}

export default HomepageContent;
