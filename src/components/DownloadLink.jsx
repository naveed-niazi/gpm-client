import React from "react";
import { downloadFile } from "../utils/helper";

const DownloadLink = ({ file }) => {
  return (
    <p>
      Mentioned below file contains the content that will be posted for this
      article:
      <br />
      {file && (
        <span className="link" onClick={downloadFile(file)}>
          {file.name}
        </span>
      )}
    </p>
  );
};
export default DownloadLink;
