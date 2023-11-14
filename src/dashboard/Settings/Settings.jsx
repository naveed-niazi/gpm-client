import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Button, Menu } from "antd";
import Topbar from "../layout/Topbar";
import Notification from "./Notification/Notification";
import Profile from "./Profile/Profile";
import Account from "./Account/Account";
import "./Settings.scss";
import {
  DeleteOutlined,
  PlusOutlined,
  InboxOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
const items = [
  { label: "Profile", key: "profile" },
  { label: "Account & Security", key: "account" },
  { label: "Notification", key: "notification" },
];

const Settings = () => {
  const [selected, setSelected] = useState("profile");

  return (
    <Layout>
      <Topbar showHome={true} />
      <div className="settings">
        <Row>
          <Col span={4}>
            <div className="sidebar">
              <Menu
                className="menu"
                mode="inline"
                defaultSelectedKeys={selected}
                items={items}
                onClick={(item) => {
                  setSelected(item.key);
                }}
              />
            </div>
          </Col>
          <Col span={20}>
            <div className="content">
              {selected === "notification" && <Notification />}
              {selected === "account" && <Account />}
              {selected === "profile" && <Profile />}
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Settings;
