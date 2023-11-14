import { Table, Timeline, Breadcrumb, Descriptions, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./EditWebsite.scss";
import Content from "../../components/Content";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../store/orderViewReducer";
import { ORDER_ITEMS_COLUMN } from "../../utils/columns";
import WebsiteForm from "../../components/WebsiteForm/WebsiteForm";

const WebsiteView = () => {
  const { websiteId } = useParams();
  const websiteList = useSelector((state) => state.website.data);
  const [website, setWebsite] = useState(undefined);

  useEffect(() => {
    let index = websiteList.findIndex((e) => e.id === websiteId);
    console.log("index", index, websiteList);
    setWebsite(websiteList[index]);
  }, [websiteId]);

  return (
    <div className="edit-website">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/websites">Websites</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Website#{websiteId}</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="heading">Edit Website</h2>
      <WebsiteForm defaultValue={website} />
    </div>
  );
};

export default WebsiteView;
