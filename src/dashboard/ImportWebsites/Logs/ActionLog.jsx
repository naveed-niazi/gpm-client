import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetImportData, upload } from "../../../store/importReducer";

const ActionLog = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.importWebsites.result);

  const handleImport = () => {
    let updateWebsites = result.old.map((e) => {
      let website = { ...e };
      website["id"] = website.prev.id;
      delete website.prev;
      return website;
    });

    dispatch(upload({ old: updateWebsites, new: result.new }));
  };

  return (
    <>
      <br />
      <p>
        {"> "} Are you sure you want to continue?{" "}
        <button onClick={handleImport}>Yes</button>
        <button className="yes-btn" onClick={() => dispatch(resetImportData())}>
          No
        </button>
      </p>
    </>
  );
};
export default ActionLog;
