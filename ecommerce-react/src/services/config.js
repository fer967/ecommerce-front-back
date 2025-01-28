import axios from 'axios';

const instance = axios.create({
  baseURL: "https://ecommerce-front-back-6.onrender.com/api", // Cambiar la URL por la del servidor backend
  timeout: 5000 
});

export default instance;


