import axios from 'axios'
import { API_PATHS, BASE_URL } from '../utils/apiPaths'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default axiosInstance;