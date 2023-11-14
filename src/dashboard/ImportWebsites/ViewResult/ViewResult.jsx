import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { WEBSITE_COLUMNS } from "../../../utils/columns";
import { useSelector } from "react-redux";
import "./ViewResult.scss";
import { IMPORT_WEBSITE_COLUMNS } from "./resultHelper";

const ViewResult = ({ type, setIsModalOpen }) => {
  const [title, setTitle] = useState("");
  const result = useSelector((state) => state.importWebsites.result);
  const [showPrev, setShowPrev] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (type === "NEW") setTitle("New Records");
    else setTitle("Update Records");
  }, [type]);

  return (
    <Modal
      title={title}
      open={true}
      footer={null}
      onCancel={handleCancel}
      className="import-result"
    >
      {type === "OLD" && (
        <p
          className="link"
          onMouseDown={() => setShowPrev(true)}
          onMouseUp={() => setShowPrev(false)}
        >
          show previous values
        </p>
      )}
      <Table
        pagination={{ pageSize: 7 }}
        size="small"
        columns={IMPORT_WEBSITE_COLUMNS}
        dataSource={
          type === "NEW"
            ? result.new
            : showPrev
            ? result.old.map((e) => ({ ...e, showPrev: true }))
            : result.old
        }
        rowClassName={(record) => (!record.status ? "disable-row" : "")}
      />
    </Modal>
  );
};

export default ViewResult;
