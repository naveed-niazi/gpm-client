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
  Upload,
  Avatar,
  Input,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import "./ProfileForm.scss";

const ProfileForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="profile-form"
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input placeholder="First name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          {" "}
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          {" "}
          <Form.Item label="Phone Number" name="phone_no">
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={12} label="Designation">
          <Form.Item name="designation" label="Designation">
            <Input placeholder="Designation" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="company" label="Company Name">
            <Input placeholder="Company Name" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="actions">
        <Space>
          <Button>Cancel</Button>
          <Button type="primary">Save Changes</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
