import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import websiteReducer from "./websiteReducer";
import ordersReducer from "./ordersReducer";
import orderViewReducer from "./orderViewReducer";
import customerReducer from "./customerReducer";
import importReducer from "./importReducer";
export default configureStore({
  reducer: {
    auth: authReducer,
    website: websiteReducer,
    orders: ordersReducer,
    orderView: orderViewReducer,
    customers: customerReducer,
    importWebsites: importReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
