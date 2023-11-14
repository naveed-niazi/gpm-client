import React from "react";
import { Avatar, Button, Space } from "antd";
import {
  UserOutlined,
  DownOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Dropdown from "../../../components/Dropdown";
import { Link } from "react-router-dom";

const profileOptions = [
  {
    key: "0",
    label: <Link to="/settings">Settings</Link>,
    icon: <SettingOutlined />,
  },
  {
    key: "1",
    label: <Link to="/login">Logout</Link>,
    icon: <LogoutOutlined />,
  },
];

const UserProfile = () => {
  return (
    <Dropdown items={profileOptions}>
      <Space className="user-profile">
        <Avatar size={30} icon={<UserOutlined />} />
        <span className="avatar">ADMIN</span>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default UserProfile;
