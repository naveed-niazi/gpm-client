import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import DashboardLayout from "./dashboard/layout/Layout";
import Login from "./pages/Login/Login";
import Websites from "./dashboard/Websites/Websites";
import Orders from "./dashboard/Orders/Orders";
import store from "./store/store";
import OrderView from "./dashboard/OrderView/OrderView";
import Settings from "./dashboard/Settings/Settings";
import Customers from "./dashboard/Customers/Customers";
import Email from "./dashboard/Email/Email";
import Pricing from "./dashboard/Pricing/Pricing";
import EditWebsite from "./dashboard/EditWebsite/EditWebsite";
import AddWebsite from "./dashboard/AddWebsite/AddWebsite";
import ImportWebsites from "./dashboard/ImportWebsites/ImportWebsites";
import Dashboard from "./dashboard/Dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {" "}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="customers" element={<Customers />} />
            <Route path="websites" element={<Websites />} />
            <Route path="websites/:websiteId" element={<EditWebsite />} />
            <Route path="websites/new" element={<AddWebsite />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="email" element={<Email />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderView />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="import" element={<ImportWebsites />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
