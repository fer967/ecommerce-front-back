import axios from 'axios';
import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: "VITE_BACKEND_URL", // Cambiar la URL por la del servidor backend
  timeout: 5000 
});

export default instance;


