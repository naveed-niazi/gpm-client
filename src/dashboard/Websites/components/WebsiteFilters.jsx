import React, { useEffect, useState } from "react";
import { Row, Col, Slider, Form, Space, Button, Select, Input } from "antd";
import {
  GlobalOutlined,
  CloseOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ReactCountryFlag from "react-country-flag";
import "./WebsiteFilters.scss";
import {
  applyFilter,
  resetFilter,
  setFilterVisible,
} from "../../../store/websiteReducer";
import {
  WEBSITE_EXTENTSIONS_OPTIONS,
  WEBSITE_TRAFFIC_OPTIONS,
} from "../../../utils/constants";
import NumericInput from "../../../components/NumericInput";

const FormItem = ({ span, label, name, children, initialValue }) => (
  <Col span={span}>
    <Form.Item label={label} name={name} initialValue={initialValue}>
      {children}
    </Form.Item>
  </Col>
);

const WebsiteFilters = () => {
  const categories = useSelector((state) => state.website.categories);
  const countries = useSelector((state) => state.website.countries);
  const filters = useSelector((state) => state.website.filters);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSelectChange = (label, value) => {
    form.setFieldsValue({
      [label]: value,
    });
  };

  const updatePrice = (value, type) => {
    let tempPrice = form.getFieldValue("price");
    if (type === "MIN") handleSelectChange("price", [value, tempPrice[1]]);
    else handleSelectChange("price", [tempPrice[0], value]);
  };

  const handleApplyFilter = () => {
    dispatch(applyFilter({ ...form.getFieldsValue(), search: filters.search }));
  };

  const handleResetFilter = () => {
    dispatch(resetFilter());
    form.resetFields();
  };

  const handleCloseFilters = () => {
    dispatch(setFilterVisible(false));
  };
  useEffect(() => {
    form.setFieldsValue(filters);
  }, [filters]);

  const CustomSelect = ({ type, children }) => (
    <div id={`${type}-select`}>
      <Select
        defaultValue={filters[type]}
        onChange={(value) => handleSelectChange(type, value)}
        placeholder={`Select ${type}`}
        showSearch
        getPopupContainer={() => document.getElementById(`${type}-select`)}
      >
        {children}
      </Select>
    </div>
  );

  return (
    <Form
      labelCol={{
        span: 24,
      }}
      className="website-filter"
      name="websites-filter"
      initialValues={{
        remember: true,
      }}
      form={form}
    >
      <Row gutter={30}>
        {/* PRICE FILTER */}
        <FormItem
          span={4}
          label="Price (USD)"
          name="price"
          initialValue={filters.price}
        >
          <Input.Group compact>
            <NumericInput
              placeholder="Min"
              defaultValue={filters.price[0]}
              onChange={(value) => updatePrice(value, "MIN")}
            />
            <NumericInput
              placeholder="Max"
              defaultValue={filters.price[1]}
              onChange={(value) => updatePrice(value, "MAX")}
            />
          </Input.Group>
        </FormItem>

        {/* TRAFFIC FILTER */}
        <FormItem
          span={5}
          name="traffic"
          label="Traffic"
          initialValue={filters.traffic}
        >
          <CustomSelect type="traffic">
            {Object.keys(WEBSITE_TRAFFIC_OPTIONS).map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </CustomSelect>
        </FormItem>

        {/* EXTENSION FILTER */}
        <FormItem span={3} name="extension" label="Extension">
          <CustomSelect type="extension">
            <Select.Option value="all">All</Select.Option>
            {WEBSITE_EXTENTSIONS_OPTIONS.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </CustomSelect>
        </FormItem>

        {/* DR FILTER */}
        <FormItem
          span={6}
          name="dr"
          label="Domain Rating (DR)"
          initialValue={filters.dr}
        >
          <Slider
            range
            min={0}
            max={100}
            marks={{
              0: "0",
              100: "100",
            }}
          />
        </FormItem>

        {/* SPAM FILTER */}
        <FormItem
          span={6}
          name="spam"
          label="Spam Score"
          initialValue={filters.spam}
        >
          <Slider
            range
            min={0}
            max={100}
            marks={{
              0: "0",
              100: "100",
            }}
          />
        </FormItem>

        {/* CATEGORY FILTER */}
        <FormItem
          span={6}
          name="category"
          label="Category"
          initialValue={filters.category}
        >
          <CustomSelect type="category">
            <Select.Option value="all">All</Select.Option>
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Select.Option>
            ))}
          </CustomSelect>
        </FormItem>

        {/* COUNTRY FILTER */}
        <FormItem
          span={6}
          name="country"
          label="Country"
          initialValue={filters.country}
        >
          <CustomSelect type="country">
            <Select.Option value="all">All</Select.Option>
            {Object.keys(countries).map((country_code) => (
              <Select.Option key={country_code} value={countries[country_code]}>
                {country_code === "INT" ? (
                  <GlobalOutlined className="flag" />
                ) : (
                  <ReactCountryFlag
                    className="flag"
                    countryCode={country_code}
                    svg
                  />
                )}
                {countries[country_code]}
              </Select.Option>
            ))}
          </CustomSelect>
        </FormItem>

        {/* DA FILTER */}
        <FormItem
          span={6}
          name="da"
          label="Domain Authority (DA)"
          initialValue={filters.da}
        >
          <Slider
            range
            min={0}
            max={100}
            marks={{
              0: "0",
              100: "100",
            }}
          />
        </FormItem>
      </Row>
      <Row className="actions">
        <Space>
          <Button onClick={handleCloseFilters} icon={<CloseOutlined />}>
            Close Filters
          </Button>
          <Button onClick={handleResetFilter} icon={<RollbackOutlined />}>
            Reset Filters
          </Button>
          <Button type="primary" onClick={handleApplyFilter}>
            Apply
          </Button>
        </Space>
      </Row>
    </Form>
  );
};
export default WebsiteFilters;
