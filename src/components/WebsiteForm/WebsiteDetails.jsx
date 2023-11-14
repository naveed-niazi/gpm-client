import React, { useState, useRef } from "react";
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
  Divider,
  DatePicker,
  Input,
  Row,
  Col,
  message,
  Select,
  Space,
} from "antd";
import { useNavigate, Link } from "react-router-dom";
import { WEBSITE_CATEGORIES } from "../../utils/samples/categories";
import WebsiteCategories from "./WebsiteCategories";
import ReactCountryFlag from "react-country-flag";
import { COUNTRIES } from "../../utils/samples/countries";
import { generateRule } from "./helper";
const { Option } = Select;

const FormItem = ({ span, children, ...formValues }) => (
  <Col span={span}>
    <Form.Item {...formValues}>{children}</Form.Item>
  </Col>
);

const WebsiteDetails = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoryList] = useState(WEBSITE_CATEGORIES);
  const inputRef = useRef(null);
  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const addCategory = (e) => {
    e.preventDefault();
    setCategoryList([...categoriesList, category]);
    setCategory("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onFinish = (values) => {
    if (!Array.isArray(values.categories) && values.categories.length < 1) {
      message.warning("Atleast one category in mandatory");
    }
    console.log("Received values of form: ", values);

    navigate("/orders");
  };
  const [form] = Form.useForm();

  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  return (
    <Row gutter={16}>
      <FormItem
        span={24}
        name="status"
        label="Status"
        initialValue={false}
        valuePropName="checked"
        rules={generateRule("status")}
      >
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Blocked"
          defaultChecked
        />
      </FormItem>
      <FormItem
        span={24}
        name="url"
        label="Website URL"
        rules={generateRule("url")}
      >
        <Input placeholder="Enter URL of website" />
      </FormItem>

      <FormItem
        span={7}
        label="Domain Authority (DA)"
        name="da"
        rules={generateRule("domain authority (da)")}
      >
        <InputNumber min={0} />
      </FormItem>
      <FormItem
        span={7}
        label="Domain Rating (DR)"
        name="dr"
        rules={generateRule("domain rating (dr)")}
      >
        <InputNumber min={0} />
      </FormItem>
      <FormItem
        span={6}
        label="Spam Score"
        name="spam"
        rules={generateRule("spam score")}
      >
        <InputNumber min={0} />
      </FormItem>
      <FormItem
        span={4}
        label="Links"
        name="links"
        rules={generateRule("allowed links")}
      >
        <InputNumber min={0} />
      </FormItem>
      <FormItem
        span={7}
        label="Monthly Traffic"
        name="traffic"
        rules={generateRule("traffic")}
      >
        <InputNumber min={0} />
      </FormItem>
      <FormItem
        span={7}
        label="Website Age"
        name="age"
        rules={generateRule("age")}
      >
        <DatePicker format="YYYY-MM-DD" />
      </FormItem>

      <FormItem
        span={10}
        label="Country"
        name="country"
        rules={generateRule("country")}
      >
        <Select showSearch className="select-flag">
          {Object.keys(COUNTRIES).map((country_code) => (
            <Select.Option key={country_code} value={COUNTRIES[country_code]}>
              {country_code === "INT" ? (
                <GlobalOutlined className="flag" />
              ) : (
                <ReactCountryFlag
                  className="flag"
                  countryCode={country_code}
                  svg
                />
              )}
              {COUNTRIES[country_code]}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <FormItem
        span={24}
        name="vendor"
        label="Vendor Details"
        initialValue={""}
        rules={generateRule("vendor details", false)}
      >
        <Input placeholder="Enter vendor details" />
      </FormItem>
    </Row>
  );
};
export default WebsiteDetails;
