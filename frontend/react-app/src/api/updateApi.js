import axios from 'axios';

export const updateData = async () => {
  const response = await axios.get('http://localhost:5000/api/update-data');
  console.log('API Response:', response.data);

  return response.data;
};