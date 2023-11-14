import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Button, Menu, Divider, Collapse } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DeleteAccount = () => {
  return (
    <div className="delete-account">
      <div className="panel-header">
        <h1>Delete account</h1>
        <p> Would you like to delete your account? </p>
        <p>
          Delete your account will remove all the content associated with it.
        </p>
        <p className="link">I want to delete my account</p>
      </div>
    </div>
  );
};

export default DeleteAccount;
