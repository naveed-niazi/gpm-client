import React from "react";
import { Space, Table, Spin } from "antd";
import "./styles/Content.scss";

const Content = ({ title, action, children, loading }) => {
  return (
    <div className="dashboard-content" key={title}>
      <div className="header">
        <h2>{title}</h2>
        <Space size={4}>{action}</Space>
      </div>
      {loading ? (
        <div className="load-container">
          <Spin />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Content;
