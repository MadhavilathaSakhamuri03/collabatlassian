import { useState, useCallback } from "react";
import axios from "axios";

const useDataProvider = () => {
  const [sprintData, setSprintData] = useState([]);
  const [issuesData, setIssuesData] = useState([]);
  const [bugsData, setBugsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch sprint data

  const fetchSprintData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:5000/api/sprint-data'); 
      //const response = await axios.get(`http://localhost:5000/api/issue-data?sprintId=${sprintId}`);
     
      setSprintData(response.data.data);
     // return dataArray;
    } catch (err) {
      console.error("Error fetching sprint data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to fetch issues data
  const fetchIssuesData = async () => {
    setLoading(true);
    setError(null);
    const sprintId = 4;
    try {
      const response = await axios.get('http://localhost:5000/api/issue-data'); // Replace with your endpoint
      
      // const response = await axios.get(`http://localhost:5000/api/issue-data`, {
      //   params: sprintId ? { sprintId } : {},
      // });
     setIssuesData(response.data.data);

      //return response.data;
    } catch (err) {
      console.error("Error fetching issues data:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch bugs data
  const fetchBugsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/bugs-data'); 
    
      setBugsData(response.data.data);
      
    } catch (err) {
      console.error("Error fetching bugs data:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sprintData,
    issuesData,
    bugsData,
    loading,
    error,
    fetchSprintData,
    fetchIssuesData,
    fetchBugsData,
  };
};

export default useDataProvider;
