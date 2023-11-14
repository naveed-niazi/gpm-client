import React, { useEffect } from "react";
import { Table } from "antd";
import "./WebsitesList.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchWebsites } from "../../../store/websiteReducer";
import FilterHeader from "./FilterHeader";
import { WEBSITE_COLUMNS } from "../../../utils/columns";

const WebsitesList = () => {
  const websites = useSelector((state) => state.website);
  const { data, filterResult, isApplyFilter, loading } = websites;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWebsites());
  }, []);

  return (
    <div className="website-list">
      <FilterHeader />
      <Table
        pagination={{ pageSize: 8 }}
        scroll={{ x: 1800 }}
        columns={WEBSITE_COLUMNS}
        dataSource={isApplyFilter ? filterResult : data}
        loading={loading}
        rowClassName={(record) => (!record.status ? "disable-row" : "")}
      />
    </div>
  );
};

export default WebsitesList;
