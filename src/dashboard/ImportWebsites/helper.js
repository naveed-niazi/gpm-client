import * as XLSX from "xlsx";
import {
  isScoreValid,
  isStatusValid,
  isTrafficValid,
  isCountryValid,
  parseCategories,
  isAgeValid,
  isUrlValid,
} from "../../utils/validation";

const fileTypeValidation = (type) => {
  return (
    type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    type === "text/csv" ||
    type === "application/vnd.ms-excel"
  );
};

export const parseFile = async (info) => {
  return new Promise((resolve, rejected) => {
    if (info.file.status === "uploading") {
      // validate file type
      if (fileTypeValidation(info.file.type)) {
        let fileReader = new FileReader();
        fileReader.onload = async (event) => {
          let workbook = XLSX.read(event.target.result, { type: "binary" });
          let fileData = [];
          //parse each sheet of excel to collect the data
          workbook.SheetNames.map((sheet) => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );
            fileData = [...fileData, ...rowObject];
          });

          resolve({ fileData, originalFile: info.file.originFileObj });
        };
        fileReader.readAsBinaryString(info.file.originFileObj);
      } else
        rejected({
          msgType: "ERROR",
          title: "Invalid File Format",
          message: `The file format is not supported.`,
        });
    }
  }).then((data) => data);
};

const mandtoryFieldsCheck = (fileHeaders) => {
  return (
    fileHeaders["age"] &&
    fileHeaders["categories"] &&
    fileHeaders["country"] &&
    fileHeaders["da"] &&
    fileHeaders["dr"] &&
    fileHeaders["links"] &&
    fileHeaders["spam"] &&
    fileHeaders["status"] &&
    fileHeaders["traffic"] &&
    fileHeaders["url"]
  );
};

export const validateFormat = (fileData) => {
  return new Promise((resolve, rejected) => {
    //check if the file is empty
    if (fileData.length < 1)
      rejected({
        msgType: "error",
        title: "Empty File",
        message: `Uploaded file is empty.`,
      });

    const emptyField = fileData.findIndex((row) => {
      if (!mandtoryFieldsCheck(row)) return true;
    });
    if (emptyField === -1) {
      resolve();
    } else
      rejected({
        msgType: "error",
        title: "Mandatory Fields Missing!",
        message:
          "The import is not successful. Please check the source file for formatting issues. Following fields are mandatory for each website. [age,categories,country,da,dr,links,spam,status,traffic,url]",
      });
  });
};

export const validateValues = (fileData) => {
  const tempFileData = JSON.parse(JSON.stringify(fileData));
  return new Promise((resolve, rejected) => {
    let error = {};
    let validationResult = tempFileData.every((website, index) => {
      //validate url
      if (!isUrlValid(website.url)) {
        error = {
          row: index + 1,
          field: "URL",
          message: `[${website.url}] is not a valid URL.`,
        };
        return false;
      }

      //validate DA
      if (!isScoreValid(website.da)) {
        error = {
          row: index + 1,
          field: "DA",
          message: `[${website.da}] is not a valid score. Value for this field should range in between 0-100.`,
        };
        return false;
      }

      //validate DR
      if (!isScoreValid(website.dr)) {
        error = {
          row: index + 1,
          field: "DR",
          message: `[${website.dr}] is not a valid score. Value for this field should range in between 0-100.`,
        };
        return false;
      }

      //validate Spam Score
      if (!isScoreValid(website.spam)) {
        error = {
          row: index + 1,
          field: "Spam Score",
          message: `[${website.spam}] is not a valid score. Value for this field should range in between 0-100.`,
        };
        return false;
      }

      //validate Links
      if (!isScoreValid(website.links)) {
        error = {
          row: index + 1,
          field: "Links",
          message: `[${website.da}] is not a valid score. Value for this field should range in between 0-100.`,
        };
        return false;
      }

      //validate Age
      if (!isAgeValid(website.age)) {
        error = {
          row: index + 1,
          field: "Age",
          message: `[${website.age}] is not a valid age. Value for this field should follow the format YYYY-MM-DD.`,
        };
        return false;
      }

      //validate Traffic
      if (!isTrafficValid(website.traffic)) {
        error = {
          row: index + 1,
          field: "Traffic",
          message: `[${website.traffic}] is not a valid value. Value for this field should range in between 0-Infinity.`,
        };
        return false;
      }
      //validate Traffic
      if (!isStatusValid(website)) {
        error = {
          row: index + 1,
          field: "Status",
          message: `[${website.status}] is not a valid status. Value for this field could be either Blocked or Active.`,
        };
        return false;
      }

      //validate country
      if (!isCountryValid(website)) {
        error = {
          row: index + 1,
          field: "Country",
          message: `[${website.country}] is not a valid country name. Please check available countries in import guideline.`,
        };
        return false;
      }

      //validate categories
      if (!parseCategories(website)) {
        error = {
          row: index + 1,
          field: "Categories",
          message: `[${website.categories}] is not a valid category format. Make sure you're following the specified format: "category_name[cost,retail_price],category_name[cost,retail_price],.." .Validate 'category_name from the available categories list in import guideline.`,
        };
        return false;
      }

      return true;
      //
    });

    if (validationResult) resolve(tempFileData);
    else
      rejected({
        msgType: "error",
        title: `Error in Row: ${error.row}. Invalid '${error.field}' value!`,
        message: error.message,
      });
  });
};

export const groupOldNew = async (fileData, websites) => {
  let websitesObj = {};
  websites.map((e) => {
    let url = new URL(e.url);
    websitesObj[url.hostname] = e;
  });
  let new_websites = [];
  let old_websites = [];
  await fileData.map((website) => {
    let url = new URL(website.url);
    if (websitesObj[url.hostname])
      old_websites.push({ ...website, prev: websitesObj[url.hostname] });
    else new_websites.push(website);
  });

  return { new_websites, old_websites };
};
