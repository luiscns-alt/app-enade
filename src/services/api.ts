import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.9:3005',
});

export { api };
