import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:3000/api", // Cambiar la URL por la del servidor backend
  timeout: 5000 
});

export default instance;


