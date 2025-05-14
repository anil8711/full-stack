import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000/", // your backend base URL
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true, // 🔥 this is important and must be outside headers
});

export default axiosInstance;
