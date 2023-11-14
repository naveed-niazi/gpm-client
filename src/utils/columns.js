import ReactCountryFlag from "react-country-flag";
import { Tag, Popover, Descriptions, Space, Typography, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  FileOutlined,
  LinkOutlined,
  GlobalOutlined,
  StopOutlined,
  EditOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  ARTICLE_STATUS,
  DATE_FORMAT,
  ORDER_STATUS,
  WEBSITE_TOOLTIPS,
} from "./constants";
import {
  calculateYearsAndMonthsPassed,
  capitalizeFirstCharacter,
  formatDate,
} from "./helper";
import WebsiteActions from "../dashboard/Websites/components/WebsiteActions";
import NewTabIcon from "../components/NewTabIcon";
import moment from "moment";

export const WEBSITE_COLUMNS = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Website",
    dataIndex: "url",
    key: "url",
    render: (url, record) => (
      <Link to={record.id}>
        <div className="website-url">
          <p>{url}</p>
          <EditOutlined />
        </div>
      </Link>
    ),
  },
  {
    title: "DA",
    key: "da",
    dataIndex: "da",
    className: "text-center",
  },
  {
    title: "DR",
    key: "dr",
    dataIndex: "dr",
    className: "text-center",
  },
  {
    title: "Traffic",
    key: "traffic",
    dataIndex: "traffic",
    className: "text-center",
  },
  {
    title: "Links",
    key: "links",
    dataIndex: "links",
    className: "text-center",
  },
  {
    title: "Country",
    key: "country",
    dataIndex: "country",
    className: "text-center",

    render: (country) =>
      country.code === "INT" ? (
        <GlobalOutlined className="flag" />
      ) : (
        <ReactCountryFlag className="flag" countryCode={country.code} svg />
      ),
  },
  {
    title: "Spam Score",
    key: "spam",
    dataIndex: "spam",
    className: "text-center",
  },
  {
    title: "Age",
    key: "age",
    dataIndex: "age",
    className: "text-center",
    render: (date) => calculateYearsAndMonthsPassed(date),
  },

  {
    title: "Categories",
    key: "categories",
    dataIndex: "categories",

    render: (categories) =>
      categories.map((c) => (
        <Tag className="category-tag" key={c.name}>
          <b>{c.name}(</b>
          <span className="cost"> ${c.cost}</span>
          <b> {"-> "}</b>
          <span className="price">${c.price}</span>
          <b> )</b>
        </Tag>
      )),
  },
  {
    title: "Vendor",
    key: "vendor",
    dataIndex: "vendor",
    className: "text-center",
  },
  // {
  //   title: "Cost",
  //   key: "cost",
  //   dataIndex: "cost",
  //   className: "text-center",

  //   render: (cost) => <span className="cost">${cost}</span>,
  // },
  // {
  //   title: "Retail Price",
  //   key: "price",
  //   dataIndex: "price",
  //   className: "text-center",
  //   render: (price) => <span className="price">${price}</span>,
  // },
  {
    title: "Last Updated",
    dataIndex: "last_updated",
    key: "last_updated",
    className: "text-center",
    render: formatDate,
    sorter: (a, b) => moment(a.last_updated).diff(moment(b.last_updated)),
  },
  {
    title: "Action",
    key: "action",
    className: "text-center",

    render: (record) => <WebsiteActions record={record} />,
  },
];

export const ORDERS_COLUMNS = [
  {
    title: "ORDER ID",
    dataIndex: "id",
    key: "id",
    render: (text) => (
      <Link className="order-link" to={text}>
        {text}
      </Link>
    ),
  },
  {
    title: "CUSTOMER EMAIL",
    dataIndex: "customer_mail",
    key: "customer_mail",
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <Tag
        color={
          status === ORDER_STATUS.PENDING
            ? "blue"
            : status === ORDER_STATUS.IN_PROCESS
            ? "gold"
            : status === ORDER_STATUS.COMPLETED
            ? "green"
            : "red"
        }
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "CREATED",
    dataIndex: "created",
    key: "created",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "DUE",
    dataIndex: "due",
    key: "due",
  },
  {
    title: "DELIVERY",
    dataIndex: "delivery_type",
    key: "delivery_type",
    render: (delivery_type) =>
      delivery_type === "Urgent" ? (
        <p className="urgent">{delivery_type.toUpperCase()}</p>
      ) : (
        <p className="standard">{delivery_type.toUpperCase()}</p>
      ),
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
    render: (amount) => <a>${amount}</a>,
  },
];

export const LINKS_COLUMN = [
  {
    title: "Link No",
    dataIndex: "link_no",
    key: "link_no",
  },
  {
    title: "Target Url",
    dataIndex: "target_url",
    key: "target_url",
    render: (value) => (value === "" ? "-" : value),
    editable: true,
  },
  {
    title: "Anchor Text",
    dataIndex: "anchor_text",
    render: (value) => (value === "" ? "-" : value),
    key: "anchor_text",
    editable: true,
  },
];

export const ORDER_ITEMS_COLUMN = [
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: (url) => <span className="link">{url}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag
        color={
          status === ARTICLE_STATUS.PENDING
            ? "blue"
            : status === ARTICLE_STATUS.IN_WRITING
            ? "gold"
            : status === ARTICLE_STATUS.SUBMITTED
            ? "lime"
            : status === ARTICLE_STATUS.PUBLISHED
            ? "green"
            : "red"
        }
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Links",
    dataIndex: "links",
    key: "links",
    render: (links) => (
      <div id="link-popover-container">
        <Popover
          overlayClassName="link-popover"
          trigger="click"
          placement="rightTop"
          getPopupContainer={() =>
            document.getElementById("link-popover-container")
          }
          content={
            <Descriptions bordered size="small">
              <Descriptions.Item
                className="header"
                label="Anchor Text"
                span={5}
              >
                Target Url
              </Descriptions.Item>
              {links.map((e, index) => (
                <Descriptions.Item key={index} label={e.anchor_text} span={5}>
                  <span className="link">{e.target_url}</span>
                </Descriptions.Item>
              ))}
            </Descriptions>
          }
        >
          <LinkOutlined />
        </Popover>
      </div>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => <>{capitalizeFirstCharacter(category)}</>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => <span>${price}</span>,
    render: (price) => <span>${price}</span>,
  },
  {
    title: "Content",
    dataIndex: "content_type",
    key: "content_type",
    render: () => <FileOutlined />,
  },
  {
    title: "Published Url",
    dataIndex: "published_url",
    key: "published_url",
    render: (url) =>
      url ? (
        <a href={url} target="_blank" className="result-link">
          View Result
        </a>
      ) : (
        "-"
      ),
  },
];

export const CUSTOMERS_COLUMNS = [
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    render: (r, customer) => customer.first_name + " " + customer.last_name,
    sorter: (a, b) => a.first_name.localeCompare(b.first_name),
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Co.",
    key: "country",
    dataIndex: "country",
    className: "text-center",
    render: (country) =>
      country.code === "INT" ? (
        <GlobalOutlined className="flag" />
      ) : (
        <ReactCountryFlag className="flag" countryCode={country.code} svg />
      ),
  },
  {
    title: "Last Activity",
    dataIndex: "last_activity",
    key: "last_activity",
    render: formatDate,
    sorter: (a, b) => moment(a.last_activity).diff(moment(b.last_activity)),
  },
  {
    title: "Last Order",
    dataIndex: "last_order",
    key: "last_order",
    render: formatDate,
    sorter: (a, b) => moment(a.last_order).diff(moment(b.last_order)),
  },
  {
    title: (
      <div>
        <p>Total</p>
        <p>Orders</p>
      </div>
    ),
    dataIndex: "total_orders",
    key: "total_orders",
    className: "text-center",
    sorter: (a, b) => a.total_orders - b.total_orders,
  },

  {
    title: (
      <div>
        <p>Total</p>
        <p>Spending</p>
      </div>
    ),
    className: "text-center",
    dataIndex: "total_spending",
    key: "total_spending",
    sorter: (a, b) => a.total_spending - b.total_spending,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    className: "text-center",
    render: (status) => (status ? <CheckOutlined /> : <StopOutlined />),
  },
];
