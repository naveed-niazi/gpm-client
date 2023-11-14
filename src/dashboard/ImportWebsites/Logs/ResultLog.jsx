import React, { useState } from "react";
import { useSelector } from "react-redux";
import ViewResult from "../ViewResult/ViewResult";

const ResultLog = () => {
  const result = useSelector((state) => state.importWebsites.result);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="result">
      <p>{"> "}Below actions will be made permanently:</p>
      <p className="new">
        + create {result.new.length} new records
        <span className="link">
          (
          <span className="underline" onClick={() => setIsModalOpen("NEW")}>
            view result
          </span>
          )
        </span>
      </p>
      <p className="old">
        + update {result.old.length} existing records{" "}
        <span className="link">
          (
          <span className="underline" onClick={() => setIsModalOpen("OLD")}>
            view result
          </span>
          )
        </span>
      </p>
      {isModalOpen && (
        <ViewResult type={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};
export default ResultLog;
