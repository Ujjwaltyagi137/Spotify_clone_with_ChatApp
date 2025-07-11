
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://spotify-clone-with-chatapp-backend.onrender.com/api" : "/api",
})