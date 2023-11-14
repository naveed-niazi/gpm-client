import { Table, Timeline, Breadcrumb, Descriptions, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Content from "../../components/Content";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/orderViewReducer";
import { ORDER_ITEMS_COLUMN } from "../../utils/columns";
import WebsiteForm from "../../components/WebsiteForm/WebsiteForm";
import "./AddWebsite.scss";

const AddWebsite = () => {
  const { websiteId } = useParams();
  const websiteList = useSelector((state) => state.website.data);
  const [website, setWebsite] = useState({});

  useEffect(() => {
    let index = websiteList.findIndex((e) => e.id === websiteId);
    setWebsite(websiteList[index]);
  }, [websiteId]);

  return (
    <div className="add-website">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/websites">Websites</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Website#{websiteId}</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="heading">Add Website</h2>
      <WebsiteForm />
    </div>
  );
};

export default AddWebsite;
