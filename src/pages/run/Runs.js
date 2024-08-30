import { useLoaderData, json, defer, Await } from "react-router-dom";

import RunList from "../../components/run/RunList";
import { Suspense } from "react";

function RunsPage() {
  const { runs } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading</p>}>
      <Await resolve={runs}>
        {(loadedRuns) => <RunList runs={loadedRuns} />}
      </Await>
    </Suspense>
  );
}

export default RunsPage;

async function loadRuns() {
  const response = await fetch("http://localhost:8080/api/runs");

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

export function loader() {
  return defer({
    runs: loadRuns(),
  });
}
