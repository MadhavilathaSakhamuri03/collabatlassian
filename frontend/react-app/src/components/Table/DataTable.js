import React, { useState } from "react";
import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const DataTable = ({ data, loading }) => {
  const [searchText, setSearchText] = useState("");

  // Handle search filtering
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((record) =>
    record.key.toLowerCase().includes(searchText)
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "issueId",
      key: "issueId",
      filters: data
        ? [...new Set(data.map((item) => item.issueId))].map((value) => ({
            text: value,
            value,
          }))
        : [],
      onFilter: (value, record) => record.issueId === value,
      sorter: (a, b) => a.issueId - b.issueId,
    },
    {
      title: "Title",
      dataIndex: "key",
      key: "key",
      filters: data
        ? [...new Set(data.map((item) => item.key))].map((value) => ({
            text: value,
            value,
          }))
        : [],
      onFilter: (value, record) => record.key.includes(value),
      sorter: (a, b) => a.key.localeCompare(b.key),
    },
    {
      title: "Type",
      dataIndex: "issueType",
      key: "issueType",
      filters: data
        ? [...new Set(data.map((item) => item.issueType))].map((value) => ({
            text: value,
            value,
          }))
        : [],
      onFilter: (value, record) => record.issueType.includes(value),
      sorter: (a, b) => a.issueType.localeCompare(b.issueType),
    },
    {
      title: "PRId",
      dataIndex: "prId",
      key: "prId",
      filters: data
        ? [...new Set(data.map((item) => item.prId))].map((value) => ({
            text: value,
            value,
          }))
        : [],
      onFilter: (value, record) => record.prId === value,
      sorter: (a, b) => a.prId - b.prId,
    },
    {
      title: "PRTitle",
      dataIndex: "prTitle",
      key: "prTitle",
      filters: data
        ? [...new Set(data.map((item) => item.prTitle))].map((value) => ({
            text: value,
            value,
          }))
        : [],
      onFilter: (value, record) => record.prTitle.includes(value),
      sorter: (a, b) => a.prTitle.localeCompare(b.prTitle),
    },
    {
      title: "JSM Id",
      dataIndex: "linkedIssues",
      key: "linkedIssues",
      filters: data
        ? [
            ...new Set(data.flatMap((item) => item.linkedIssues || [])),
          ].map((value) => ({ text: value, value }))
        : [],
      onFilter: (value, record) =>
        record.linkedIssues && record.linkedIssues.includes(value),
      render: (linkedIssues) => (
        <ul>
          {linkedIssues &&
            linkedIssues.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      ),
    },
  ];

  return (
    <div>
      <Input
        placeholder="Search Title"
        prefix={<SearchOutlined />}
        onChange={handleSearch}
        style={{ marginBottom: 10, width: 200 ,pull: 'right'}}
      />
      <Table columns={columns} dataSource={filteredData} loading={loading} />
    </div>
  );
};

export default DataTable;
