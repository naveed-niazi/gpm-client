import React from "react";
import { Layout } from "antd";
import Notification from "./components/Notification";
import UserProfile from "./components/UserProfile";
import "./styles/Topbar.scss";
import { Link } from "react-router-dom";
import Home from "./components/Home";
const { Header } = Layout;

const Topbar = ({ showHome }) => {
  return (
    <Header className="dashboard-topbar">
      <div className="logo">
        <Link to="/">
          <h3>Logo</h3>
        </Link>
      </div>
      {showHome && <Home />}

      <Notification />
      <UserProfile />
    </Header>
  );
};

export default Topbar;
