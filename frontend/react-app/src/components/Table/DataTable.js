import React from 'react';
import { Table } from 'antd';

const DataTable = ({ data, loading }) => {
  const columns = [
    { title: 'ID', dataIndex: 'issueId', key: 'issueId' },
    { title: 'Title', dataIndex: 'key', key: 'key' },
    {title:  'Type', dataIndex:'issueType', key:'issueType'},
    { title: 'PRId', dataIndex: 'prId', key: 'prId' },
    { title: 'PRTitle', dataIndex: 'prTitle', key: 'prTitle' },
    {
        title:  'JSM Id',
        dataIndex:'linkedIssues',
        key:'linkedIssues',
        render: (linkedIssues) => (
            <ul>
              {linkedIssues.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ),
    
    },
  ];

  return <Table dataSource={data} columns={columns} loading={loading} />;
};

export default DataTable;