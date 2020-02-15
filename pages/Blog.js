import React from "react";
import { withRouter } from "next/router";
import DemoBlog from "../comps/DemoBlog";

function Blog({ router: { query } }) {
  const object = JSON.parse(query.object);

  return <DemoBlog post={object} demo={false} />;
}

export default withRouter(Blog);
