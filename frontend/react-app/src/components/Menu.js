import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { CalendarOutlined, MailOutlined, BugOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { key: "sprint", icon: <CalendarOutlined />, label: "Sprint" },
  { key: "issues", icon: <MailOutlined />, label: "Issues" },
  { key: "bugs", icon: <BugOutlined />, label: "Bugs" },
];

const MenuItems = ({ setSelectedView }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("sprint");

  // Update selectedKey based on the current URL
  useEffect(() => {
    if (location.pathname.includes("issues")) {
      setSelectedKey("issues");
      setSelectedView("issues");
    } else if (location.pathname.includes("bugs")) {
      setSelectedKey("bugs");
      setSelectedView("bugs");
    } else if (location.pathname.includes("sprint")) {
      setSelectedKey("sprint");
      setSelectedView("sprint");
    }
  }, [location.pathname, setSelectedView]);

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
    setSelectedView(e.key); 

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
      className="w-64"
      selectedKeys={[selectedKey]} 
      onClick={onMenuClick}
      items={menuItems}
    />
  );
};

export default MenuItems;
