import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import ProfilePhoto from "./ProfilePhoto";
import ProfileForm from "./ProfileForm";
import "./Profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <h2 className="title">Profile Settings</h2>
      <Row>
        <Col span={14}>
          <ProfileForm />
        </Col>
        <Col span={10}>
          <ProfilePhoto />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
