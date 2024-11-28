import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const loginUser = (username: string, password: string) =>
  api.post('/auth/login', { username, password });

export const getProducts = () => api.get('/products');

export default api;

