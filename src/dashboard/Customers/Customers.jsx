import React, { useEffect } from "react";
import { Space, Table, Tag, Dropdown, Button } from "antd";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Content from "../../components/Content";
import { Link } from "react-router-dom";
import { CUSTOMERS_COLUMNS } from "../../utils/columns";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCustomers,
  applyFilter,
  setSelectedRows,
} from "../../store/customerReducer";
import "./Customers.scss";
import CustomersActions from "./components/CustomersActions";
// rowSelection object indicates the need for row selection

const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers);

  const handleSearch = (event) => {
    dispatch(applyFilter({ ...customers.filters, search: event.target.value }));
  };

  const rowSelection = {
    selectedRowKeys: customers.selectedRows.map((e) => e.key),
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(setSelectedRows(selectedRows));
    },
  };

  useEffect(() => {
    dispatch(fetchCustomers())
      .unwrap()
      .then(() => {
        dispatch(applyFilter(customers.filters));
      });
  }, []);

  return (
    <Content
      title="Customers"
      action={
        <Input
          allowClear
          defaultValue={customers.filters.search}
          placeholder="Search customer's name"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
        />
      }
    >
      <CustomersActions />
      <Table
        className="customers-table"
        columns={CUSTOMERS_COLUMNS}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        rowClassName={(record) =>
          !record.status && customers.filters.view === "All"
            ? "disable-row"
            : ""
        }
        dataSource={customers.filterResult}
      />
    </Content>
  );
};

export default Customers;
