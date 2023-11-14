import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Upload, Button, Space, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Topbar from "../layout/Topbar";
import { useImportWebsite } from "./useImportWebsite";
import { useDispatch, useSelector } from "react-redux";
import "./ImportWebsites.scss";
import { resetImportData } from "../../store/importReducer";

const ImportWebsites = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.importWebsites.logs);
  const file = useSelector((state) => state.importWebsites.file);
  const loading = useSelector((state) => state.importWebsites.loading);
  const [handleImport, handleUpload, handleRemoveFile] = useImportWebsite();

  useEffect(() => {
    return () => {
      dispatch(resetImportData());
    };
  }, []);

  return (
    <Layout>
      <Topbar showHome={true} />
      <div className="import-websites">
        <h2 className="title">Import Websites</h2>
        <Space.Compact
          style={{
            width: "50%",
          }}
        >
          <Input
            allowClear={true}
            placeholder="Please select file"
            value={file && file.originalFile.name}
            onChange={handleRemoveFile}
          />
          {file ? (
            <Button
              type="primary"
              disabled={logs.length > 0}
              className="start-import-btn"
              onClick={handleImport}
            >
              Start Import
            </Button>
          ) : (
            <Upload
              accept=".xlsx, .xls, .csv"
              showUploadList={false}
              action={console.log}
              customRequest={console.log}
              onChange={handleUpload}
            >
              <Button type="primary">Select File</Button>
            </Upload>
          )}
        </Space.Compact>

        {logs.length > 0 && (
          <div className="console-screen">
            <div className="header">Logs</div>
            <div className="content">
              {logs}
              {loading && (
                <p>
                  <LoadingOutlined
                    style={{
                      fontSize: 12,
                    }}
                    spin
                  />{" "}
                  Importing File ...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ImportWebsites;
