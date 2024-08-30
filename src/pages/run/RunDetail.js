import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import RunItem from "../../components/run/RunItem";
import RunList from "../../components/run/RunList";

import { Suspense } from "react";

function RunDetailPage() {
  const { run, runs } = useRouteLoaderData("run-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={run}>
          {(loadedRun) => <RunItem run={loadedRun} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={runs}>
          {(loadedRuns) => <RunList runs={loadedRuns} />}
        </Await>
      </Suspense>
    </>
  );
}

export default RunDetailPage;

async function loadRun(id) {
  const response = await fetch("http://localhost:8080/runs/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected run." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.run;
  }
}

async function loadRuns() {
  const response = await fetch("http://localhost:8080/runs");

  if (!response.ok) {
    //return { isError: true, message: "Could not fetch runs." };
    /* throw new Response(JSON.stringify({ message: "Could not fetch runs." }), {
      status: 500,
    }); */
    return json(
      { message: "Could not fetch runs." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.runs;
  }
}

export async function loader({ request, params }) {
  const id = params.runId;

  return defer({
    run: await loadRun(id),
    runs: loadRuns(),
  });
}

export async function action({ params, request }) {
  const runId = params.runId;

  const response = await fetch("http://localhost:8080/runs/" + runId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete run." },
      {
        status: 500,
      }
    );
  }
  return redirect("/runs");
}
