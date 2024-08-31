import { NavLink } from "react-router-dom";

import classes from "./RunNavigation.module.css";

function RunNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/runs/new"
              classes={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Run
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default RunNavigation;
