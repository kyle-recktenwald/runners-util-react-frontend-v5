import { Link } from "react-router-dom";

import classes from "./HomepageContent.module.css";

function HomepageContent({}) {
  const handleLoginSignup = () => {
    window.location.href =
      "https://runnersutil.local/api/auth/public/oauth/login";
  };

  return (
    <div className={classes.content}>
      <h1>Welcome to Runner Utils</h1>
      <p>Record your workout data and manage your running routes with ease.</p>
      {true && (
        <button className={classes.homeButton} onClick={handleLoginSignup}>
          Login or Signup
        </button>
      )}
      {true && (
        <Link to="/runs">
          <button className={classes.homeButton}>Get Started</button>
        </Link>
      )}
    </div>
  );
}

export default HomepageContent;
