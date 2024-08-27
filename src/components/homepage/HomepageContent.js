import classes from "./HomepageContent.module.css";

function HomepageContent({}) {
  return (
    <div className={classes.content}>
      <h1>Welcome to Runner's Utils</h1>
      <p>Record your workout data and manage your running routes with ease.</p>
      <a href="./runs/runs.html">
        <button class="start-button">Get Started</button>
      </a>
    </div>
  );
}

export default HomepageContent;
