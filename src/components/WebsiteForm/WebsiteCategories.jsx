import React, { useState, useRef } from "react";
import {
  LockOutlined,
  UserOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  InputNumber,
  Form,
  Divider,
  Input,
  Row,
  Col,
  Select,
  Space,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import { WEBSITE_CATEGORIES } from "../../utils/samples/categories";
import "../styles/WebsiteForm/WebsiteCategories.scss";
import { generateRule } from "./helper";
const { Option } = Select;

const WebsiteCategories = () => {
  return (
    <div className="website-categories">
      <Row>
        <Col span={24}>
          <div className="header">
            <h2 className="title">Categories</h2>
            {/* <p className="link">
              <SettingOutlined />
              Manage Categories
            </p> */}
          </div>
        </Col>
        <Col span={24}>
          <Form.List
            name="categories"
            initialValue={[{ name: "General", cost: 0, price: 0 }]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline">
                    <Form.Item
                      {...field}
                      label="Category"
                      name={[field.name, "name"]}
                      rules={generateRule("category")}
                      initialValue="General"
                      key={field.key + "category"}
                    >
                      <Select
                        style={{
                          width: 200,
                        }}
                      >
                        {WEBSITE_CATEGORIES.map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="Cost($)"
                      name={[field.name, "cost"]}
                      rules={generateRule("cost")}
                      initialValue={0}
                      key={field.key + "cost"}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Price($)"
                      initialValue={0}
                      name={[field.name, "price"]}
                      key={field.key + "price"}
                      rules={generateRule("price")}
                    >
                      <InputNumber min={0} />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    className="add-category-btn"
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Category
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>{" "}
        </Col>
      </Row>
    </div>
  );
};
export default WebsiteCategories;
