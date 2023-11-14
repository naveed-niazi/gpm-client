import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MainView from "./MainView";
import "./styles/Layout.scss";

const DasboardLayout = () => {
  return (
    <Layout className="dashboard-layout">
      <Topbar />
      <Layout>
        <Sidebar />
        <MainView />
      </Layout>
    </Layout>
  );
};
export default DasboardLayout;
