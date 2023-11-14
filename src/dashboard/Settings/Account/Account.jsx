import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Button, Menu, Divider, Collapse } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import "./Account.scss";
import EmailForm from "./EmailForm";
import PasswordForm from "./PasswordForm";
const { Panel } = Collapse;

const EmailHeader = ({ email }) => {
  return (
    <div className="panel-header">
      <h1>Email address</h1>
      <p>
        Your email address is<b> {email}</b>
      </p>
    </div>
  );
};
const PasswordHeader = () => {
  return (
    <div className="panel-header">
      <h1>Change Password</h1>
      <p>
        Your current password was last updated on <b>23 Jan, 2022 12:01 AM</b>
      </p>
    </div>
  );
};

const Account = () => {
  return (
    <div className="account">
      <h1 className="title">Account & Security</h1>
      <Row>
        <Col span={12}>
          <Collapse
            ghost
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <p className="link">{isActive ? "Hide" : "Change"}</p>
            )}
          >
            <Panel
              className="email-panel"
              header={<EmailHeader email="naveedabdullah700@gmail.com" />}
              key="1"
            >
              <EmailForm />
            </Panel>
            <Panel
              header={<PasswordHeader date="23 Jan, 2023 12:40pm" />}
              key="2"
            >
              <PasswordForm />
            </Panel>
          </Collapse>
        </Col>
        <Col span={12}>
          <DeleteAccount />
        </Col>
      </Row>
    </div>
  );
};

export default Account;
