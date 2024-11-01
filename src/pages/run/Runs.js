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
  const runs = await fetchRuns();

  console.log(runs);

  return runs;
}

async function fetchRuns() {
  const backendDomain = "http://backend-service:8080";
  const proxyDomain = "https://runnersutil.local";

  const response = await fetch(proxyDomain + "/api/runs", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Error fetching runs:", response.statusText);
  }

  return response.json();
}

export function loader() {
  return defer({
    runs: loadRuns(),
  });
}
