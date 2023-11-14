import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Button, Menu } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Notification.scss";
import ProfileForm from "../Profile/ProfileForm";
import NotificationForm from "./NotifcationForm";

const Notification = () => {
  return (
    <div className="notification">
      <h2 className="title">Notifications</h2>
      <p className="description">
        Select the kinds of email notifications you get about your activities
        and reccomendations.
      </p>
      <NotificationForm />
    </div>
  );
};

export default Notification;
