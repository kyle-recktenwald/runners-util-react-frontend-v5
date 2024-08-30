import { Link, useSubmit } from "react-router-dom";

import classes from "./RunItem.module.css";

function RunItem({ run }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.run}>
      <img src={run.image} alt={run.title} />
      <h1>{run.title}</h1>
      <time>{run.date}</time>
      <p>{run.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default RunItem;
