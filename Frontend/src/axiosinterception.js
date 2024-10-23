import axios from 'axios';

// Create an axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4001'
});

// Add request interceptor to the axios instance
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        if (config) {
            // Set the token in the request headers
            config.headers.token = accessToken;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Export axios instance
export default axiosInstance;
