import React from "react";
import { Button, message } from "antd";
import { updateData } from "../../api/updateApi";

const UpdateButton = ({ onUpdate }) => {
  const handleUpdate = async () => {
    try {
      const response = await updateData();
      message.success(response.message);
      onUpdate();
    } catch (error) {
      message.error("Update failed.");
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleUpdate}
      style={{
        padding: "10px 15px",
        cursor: "pointer",
        backgroundColor: "green",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
      }}
    >
      Update Data
    </Button>
  );
};

export default UpdateButton;
