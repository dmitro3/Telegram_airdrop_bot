import axios from 'axios';
// console.log('nextapiurl',process.env["NEXT_PUBLIC_API_URL"])
const instance = axios.create({
  baseURL: process.env["NEXT_PUBLIC_API_URL"]
});

export default instance;