import React from "react";

function DefaultFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <React.Fragment>
      <span>
        <span style={{ color: "#20a8d8" }}>Bitsensing</span> &copy;{" "}
        {currentYear} creativeLabs.
      </span>
    </React.Fragment>
  );
}

export default DefaultFooter;
