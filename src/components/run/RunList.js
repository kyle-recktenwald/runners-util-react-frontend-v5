//import { useLoaderData } from "react-router-dom";

import { Link } from "react-router-dom";

import classes from "./RunList.module.css";

function RunList({ runs }) {
  //const runs = useLoaderData();

  return (
    <div className={classes.runs}>
      <h1>All Runs</h1>
      <ul className={classes.list}>
        {runs.map((run) => (
          <li key={run.id} className={classes.item}>
            <Link to={`/runs/${run.id}`}>
              <img src={run.image} alt={run.title} />
              <div className={classes.content}>
                <h2>{run.title}</h2>
                <time>{run.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RunList;
