import React, { useEffect } from "react";
import { Space, Table, Tag, Input, Row, Col } from "antd";
import {
  PieChartOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import Content from "../../components/Content";
import { Link } from "react-router-dom";
import StatsCard from "./components/StatsCard";
import "./Dashboard.scss";
import { CUSTOMERS_COLUMNS, ORDERS_COLUMNS } from "../../utils/columns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/customerReducer";
import { fetchOrders } from "../../store/ordersReducer";
import OrderStatistics from "./components/OrderStatistics";
import ProductSales from "./components/ProductSales";

const Dashboard = () => {
  const customers = useSelector((state) => state.customers.data);
  const orders = useSelector((state) => state.orders.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchOrders());
  }, []);

  return (
    <Content title="Dashboard">
      <Row className="dashboard-stats" gutter={20}>
        <StatsCard
          title="Total Sales"
          icon={<PieChartOutlined />}
          prefix="$"
          grow={true}
        />
        <StatsCard
          title="Total Profit"
          icon={<DollarOutlined />}
          prefix="$"
          grow={false}
        />
        <StatsCard
          title="Total Orders"
          icon={<ShoppingCartOutlined />}
          grow={false}
        />
        <StatsCard
          title="Total Customers"
          icon={<UsergroupAddOutlined />}
          grow={true}
        />
      </Row>

      <Row gutter={20}>
        <Col span={16}>
          <div className="table-card ">
            <h2 className="title">Product Sales</h2>
            <div className="chart">
              <ProductSales />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="table-card ">
            <h2 className="title">Orders Statistics</h2>

            <div className="chart">
              <OrderStatistics />
            </div>
          </div>
        </Col>
      </Row>

      <div className="table-card">
        <h2 className="title">New Customers</h2>
        <div className="content">
          <Table
            pagination={false}
            className="customers-table"
            columns={CUSTOMERS_COLUMNS}
            dataSource={customers.slice(0, 5)}
          />
          <Link to="customers" className="link">
            View More
          </Link>
        </div>
      </div>

      <div className="table-card">
        <h2 className="title">Recent Orders</h2>
        <div className="content">
          <Table
            pagination={false}
            className="customers-table"
            columns={ORDERS_COLUMNS}
            dataSource={orders.slice(0, 5)}
          />
          <Link to="orders" className="link">
            View More
          </Link>
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;
