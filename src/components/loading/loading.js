import React from "react";

import { Spinner } from "reactstrap";

function Loading() {
  return (
    <div className="spinner-page">
      <Spinner color="primary" />
    </div>
  );
}

export default Loading;
