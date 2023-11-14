import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Space,
  Layout,
  Button,
  Menu,
  Checkbox,
  Form,
  Image,
  Input,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const NotificationForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="notification-form"
      initialValues={{
        remember: true,
      }}
      requiredMark={false}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="news_updates"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox>
          News and Updates
          <span className="checkbox-description">
            (News about product and feature updates)
          </span>
        </Checkbox>
      </Form.Item>
      <Form.Item
        name="order_activity"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
        valuePropName="checked"
      >
        <Checkbox>
          Order Activity
          <span className="checkbox-description">
            (Recieve notification on any udpate in order status)
          </span>
        </Checkbox>
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

export default NotificationForm;
