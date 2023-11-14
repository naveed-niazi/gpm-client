import React from "react";

const ErrorLog = ({ error }) => {
  console.log("error", error);
  if (error.msgType)
    return (
      <p className="error">
        {"[ERROR]"} <b>{error.title}</b>: {error.message}
      </p>
    );
  else
    return (
      <p className="error">
        {"[ERROR]"} {error.toString()}
      </p>
    );
};

export default ErrorLog;
