import React, { useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Content from "../../components/Content";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, fetchOrders, setSearch } from "../../store/ordersReducer";
import { ORDER_STATUS } from "../../utils/constants";
import { ORDERS_COLUMNS } from "../../utils/columns";
import OrdersActions from "./components/OrdersActions";

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(applyFilter({ ...orders.filters, search: event.target.value }));
  };

  useEffect(() => {
    dispatch(fetchOrders())
      .unwrap()
      .then(() => {
        dispatch(applyFilter(orders.filters));
      });
  }, []);

  return (
    <Content
      title="Orders"
      action={
        <Input
          allowClear
          placeholder="Search order"
          onChange={handleSearch}
          prefix={<SearchOutlined />}
        />
      }
    >
      <OrdersActions />
      <div className="orders-table">
        <Table
          columns={ORDERS_COLUMNS}
          dataSource={orders.filterResult}
          loading={orders.loading}
        />
      </div>
    </Content>
  );
};

export default Orders;
