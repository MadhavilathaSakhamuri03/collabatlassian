import React, { useState, useEffect } from 'react';
import SyncButton from '../components/Table/SyncButton';
import DataTable from '../components/Table/DataTable';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get('http://localhost:5000/api/sync-data');
   
    let x = [];
    x.push(response.data);
    setData(x[0].data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
     
      <SyncButton onSync={fetchData} />
      <DataTable data={data} loading={loading} />
    </div>
  );
};

export default Dashboard;
