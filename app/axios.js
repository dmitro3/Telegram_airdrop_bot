import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://chirpley-be-server-08-22.vercel.app',
});

export default axiosInstance;
