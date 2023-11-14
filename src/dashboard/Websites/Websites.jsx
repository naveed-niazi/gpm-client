import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Input, Button, Dropdown } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FilterFilled,
  MenuOutlined,
  DownloadOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import Content from "../../components/Content";
import Collapse from "../../components/Collapse";
import WebsiteFilters from "./components/WebsiteFilters";
import "./Websites.scss";
import WebsitesList from "./components/WebsitesList";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, setFilterVisible } from "../../store/websiteReducer";
import { downloadExcel, formatDate } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const items = [
  {
    key: "Add",
    label: "Add Website",
    icon: <PlusOutlined />,
  },
  {
    key: "Import",
    label: "Import File",
    icon: <FileAddOutlined />,
  },
  {
    key: "Export",
    label: "Export (.xlsx)",
    icon: <DownloadOutlined />,
  },
];

const Websites = () => {
  const navigate = useNavigate();
  const websites = useSelector((state) => state.website.data);

  const filterVisible = useSelector((state) => state.website.filterVisible);
  const isApplyFilter = useSelector((state) => state.website.isApplyFilter);
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.website.filters);

  const handleSearch = (event) => {
    dispatch(applyFilter({ ...filters, search: event.target.value }));
  };

  const handleAction = (e) => {
    switch (e.key) {
      case "Add":
        navigate("/websites/new");
        return;
      case "Import":
        navigate("/import");

        return;
      case "Export":
        const excelData = websites.map((e) => {
          let temp = {
            ...e,
            country: e.country.name,
            status: e.status ? "Active" : "Blocked",
            last_updated: formatDate(e.last_updated),
            categories: e.categories
              .map(
                (category) =>
                  `${category.name}[${category.cost},${category.price}]`
              )
              .toString(),
          };
          delete temp.price;
          delete temp.key;
          return temp;
        });
        downloadExcel(excelData, "Websites");
        break;
      default:
        console.log("unknown action");
    }
  };

  return (
    <Content
      title="Websites"
      action={
        <>
          <Button
            className={`filter-btn ${
              filterVisible ? "filter-btn-selected" : ""
            }`}
            icon={<FilterFilled />}
            onClick={() => dispatch(setFilterVisible(!filterVisible))}
          />
          <div id="website-dropdown">
            <Dropdown
              menu={{
                items,
                onClick: handleAction,
              }}
              getPopupContainer={() =>
                document.getElementById(`website-dropdown`)
              }
              trigger={["click"]}
            >
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          </div>

          {/* <Button
            icon={<UploadOutlined />}
            onClick={() => dispatch(setFilterVisible(!filterVisible))}
          >
            Import Websites
          </Button>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => dispatch(setFilterVisible(!filterVisible))}
          >
            Export (.xlsx)
          </Button> */}
          <Input
            allowClear
            defaultValue={filters.search}
            placeholder="Search website"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
        </>
      }
    >
      <Collapse visible={filterVisible}>
        <WebsiteFilters />
      </Collapse>
      <WebsitesList />
    </Content>
  );
};

export default Websites;
