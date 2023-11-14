import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Dropdown, Button } from "antd";
import { Input } from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  SmileOutlined,
  DownloadOutlined,
  CheckOutlined,
  StopOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { applyAction, applyFilter } from "../../../store/customerReducer";
import "./CustomersActions.scss";
const CustomersActions = () => {
  const customers = useSelector((state) => state.customers.data);
  const filters = useSelector((state) => state.customers.filters);
  const selectedRows = useSelector((state) => state.customers.selectedRows);
  const filterResult = useSelector((state) => state.customers.filterResult);

  const dispatch = useDispatch();
  const [total, setTotal] = useState({ disabled: 0, all: 0, active: 0 });

  const items = [
    {
      key: "Block",
      label: "Block",
      icon: <StopOutlined />,
    },
    {
      key: "Activate",
      label: "Activate",
      icon: <CheckOutlined />,
    },
    {
      key: "Export",
      label: "Export (.xlsx)",
      icon: <DownloadOutlined />,
    },
  ];
  const handleAction = (e) => {
    dispatch(applyAction(e.key));
  };

  const changeView = (view) => {
    dispatch(applyFilter({ ...filters, view }));
  };

  const ViewType = ({ total, value }) => {
    let isSelected = value === filters.view;
    return (
      <p
        className={isSelected ? "view-active" : "view"}
        onClick={() => changeView(value)}
      >
        {value} ({total})
      </p>
    );
  };

  useEffect(() => {
    let totalAll = customers.length;
    let totalDisable = customers.filter((e) => !e.status).length;
    let totalActive = totalAll - totalDisable;
    setTotal({ disabled: totalDisable, active: totalActive, all: totalAll });
  }, [customers]);

  return (
    <div className="customers-actions">
      <Space className="flex-grow">
        <ViewType value="All" total={total.all} />
        <ViewType value="Active" total={total.active} />
        <ViewType value="Disabled" total={total.disabled} />
        {filters.search !== "" && (
          <div className="search-result">
            <b>{filterResult.length}</b> results for <b>"{filters.search}"</b>
          </div>
        )}
      </Space>

      <div className={`bulk-action ${selectedRows.length < 1 && "hide"}`}>
        <div className="number">({selectedRows.length}) </div>
        <div className="text"> selected items </div>

        <div id="action-dropdown">
          <Dropdown
            menu={{
              items,
              onClick: handleAction,
            }}
            // getPopupContainer={() => document.getElementById(`action-dropdown`)}
            trigger={["click"]}
          >
            <Button icon={<MoreOutlined />}>Actions</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CustomersActions;
