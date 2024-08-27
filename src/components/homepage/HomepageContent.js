import classes from "./HomepageContent.module.css";
import AuthService from "../../services/AuthService"; // Adjust the path accordingly

function HomepageContent({}) {
  const handleLoginSignup = () => {
    AuthService.doLogin(); // This will redirect the user to the Keycloak login screen
  };

  return (
    <div className={classes.content}>
      <h1>Welcome to Runner Utils</h1>
      <p>Record your workout data and manage your running routes with ease.</p>
      <button className={classes.startButton} onClick={handleLoginSignup}>
        Login or Signup
      </button>
    </div>
  );
}

export default HomepageContent;
