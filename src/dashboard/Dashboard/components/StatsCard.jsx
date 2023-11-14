import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import "./StatsCard.scss";

const StatsCard = ({ title, icon, prefix, grow }) => {
  return (
    <Col span={6}>
      <div className="stats-card">
        <div className="header">
          <Statistic title={title} value={112893} prefix={prefix} />
          <div className="icon">{icon}</div>
        </div>

        <div className="history">
          {grow ? <RiseOutlined /> : <FallOutlined />}
          {grow ? <p className="grow">1.4%</p> : <p className="fall">1.4%</p>}

          <p className="text">Since last week</p>
        </div>
      </div>
    </Col>
  );
};

export default StatsCard;
