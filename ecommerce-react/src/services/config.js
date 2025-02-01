import axios from 'axios';

const instance = axios.create({
  baseURL: "https://ecommerce-front-back-6.onrender.com/api", // Cambiar la URL por la del servidor backend (render)
  //baseURL: "http://localhost:3000/api", // Cambiar la URL por la del servidor backend (local)
  timeout: 5000 
});

export default instance;


