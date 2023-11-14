import React from "react";
// import Menu from "./Menu";
import {
  LaptopOutlined,
  GlobalOutlined,
  NotificationOutlined,
  ShoppingOutlined,
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  HomeFilled,
  SettingOutlined,
  MailOutlined,
  DollarOutlined,
  HomeTwoTone,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Content, Sider } = Layout;
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/Sidebar.scss";

const menuItems = [
  { label: "Dashboard", key: "/", icon: <HomeFilled /> },
  { label: "Orders", key: "/orders", icon: <ShoppingOutlined /> },
  { label: "Customers", key: "/customers", icon: <TeamOutlined /> },
  { label: "Websites", key: "/websites", icon: <GlobalOutlined /> },
  { label: "Pricing", key: "/pricing", icon: <DollarOutlined /> },
  { label: "Email", key: "/email", icon: <MailOutlined /> },
];

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Sider width={160} className="dashboard-sidebar">

      <Menu
        mode="inline"
        className="menu"
        onClick={(option) => navigate(option.key)}
        selectedKeys={`/${pathname.split("/")[1]}`}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
