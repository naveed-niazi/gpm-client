import {
  FileOutlined,
  LinkOutlined,
  GlobalOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export const WEBSITE_FILTER = {
  price: ["0", "1000"],
  traffic: "All",
  extension: "all",
  da: [0, 100],
  dr: [0, 100],
  category: "all",
  country: "all",
  spam: [0, 100],
  search: "",
};

export const CUSTOMER_FILTER = {
  view: "All", //Values: ["All","Active","Disabled"]
  search: "",
};

export const ORDER_FILTER = {
  view: "All", //Values: ["All","Pending","Completed"]
  search: "",
};

export const URGENT_FEE = 30;
export const CONTENT_CHARGES = 15;

export const PLATFORM_FEE = 0;
export const ORDER_STATUS = {
  PENDING: "PENDING",
  IN_PROCESS: "IN_PROCESS",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
};

export const ARTICLE_STATUS = {
  PENDING: "PENDING",
  IN_WRITING: "IN_WRITING",
  SUBMITTED: "SUBMITTED",
  PUBLISHED: "PUBLISHED",
};

//POP CONFIRM TEXT WHEN THE USER CLICKS ON DELETE ARTICLE
export const ARTICLE_DELETE = "Are you sure to delete this article?";
export const WEBSITE_DELETE =
  "Each website in order must have atleast one article. Deleting this article would remove this website from your cart. Are you sure to delete this website?";

export const CONTENT_TYPES = {
  CUSTOM_REQUEST: "custom_request",
  USER_UPLOAD: "user_upload",
};

export const DELIVERY_TYPE = {
  STANDARD: {
    label: "Standard",
    description: "Order will deliver in 15 working days",
  },
  URGENT: {
    label: "Urgent",
    description: `Order will deliver in 3 working days ($${URGENT_FEE} extra will be charged)`,
  },
};

export const WEBSITE_TRAFFIC_OPTIONS = {
  All: [0, Infinity],
  "0 - 1000": [0, 1000],
  "1K - 5K": [1000, 5000],
  "5K - 10K": [5000, 10000],
  "10K - 100K": [10000, 100000],
  "100K - 1M": [100000, 1000000],
  "1M+": [1000000, Infinity],
};

export const WEBSITE_EXTENTSIONS_OPTIONS = [
  ".com",
  ".co.uk",
  ".pk",
  ".co",
  ".gov",
  "info",
];

export const WEBSITE_TOOLTIPS = {
  da: (
    <p>
      <b>Domain Authority (DA)</b> is a search engine ranking score developed by
      Moz that predicts how likely a website is to rank in search engine result
      pages (SERPs).
    </p>
  ),
  dr: (
    <p>
      <b>Domain Rating (DR)</b> is an Ahrefs metric that shows the relative
      strength of a website's backlink profile.
    </p>
  ),
  traffic: (
    <p>
      <b>Traffic</b> refers to number of visitors to a website per month.
    </p>
  ),
  links: (
    <p>
      <b>Links</b> refers to the total number of allowed links in each guest
      post.
    </p>
  ),
  country: (
    <p>
      <b>Country (Co.)</b> refers to the country where this website is
      operational. Global (<GlobalOutlined />) refers to the website that is
      internationally used.
    </p>
  ),
  spam: (
    <p>
      <b>Spam Score</b> is another tool developed by Moz to determine which
      websites are “spammy” and which are trustworthy.
    </p>
  ),
  age: (
    <p>
      <b>Domain Age</b> refers to the amount of time during which a domain name
      has existed.
    </p>
  ),
  category: (
    <p>
      <b>Category</b> refers to list of niches/genre supported by a website.
    </p>
  ),
  price: (
    <p>
      <b>Price:</b> Sum of money to post a single article on a website. Price
      may vary depending on the category you have selected.
    </p>
  ),
};
