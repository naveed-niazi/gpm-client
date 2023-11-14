import React from "react";
import "./styles/Collapse.scss";

const Collapse = ({ visible, children }) => {
  return (
    <div
      className={`custom-collapse ${!visible ? "custom-collapse-hide" : ""}`}
    >
      {children}
    </div>
  );
};
export default Collapse;
