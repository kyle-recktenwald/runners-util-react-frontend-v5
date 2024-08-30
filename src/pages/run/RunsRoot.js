import { Outlet } from "react-router-dom";

import RunNavigation from "../../components/run/RunNavigation";

function RunsRootLayout() {
  return (
    <>
      <RunNavigation />
      <Outlet />
    </>
  );
}

export default RunsRootLayout;
