import React, { useState, useEffect } from "react";
import SyncButton from "../components/Table/SyncButton";
import DataTable from "../components/Table/DataTable";
import axios from "axios";
import UpdateButton from "../components/Table/UpdateButton";
import Menu from "../components/Menu";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Uncomment this if you want to fetch sync data
      // const response = await axios.get('http://localhost:5000/api/sync-data');
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const updateData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/update-data");
      setData(response.data?.data || []);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // fetchData();
    // updateData();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Menu */}
      {/* <Menu /> */}

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {/* Button Container */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <SyncButton onSync={fetchData} />
          <UpdateButton onUpdate={updateData} />
        </div>

        {/* Data Table */}
        {/* <DataTable data={data} loading={loading} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
