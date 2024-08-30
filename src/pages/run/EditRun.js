import { useRouteLoaderData } from "react-router-dom";

import RunForm from "../../components/run/RunForm";

function EditRunPage() {
  const data = useRouteLoaderData("run-detail");

  return <RunForm method="patch" run={data.run} />;
}

export default EditRunPage;
