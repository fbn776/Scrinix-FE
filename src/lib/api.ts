import axios from "axios";

const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    timeout: 1000,
});

export default apiInstance;