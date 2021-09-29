import axios from "axios";
import { getToken } from "./auth";
import 'dotenv/config'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
})

// Sempre que uma requisição for feita ela será interceptada
// Já com o token JWT
api.interceptors.request.use(async config => {
  const token = getToken()
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

export default api
