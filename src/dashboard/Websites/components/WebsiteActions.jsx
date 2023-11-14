import React from "react";
import {
  DeleteOutlined,
  CheckOutlined,
  StopOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Space, Button, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const items = [
  {
    key: "Edit",
    label: "Edit",
    icon: <EditOutlined />,
  },
  {
    key: "Block",
    label: "Block",
    icon: <StopOutlined />,
  },
  {
    key: "Activate",
    label: "Activate",
    icon: <CheckOutlined />,
  },
  {
    key: "Delete",
    label: "Delete",
    icon: <DeleteOutlined />,
  },
];

const renderItems = (record) => {
  if (record.status) return items.filter((item) => item.key !== "Activate");
  return items.filter((item) => item.key !== "Block");
};

const WebsiteActions = ({ record }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.website.cart);
  const dispatch = useDispatch();

  const handleAction = (e) => {
    switch (e.key) {
      case "Edit":
      case "Block":
      case "Activate":
      case "Delete":
        navigate(`/websites/${record.id}`);
      default:
        console.log("unknown action");
    }
    console.log("e", e);
  };

  return (
    <div className="website-actions">
      <div id="action-dropdown">
        <Dropdown
          arrow={true}
          menu={{
            items: renderItems(record),
            onClick: handleAction,
          }}
          placement="bottom"
          getPopupContainer={() => document.getElementById(`action-dropdown`)}
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      </div>
    </div>
  );
};

export default WebsiteActions;
