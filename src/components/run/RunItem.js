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
      <time>{run.startDateTime}</time>
      <p>{run.duration}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default RunItem;
