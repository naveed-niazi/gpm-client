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

const EmailForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="email-form"
      initialValues={{
        remember: true,
      }}
      requiredMark={false}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Email"
        name="last_name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="phone_no"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input placeholder="Password" />
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

export default EmailForm;
