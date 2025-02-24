import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { useSearchParams } from "react-router-dom";

const IssuesTable = ({ selectedView }) => {
  const [issuesData, setIssuesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const sprintId = searchParams.get("sprintId");

  useEffect(() => {
    const fetchIssuesData = async () => {
      setLoading(true);
      try {
        let url =
          selectedView === "bugs"
            ? "http://localhost:5000/api/bugs-data" // ✅ Fetch bugs
            : "http://localhost:5000/api/issue-data"; // ✅ Fetch issues

            if(sprintId)
              url += `?sprintId=${sprintId}`;
        
        const response = await axios.get(url);
        setIssuesData(response.data.data);
      } catch (err) {
        console.error("Error fetching issues data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuesData();
  }, [selectedView]); // ✅ Refetch data when selectedView changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const columns = [
    { title: "Issue ID", dataIndex: "issueId", key: "issueId" },
    { title: "Issue key", dataIndex: "issueKey", key: "issueKey" },
    { title: "Issue Title", dataIndex: "issueTitle", key: "issueTitle" },
    { title: "Issue Type", dataIndex: "issueType", key: "issueType" },
    { title: "Status", dataIndex: "issueStatus", key: "issueStatus" },
    { title: "Status", dataIndex: "sprintName", key: "sprintName" },
    { title: "Assignee", dataIndex: "assignee", key: "assignee" },
  ];

  return (
    <div>
      <h1>{selectedView === "bugs" ? "Bug Issues" : "All Issues"}</h1>
      <Table dataSource={issuesData} columns={columns} />
    </div>
  );
};

export default IssuesTable;
