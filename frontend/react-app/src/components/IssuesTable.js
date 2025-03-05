import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Card, List, Select } from "antd";
import { useSearchParams } from "react-router-dom";

const IssuesTable = ({ selectedView, title }) => {
  const [issuesData, setIssuesData] = useState([]); 
  const [filteredIssuesData, setFilteredIssuesData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const sprintId = searchParams.get("sprintId");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const [sprints, setSprints] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState(null);

  const [issueTypes, setIssueTypes] = useState([]);
  const [selectedIssueType, setSelectedIssueType] = useState(null);

  useEffect(() => {
    const fetchIssuesData = async () => {
      setLoading(true);
      try {
        let url =
          selectedView === "bugs"
            ? "http://localhost:5000/api/bugs-data"
            : "http://localhost:5000/api/issue-data";

        if (sprintId) url += `?sprintId=${sprintId}`;

        const response = await axios.get(url);
        const fetchedData = response.data.data;

        setIssuesData(fetchedData);
        setFilteredIssuesData(fetchedData);

       
        const uniqueIssueTypes = [
          ...new Set(fetchedData.map((issue) => issue.issueType)),
        ].map((type) => ({ value: type, label: type }));

       
        const uniqueSprints = [
          ...new Set(fetchedData.map((issue) => issue.sprintName)),
        ].map((sprint) => ({ value: sprint, label: sprint }));

        setSprints(uniqueSprints);
        setIssueTypes(uniqueIssueTypes);
      } catch (err) {
        console.error("Error fetching issues data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuesData();
  }, [selectedView, sprintId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const showModal = (record) => {
    setSelectedIssue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedIssue(null);
  };

  
  const applyFilters = (issueType, sprint) => {
    let filteredData = issuesData;

    if (issueType) {
      filteredData = filteredData.filter((issue) => issue.issueType === issueType);
    }

    if (sprint) {
      filteredData = filteredData.filter((issue) => issue.sprintName === sprint);
    }

    setFilteredIssuesData(filteredData);
  };

  
  const handleIssueTypeChange = (value) => {
    setSelectedIssueType(value);
    applyFilters(value, selectedSprint);
  };

  
  const handleSprintChange = (value) => {
    setSelectedSprint(value);
    applyFilters(selectedIssueType, value);
  };

  const columns = [
    { title: "Issue ID", dataIndex: "issueId", key: "issueId" },
    { title: "Issue Key", dataIndex: "issueKey", key: "issueKey" },
    { title: "Issue Title", dataIndex: "issueTitle", key: "issueTitle" },
    { title: "Issue Type", dataIndex: "issueType", key: "issueType" },
    { title: "Status", dataIndex: "issueStatus", key: "issueStatus" },
    { title: "Sprint", dataIndex: "sprintName", key: "sprintName" },
    { title: "Assignee", dataIndex: "assignee", key: "assignee" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => showModal(record)}
          disabled={!record.subtaskDetails.length > 0}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-xl not-italic p-[10px]">{title}</h1>

      {/* Issue Type Dropdown */}
      <Select
        placeholder="Select Issue Type"
        className="w-[200px] mb-2.5 mr-2.5"
        onChange={handleIssueTypeChange}
        options={issueTypes}
        allowClear
      />

      {/* Sprint Dropdown */}
      <Select
        placeholder="Select Sprint"
        className="w-[200px] mb-2.5"
        onChange={handleSprintChange}
        options={sprints}
        allowClear
      />

      <div>
        <Table dataSource={filteredIssuesData} columns={columns} />
        <Modal
          title="Issue Details"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
          ]}
          width={700}
        >
          {selectedIssue && (
            <>
              {selectedIssue.subtaskDetails &&
                selectedIssue.subtaskDetails.length > 0 && (
                  <Card title="Subtasks">
                    <List
                      dataSource={selectedIssue.subtaskDetails}
                      renderItem={(subtask) => (
                        <List.Item>
                          <Card className="w-full">
                            <p>
                              <strong>Subtask ID:</strong> {subtask.id}
                            </p>
                            <p>
                              <strong>Issue Key:</strong> {subtask.key}
                            </p>
                            <p>
                              <strong>Summary:</strong> {subtask.fields?.summary}
                            </p>
                            <p>
                              <strong>Type:</strong> {subtask.issuetype?.name}
                            </p>
                            <p>
                              <strong>Priority:</strong> {subtask.priority?.name}
                            </p>
                            <p>
                              <strong>Status:</strong> {subtask.status?.name}
                            </p>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </Card>
                )}
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default IssuesTable;
