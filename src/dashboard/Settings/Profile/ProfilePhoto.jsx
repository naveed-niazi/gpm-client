import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Button, Menu, Image, Upload, Avatar } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import profileImg from "../../../assets/profile.jpg";
import "./ProfilePhoto.scss";
import { getBase64 } from "../../../utils/helper";

const ProfilePhoto = () => {
  const [profilePicture, setProfilePicture] = useState(profileImg);

  return (
    <div className="profile-photo">
      <div className="avatar">
        <Image rounded width={200} src={profilePicture} />
      </div>
      <div className="actions">
        <ImgCrop
          showGrid
          cropShape="round"
          modalTitle="Upload Profile Photo"
          modalOk="Save"
        >
          <Upload
            showUploadList={false}
            action={(file) => {
              console.log("upload action is called", file);
              return false;
            }}
            customRequest={({ file, data, onSuccess }) => {
              console.log("custom reqiest is called", file);
              getBase64(file, (imageUrl) => setProfilePicture(imageUrl));

              onSuccess();
            }}
          >
            <Button type="primary">Upload Photo</Button>
          </Upload>
        </ImgCrop>
        <Button>Remove</Button>
      </div>
    </div>
  );
};

export default ProfilePhoto;
