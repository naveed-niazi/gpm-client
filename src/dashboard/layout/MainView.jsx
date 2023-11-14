import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const { Content, Sider } = Layout;
import "./styles/MainView.scss";

const MainView = () => {
  return (
    <Layout className="dashboard-main" id="dashboard-main">
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
export default MainView;
