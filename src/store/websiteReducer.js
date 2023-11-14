import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findMinPrice, waitFunction } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import {
  matchRange,
  matchCategory,
  matchString,
  searchString,
} from "../utils/validation";

import { useDispatch } from "react-redux";
import {
  CONTENT_TYPES,
  DELIVERY_TYPE,
  WEBSITE_FILTER,
  WEBSITE_TRAFFIC_OPTIONS,
} from "../utils/constants";
import { WEBSITES_LIST } from "../utils/samples/website";

const fetchWebsites = createAsyncThunk(
  "website/fetchWebsites",
  async (test, thunkAPI) => {
    try {
      const test = await waitFunction();
      const response = WEBSITES_LIST.map((website) => ({
        ...website,
        price: findMinPrice(website.categories),
      }));
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const websiteSlice = createSlice({
  name: "website",
  initialState: {
    data: [],
    loading: false,
    error: "",
    cart: {},
    categories: [],
    articleEdit: null,
    countries: [],
    isApplyFilter: false,
    filterVisible: true,
    filters: WEBSITE_FILTER,
    filterResult: [],
  },
  reducers: {
    addCart: (state, action) => {
      let website = action.payload;
      const allowedLinks = parseInt(website.links);

      const links = Array.from({ length: allowedLinks }, (_, index) => ({
        id: "link_" + website.id + index,
        key: "link_" + website.id + index,
        link_no: index + 1,
        target_url: "",
        anchor_text: "",
      }));

      state.cart[website.id] = {
        ...website,
        articles: [
          {
            id: uuidv4(),
            websiteId: website.id,
            links,
            category: website.categories[0].name,
            price: website.categories[0].price,
            content_type: CONTENT_TYPES.CUSTOM_REQUEST,
            delivery_type: DELIVERY_TYPE.STANDARD.label,
          },
        ],
      };
    },
    removeCart: (state, action) => {
      delete state.cart[action.payload.id];
    },
    setArticleEdit: (state, action) => {
      state.articleEdit = action.payload;
    },
    updateArticle: (state, action) => {
      const { article, updatedValues, updatedLinks } = action.payload;
      const website = state.cart[article.websiteId];
      const articleIndex = website.articles.findIndex(
        (e) => e.id === article.id
      );

      //convert article links from FORM VALUES to ARRAY
      let tempArticle = JSON.parse(JSON.stringify(article));
      tempArticle.links.map((e) => {
        e.target_url = updatedLinks["target_url" + e.link_no];
        e.anchor_text = updatedLinks["anchor_text" + e.link_no];
      });

      const categoryIndex = website.categories.findIndex(
        (e) => e.name === updatedValues.category
      );

      //update the current article
      website.articles[articleIndex] = {
        ...updatedValues,
        links: tempArticle.links,
        price: website.categories[categoryIndex].price,
      };

      //on success update
      state.articleEdit = null;
    },

    addArticle: (state, action) => {
      let websiteId = action.payload;
      const website = state.cart[websiteId];
      const allowedLinks = parseInt(website.links);

      const links = Array.from({ length: allowedLinks }, (_, index) => ({
        id: "link_" + websiteId + index,
        key: "link_" + websiteId + index,
        link_no: index + 1,
        target_url: "",
        anchor_text: "",
      }));
      const newArticle = {
        id: uuidv4(),
        websiteId: website.id,
        links,
        category: website.categories[0].name,
        price: website.categories[0].price,
        content_type: CONTENT_TYPES.CUSTOM_REQUEST,
        delivery_type: DELIVERY_TYPE.STANDARD.label,
      };
      website.articles.push(newArticle);
    },
    deleteArticle: (state, action) => {
      const article = action.payload;
      const website = state.cart[article.websiteId];
      const articleIndex = website.articles.findIndex(
        (e) => e.id === article.id
      );
      if (website.articles.length > 1) website.articles.splice(articleIndex, 1);
      else delete state.cart[website.id];
    },
    applyFilter: (state, action) => {
      state.isApplyFilter = true;
      let websiteList = JSON.parse(JSON.stringify(state.data));
      const {
        price,
        da,
        category,
        country,
        search,
        traffic,
        extension,
        dr,
        spam,
      } = action.payload;

      websiteList = websiteList.filter(
        (website) =>
          matchRange(website.price, price) &&
          matchRange(website.da, da) &&
          matchRange(website.dr, dr) &&
          matchRange(website.spam, spam) &&
          matchRange(website.traffic, WEBSITE_TRAFFIC_OPTIONS[traffic]) &&
          matchCategory(website.categories, category) &&
          matchString(website.country.name, country) &&
          searchString(website.url, search) &&
          matchString(website.extension, extension)
      );
      state.filters = action.payload;
      state.filterResult = websiteList;
    },
    resetFilter: (state, action) => {
      state.filters = { ...WEBSITE_FILTER, search: state.filters.search };
      state.isApplyFilter = false;
    },
    setFilterVisible: (state, action) => {
      state.filterVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWebsites.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWebsites.fulfilled, (state, action) => {
      //set the websites list into data
      state.data = action.payload;

      // get the unqiue categories from website list
      const uniqueCategories = new Set();
      action.payload.forEach((item) => {
        item.categories.forEach((category) => {
          uniqueCategories.add(category.name);
        });
      });
      const uniqueCategoriesArray = Array.from(uniqueCategories).sort();

      //get the unique countries in the website lists
      const uniqueCountries = {};
      action.payload.forEach((item) => {
        uniqueCountries[item.country.code] = item.country.name;
      });
      const sortedCountries = Object.fromEntries(
        Object.entries(uniqueCountries).sort((a, b) => a[0].localeCompare(b[0]))
      );

      state.categories = uniqueCategoriesArray;
      state.countries = sortedCountries;

      state.loading = false;
    });
    builder.addCase(fetchWebsites.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// this is for dispatch
export const {
  addCart,
  removeCart,
  setArticleEdit,
  setFilterVisible,
  updateArticle,
  resetFilter,
  addArticle,
  deleteArticle,
  closeFilters,
  applyFilter,
} = websiteSlice.actions;
export { fetchWebsites };

// this is for configureStore
export default websiteSlice.reducer;
