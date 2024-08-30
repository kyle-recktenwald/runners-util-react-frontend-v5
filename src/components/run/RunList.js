import { Link } from "react-router-dom";
import classes from "./RunList.module.css";

function RunList({ runs }) {
  // Check if runs is null or an empty array and handle it appropriately
  if (!runs || runs.length === 0) {
    return <p className={classes.noRuns}>No runs available.</p>;
  }

  return (
    <div className={classes.runs}>
      <h1>All Runs</h1>
      <ul className={classes.list}>
        {runs.map((run) => (
          <li key={run.id} className={classes.item}>
            <Link to={`/runs/${run.id}`}>
              <div className={classes.content}>
                <time>{run.startDateTime}</time>
                <h2>{run.duration}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RunList;
