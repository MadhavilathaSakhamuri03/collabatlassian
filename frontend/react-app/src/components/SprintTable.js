import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Ensure re-fetching
import DateFormator from "./DateFormat"

const SprintTable = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Detect URL changes
  const [sprintData, setSprintData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSprintData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/sprint-data");
        setSprintData(response.data.data);
      } catch (err) {
        console.error("Error fetching sprint data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSprintData();
  }, [location.pathname]); // ✅ Fetch data when route changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  const columns = [
    { title: "Sprint Name", dataIndex: "sprintName", key: "sprintName" },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <DateFormator date={text} />
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <DateFormator date={text} />
    },
    {
      title: "Issue Count",
      dataIndex: "issueCount",
      key: "issueCount",
      render: (text, record) => (
        <button
          onClick={() => navigate(`/issues?sprintId=${record.sprintId}`)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
            padding: 0,
            fontSize: "inherit",
          }}
        >
          {text}
        </button>
      ),
    },
    { title: "Story Count", dataIndex: "storyCount", key: "storyCount" },
    {
      title: "Bug Count",
      dataIndex: "bugCount",
      key: "bugCount",
      render: (text, record) => {
        if (text === 0) {
          return <span>{text}</span>; // ✅ Just show plain text if count is 0
        }
    
        return (
          <button
            onClick={() => navigate(`/bugs?sprintId=${record.sprintId}`)}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
              padding: 0,
              fontSize: "inherit",
            }}
          >
            {text}
          </button>
        );
      }
    }
    
       
  ];

  return <Table columns={columns} dataSource={sprintData} />;
};

export default SprintTable;
