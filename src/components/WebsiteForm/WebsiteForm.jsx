import React, { useState, useRef, useEffect } from "react";
import {
  LockOutlined,
  UserOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import {
  Button,
  Switch,
  Checkbox,
  InputNumber,
  Form,
  message,
  Divider,
  DatePicker,
  Input,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import WebsiteCategories from "./WebsiteCategories";
import { COUNTRIES } from "../../utils/samples/countries";
import dayjs from "dayjs";
import WebsiteDetails from "./WebsiteDetails";
import "../styles/WebsiteForm/WebsiteForm.scss";
import moment from "moment";

const FormItem = ({ span, children, ...formValues }) => (
  <Col span={span}>
    <Form.Item {...formValues}>{children}</Form.Item>
  </Col>
);

const WebsiteForm = ({ defaultValue }) => {
  const [form] = Form.useForm();

  console.log("websiteform data", defaultValue);

  const onFinish = (values) => {
    if (!Array.isArray(values.categories) || values.categories.length < 1) {
      message.error("Add minimum one category to proceed!");
    }
    console.log("Received values of formas: ", values);
    // navigate("/orders");
  };

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue({
        ...defaultValue,
        country: defaultValue.country.name,
        age: dayjs(defaultValue.age, "YYYY-MM-DD"),
      });
      console.log("form values", form.getFieldsValue());
    }
  }, [defaultValue]);

  return (
    <Form
      name="website-form"
      className="website-form"
      layout="vertical"
      onFinish={onFinish}
      form={form}
    >
      <div className="content">
        <div className="website-details">
          <WebsiteDetails />{" "}
          <FormItem>
            <Space>
              <Link to="/websites">
                <Button className="website-form-button">Cancel</Button>
              </Link>

              <Button
                type="primary"
                htmlType="submit"
                className="website-form-button"
              >
                Save
              </Button>
            </Space>
          </FormItem>
        </div>

        <WebsiteCategories />
      </div>
    </Form>
  );
};
export default WebsiteForm;
