import { useLoaderData, json, defer, Await } from "react-router-dom";

import AuthService from "../../services/AuthService";

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
  try {
    await AuthService.updateToken(() => {
      console.log("Token updated successfully.");
    });
    const token = AuthService.getToken();
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch("http://backend-service:8080/api/runs", {
      headers,
    });

    if (!response.ok) {
      return {
        isError: true,
        message: "Could not fetch runs.",
      };
    }

    const resData = await response.json();
    console.log(resData);

    return resData || null;
  } catch (error) {
    console.error("Error fetching runs:", error);
    return null;
  }
}

export function loader() {
  return defer({
    runs: loadRuns(),
  });
}
