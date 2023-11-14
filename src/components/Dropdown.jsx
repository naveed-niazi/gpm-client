import React, { useState, useEffect } from "react";
import { Avatar, Button, Space, Dropdown, Menu } from "antd";
import {
  LaptopOutlined,
  SearchOutlined,
  UserOutlined,
  DownOutlined,
  SmileOutlined,
  ShoppingCartOutlined,
  BellFilled,
  DownloadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./styles/Dropdown.scss";

const CustomDropdown = ({
  props,
  children,
  items,
  className,
  DropdownWrapper,
}) => {
  const dropdownRender = (menu) => {
    if (DropdownWrapper) {
      return <DropdownWrapper>{menu}</DropdownWrapper>;
    } else return menu;
  };
  const [active, setActive] = useState(false);
  return (
    <Dropdown
      trigger="click"
      overlayClassName={"custom-dropdown " + className}
      onOpenChange={setActive}
      menu={{
        items,
      }}
      placement="bottom"
      dropdownRender={dropdownRender}
    >
      <div
        className={`custom-dropdown-child ${
          active ? "custom-dropdown-child-active" : ""
        }`}
      >
        {children}
      </div>
    </Dropdown>
  );
};

export default CustomDropdown;
