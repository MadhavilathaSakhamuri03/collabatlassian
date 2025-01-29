import axios from 'axios';

export const syncData = async () => {
  const response = await axios.get('http://localhost:5000/api/sync-data');
  console.log('API Response:', response.data);

  return response.data;
};