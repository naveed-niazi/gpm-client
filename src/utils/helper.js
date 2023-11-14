import {
  CONTENT_CHARGES,
  CONTENT_TYPES,
  DELIVERY_TYPE,
  URGENT_FEE,
} from "./constants";
import moment from "moment";
const XLSX = require("xlsx");
export function capitalizeFirstCharacter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateYearsAndMonthsPassed(startDate) {
  const currentDate = new Date();
  const start = new Date(startDate);

  const yearsPassed = currentDate.getFullYear() - start.getFullYear();
  const monthsPassed = (currentDate.getMonth() - start.getMonth() + 12) % 12;

  return `${yearsPassed}y ${monthsPassed}m`;
}

export const waitFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Data loaded successfully!";
      resolve(data);
    }, 1000);
  });
};

export function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

export const downloadFile = (file) => {
  var link = document.createElement("a");
  link.href = file.data;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const calcWebsitePrice = (website) => {
  let price = 0;
  website.articles.forEach((element) => {
    price += calcArticlePrice(element);
  });
  return price;
};

export const formatDate = (date) => moment(date).format("YYYY-MM-DD hh:mm A");

export const calcArticlePrice = (article) => {
  let price = article.price;

  //add urgent delivery charges
  if (article.delivery_type === DELIVERY_TYPE.URGENT.label) price += URGENT_FEE;

  //add custom content charges
  if (article.content_type === CONTENT_TYPES.CUSTOM_REQUEST)
    price += CONTENT_CHARGES;

  return price;
};

export const calcTotalPrice = (cart) => {
  let price = 0;
  Object.values(cart).forEach((website) => {
    price += calcWebsitePrice(website);
  });

  return price;
};

export function downloadExcel(data, fileName) {
  console.log("data", data);
  console.log("fileName", fileName);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export const findMinPrice = (arr) =>
  arr.reduce((min, obj) => {
    return obj.price < min ? obj.price : min;
  }, Infinity);
