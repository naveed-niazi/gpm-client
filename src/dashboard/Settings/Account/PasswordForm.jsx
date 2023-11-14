import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Space,
  Layout,
  Button,
  Menu,
  Form,
  Image,
  Input,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const PasswordForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="password-form"
      initialValues={{
        remember: true,
      }}
      requiredMark={false}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Current Password"
        name="last_name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input placeholder="Current Password" />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="phone_no"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input placeholder="New Password" />
      </Form.Item>
      <Form.Item
        label="Re-enter new password"
        name="first_name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item
        className="actions"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Button type="primary">Save Changes</Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordForm;
