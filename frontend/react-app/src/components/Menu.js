import React, { useState } from "react";
import { Menu } from "antd";
import { CalendarOutlined, MailOutlined, BugOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { key: "sprint", icon: <CalendarOutlined />, label: "Sprint" },
  { key: "issues", icon: <MailOutlined />, label: "Issues" },
  { key: "bugs", icon: <BugOutlined />, label: "Bugs" },
];

const MenuItems = ({ setSelectedView }) => {
  const [selectedKey, setSelectedKey] = useState("sprint");
  const navigate = useNavigate();

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
    setSelectedView(e.key); // ✅ Update parent state to track selected menu

    if (e.key === "sprint") {
      navigate("/sprint");
    } else if (e.key === "issues") {
      navigate("/issues");
    } else if (e.key === "bugs") {
      navigate("/bugs");
    }
  };

  return (
    <Menu
      style={{ width: 256 }}
      selectedKeys={[setSelectedKey]}
      onClick={onMenuClick}
      items={menuItems}
    />
  );
};

export default MenuItems;
