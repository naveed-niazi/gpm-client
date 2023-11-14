import React from "react";
import { Button } from "antd";
import { HomeFilled } from "@ant-design/icons";
import "../styles/Home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-btn" onClick={() => navigate("/")}>
      <HomeFilled />
      HOME
    </div>
  );
};

export default Home;
