import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const login = async () => {
  const res = await client.get('/nodes');
  return res.data;
};
