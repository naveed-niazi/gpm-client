import ReactCountryFlag from "react-country-flag";
import { Tag } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import moment from "moment";
import { calculateYearsAndMonthsPassed } from "../../../utils/helper";
import _ from "lodash";

const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

function compareArrayObjects(a1, a2) {
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
}
function matchValues(value, item, key) {
  if (!item.prev) return value;
  if (value === item.prev[key]) return value;
  if (item.showPrev)
    return <div className="previous-value">{item.prev[key]}</div>;
  else return <div className="updated-value">{value}</div>;
}

function isCategoryUpdated(value, arr) {
  return arr.find((p) => objectsEqual(p, value));
}

function matchStatus(value, item) {
  let curr = value ? "Active" : "Blocked";

  if (!item.prev) return curr;

  let prev = item.prev.status ? "Active" : "Blocked";
  if (curr === prev) return curr;
  if (item.showPrev) return <div className="previous-value">{prev}</div>;
  else return <div className="updated-value">{curr}</div>;
}

function matchCategories(value, item) {
  if (!item.prev)
    return value.map((c) => (
      <Tag className="category-tag" key={c.name}>
        <b>{c.name}(</b>
        <span className="cost"> ${c.cost}</span>
        <b> {"-> "}</b>
        <span className="price">${c.price}</span>
        <b> )</b>
      </Tag>
    ));
  const prev = item.prev.categories;

  if (compareArrayObjects(value, prev))
    return value.map((c) => (
      <Tag className="category-tag" key={c.name}>
        <b>{c.name}(</b>
        <span className="cost"> ${c.cost}</span>
        <b> {"-> "}</b>
        <span className="price">${c.price}</span>
        <b> )</b>
      </Tag>
    ));
  if (item.showPrev)
    return prev.map((c) => {
      let className = isCategoryUpdated(c, value) ? "" : "previous-value";
      return (
        <div className={className}>
          <Tag className="category-tag" key={c.name}>
            <b>{c.name}(</b>
            <span className="cost"> ${c.cost}</span>
            <b> {"-> "}</b>
            <span className="price">${c.price}</span>
            <b> )</b>
          </Tag>
        </div>
      );
    });
  else
    return value.map((c) => {
      let className = isCategoryUpdated(c, prev) ? "" : "updated-value";
      return (
        <div className={className}>
          <Tag className="category-tag" key={c.name}>
            <b>{c.name}(</b>
            <span className="cost"> ${c.cost}</span>
            <b> {"-> "}</b>
            <span className="price">${c.price}</span>
            <b> )</b>
          </Tag>
        </div>
      );
    });
}

function matchCountry(value, item) {
  const prev = item.prev?.country?.code;
  const curr = value.code;
  if (!prev || prev === curr)
    return curr === "INT" ? (
      <GlobalOutlined className="flag" />
    ) : (
      <ReactCountryFlag className="flag" countryCode={curr} svg />
    );

  if (item.showPrev)
    return (
      <div className="previous-value">
        {prev === "INT" ? (
          <GlobalOutlined className="flag" />
        ) : (
          <ReactCountryFlag className="flag" countryCode={prev} svg />
        )}
      </div>
    );
  else
    return (
      <div className="updated-value">
        {curr === "INT" ? (
          <GlobalOutlined className="flag" />
        ) : (
          <ReactCountryFlag className="flag" countryCode={curr} svg />
        )}
      </div>
    );
}

function matchDate(value, item) {
  const curr = calculateYearsAndMonthsPassed(value);
  if (!item.prev) return curr;
  const prev = calculateYearsAndMonthsPassed(item.prev.age);
  if (prev === curr) return curr;
  if (item.showPrev) return <div className="previous-value">{prev}</div>;
  else return <div className="updated-value">{curr}</div>;
}

export const IMPORT_WEBSITE_COLUMNS = [
  {
    title: "Website",
    dataIndex: "url",
    key: "url",
  },
  {
    title: "DA",
    key: "da",
    dataIndex: "da",
    className: "text-center",
    render: (value, item) => matchValues(value, item, "da"),
  },
  {
    title: "DR",
    key: "dr",
    dataIndex: "dr",
    className: "text-center",
    render: (value, item) => matchValues(value, item, "dr"),
  },
  {
    title: "Traffic",
    key: "traffic",
    dataIndex: "traffic",
    className: "text-center",
    render: (value, item) => matchValues(value, item, "traffic"),
  },
  {
    title: "Links",
    key: "links",
    dataIndex: "links",
    className: "text-center",
    render: (value, item) => matchValues(value, item, "links"),
  },
  {
    title: "Country",
    key: "country",
    dataIndex: "country",
    className: "text-center",
    render: matchCountry,
  },

  {
    title: "Spam Score",
    key: "spam",
    dataIndex: "spam",
    className: "text-center",
    render: (value, item) => matchValues(value, item, "spam"),
  },
  {
    title: "Age",
    key: "age",
    dataIndex: "age",
    className: "text-center",
    render: matchDate,
  },

  {
    title: "Categories",
    key: "categories",
    dataIndex: "categories",
    className: "categories-cell",
    render: matchCategories,
  },
  {
    title: "Vendor",
    key: "vendor",
    dataIndex: "vendor",
    className: "text-center",
    render: (value, item) => matchValues(value, item, "vendor"),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    className: "text-center",
    render: matchStatus,
  },
];
