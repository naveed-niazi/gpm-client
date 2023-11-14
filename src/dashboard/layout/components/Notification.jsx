import React from "react";
import { Button, Divider } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import Dropdown from "../../../components/Dropdown";
import "../styles/Notification.scss";
import { Avatar, Badge } from "antd";
import Icon from "@ant-design/icons";
import moment from "moment";
import { ReactComponent as ReadIcon } from "../../../assets/read.svg";
import { ReactComponent as BulletPoint } from "../../../assets/circle.svg";
import { NOTIFICATION_LIST } from "../../../utils/samples/notification";

const renderNotifications = () => {
  return NOTIFICATION_LIST.map((notification) => ({
    key: notification.id,
    label: (
      <div
        className={`notification-item ${
          notification.isRead ? "read" : "unread"
        }`}
      >
        <div className="main">
          {!notification.isRead && (
            <Icon component={BulletPoint} className="bullet" />
          )}
          <div className="content">
            <p className="message">{notification.message}</p>
            <span className="date">
              {moment(notification.date).format("MMM DD, YYYY [at] hh:mm A")}
            </span>
          </div>
          <div className="avatar">
            <Avatar size={40} icon={<UserOutlined />} />
          </div>
        </div>
        <Divider />
      </div>
    ),
  }));
};

const NotificationsContent = ({ children }) => {
  return (
    <div className="notification-wrapper">
      <div className="header">
        <h1>Notifications</h1>
        <Icon component={ReadIcon} color="blue" />

        <h3>Mark all as read</h3>
      </div>
      {children}
      <div className="view-more">
        <p>View all notifications</p>
      </div>
    </div>
  );
};

const Notification = () => {
  return (
    <Dropdown
      items={renderNotifications()}
      className="notification"
      DropdownWrapper={NotificationsContent}
      placement="bottomRight"
    >
      {" "}
      <Badge count={3}>
        <Button icon={<BellFilled />} />
      </Badge>
    </Dropdown>
  );
};

export default Notification;
