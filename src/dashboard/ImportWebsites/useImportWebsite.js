import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addActionLog,
  addErrorLog,
  addResultLog,
  addTextLog,
  resetImportData,
  setFile,
  setResult,
} from "../../store/importReducer";
import { fetchWebsites } from "../../store/websiteReducer";
import sendNotification from "../../components/Notification";
import {
  parseFile,
  validateFormat,
  validateValues,
  groupOldNew,
} from "./helper";

export function useImportWebsite() {
  const dispatch = useDispatch();
  const websites = useSelector((state) => state.website.data);
  const file = useSelector((state) => state.importWebsites.file);

  const handleImport = async () => {
    try {
      let { fileData, originalFile } = file;

      //initial logs
      dispatch(addTextLog(`processing "${originalFile.name}"`));
      dispatch(addTextLog("starting import"));

      //checking file format (file type/empty file/ mandatory fields test)
      dispatch(addTextLog("checking file format"));
      await validateFormat(fileData); // validate data format

      //validate each value of website
      dispatch(addTextLog("validating each row values"));
      let validatedFileData = await validateValues(fileData);

      //check if there are existing websites
      dispatch(addTextLog("matching previous records"));
      const { new_websites, old_websites } = await groupOldNew(
        validatedFileData,
        websites
      );
      dispatch(setResult({ old: old_websites, new: new_websites }));

      //final output one the import is completed
      dispatch(addResultLog());
      dispatch(addActionLog());
    } catch (err) {
      console.log("err", err);
      dispatch(addErrorLog(err));
    }
  };

  const handleUpload = async (file) => {
    try {
      let fileData = await parseFile(file);
      dispatch(setFile(fileData));
    } catch (error) {
      console.log(error);
      sendNotification({
        msgType: "error",
        title: error.title,
        message: error.message,
      });
    }
  };

  const handleRemoveFile = (event) => {
    if (event.target.value === "") dispatch(resetImportData());
  };

  useEffect(() => {
    dispatch(fetchWebsites());
  }, []);

  return [handleImport, handleUpload, handleRemoveFile];
}
