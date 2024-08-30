import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditRunPage from "./pages/run/EditRun";
import ErrorPage from "./pages/global/Error";
import RunDetailPage, {
  loader as runDetailLoader,
  action as deleteRunAction,
} from "./pages/run/RunDetail";
import RunsPage, { loader as runsLoader } from "./pages/run/Runs";
import RunsRootLayout from "./pages/run/RunsRoot";
import HomePage from "./pages/homepage/HomePage";
import NewRunPage from "./pages/run/NewRun";
import RootLayout from "./pages/global/Root";
import { action as manipulateRunAction } from "./components/run/RunForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "runs",
        element: <RunsRootLayout />,
        children: [
          {
            index: true,
            element: <RunsPage />,
            loader: runsLoader,
          },
          {
            path: ":runId",
            id: "run-detail",
            loader: runDetailLoader,
            children: [
              {
                index: true,
                element: <RunDetailPage />,
                action: deleteRunAction,
              },
              {
                path: "edit",
                element: <EditRunPage />,
                action: manipulateRunAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewRunPage />,
            action: manipulateRunAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
