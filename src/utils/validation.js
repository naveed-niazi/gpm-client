import moment from "moment";
import { WEBSITE_CATEGORIES } from "./samples/categories";
import { COUNTRIES } from "./samples/countries";
import { ORDER_STATUS } from "./constants";

export const matchRange = (value, range) => {
  if (range && Array.isArray(range)) {
    return value <= range[1] && value >= range[0];
  }
  return true;
};

export const matchString = (value, target) => {
  if (target && target !== "all") return value === target;
  return true;
};

export const matchCategory = (categories, target) => {
  if (target && target !== "all") {
    return categories.find((category) => category.name === target);
  }
  return true;
};

export const matchStatus = (view, status) => {
  if (view === "All") return true;
  if (view === "Active" && status) return true;
  if (view === "Disabled" && !status) return true;
  return false;
};

export const matchOrderStatus = (view, status) => {
  switch (view) {
    case "All":
      return true;
    case "In_Process":
      return status === ORDER_STATUS.IN_PROCESS;
    case "Pending":
      return status === ORDER_STATUS.PENDING;
    case "Completed":
      return status === ORDER_STATUS.COMPLETED;
    case "Rejected":
      return status === ORDER_STATUS.REJECTED;
    default:
      return true;
  }
};

export const searchString = (value, searchText) => {
  if (searchText && searchText !== "") {
    return value.toLowerCase().includes(searchText.toLowerCase());
  }
  return true;
};

export function isUrlValid(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
}

export function isScoreValid(score) {
  return Number.isInteger(score) && score <= 100 && score >= 0;
}

export function isAgeValid(age) {
  return moment(age, "YYYY-MM-DD", true).isValid();
}

export function parseCategories(website) {
  let categories = [];
  website.categories.split(/],|]/).map((category) => {
    let splitValues = category.split(/\[|,/);
    if (splitValues.length === 3) {
      const name = splitValues[0].trim();
      const cost = Math.abs(splitValues[1]);
      const price = Math.abs(splitValues[2]);

      let isNameValid = WEBSITE_CATEGORIES.findIndex((e) => e === name) != -1;
      let isCostValid = !isNaN(cost);
      let isPriceValid = !isNaN(price);

      if (isNameValid && isCostValid && isPriceValid)
        categories.push({
          name,
          cost,
          price,
        });
    }
  });
  if (categories.length < 1) return false;
  else website.categories = categories;
  return true;
}
export function isCountryValid(website) {
  if (typeof website.country === "string") {
    let countryIndex = Object.values(COUNTRIES).findIndex(
      (c) => c === website.country.trim()
    );
    if (countryIndex != -1) {
      website.country = {
        name: Object.values(COUNTRIES)[countryIndex],
        code: Object.keys(COUNTRIES)[countryIndex],
      };
      return true;
    }
  }
  return false;
}

export function isStatusValid(website) {
  const { status } = website;
  if (
    typeof status === "string" &&
    (status === "Blocked" || status === "Active")
  ) {
    website.status = status === "Active" ? true : false;
    return true;
  } else return false;
}

export function isTrafficValid(traffic) {
  return Number.isInteger(traffic) && traffic >= 0;
}
