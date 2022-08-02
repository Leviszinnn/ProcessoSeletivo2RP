import axios from 'axios'
import { GetItem } from './Auth';

export const db = axios.create({
    baseURL: 'http://localhost:5000/api'
})

db.interceptors.request.use(async config => {
    const token = GetItem();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });