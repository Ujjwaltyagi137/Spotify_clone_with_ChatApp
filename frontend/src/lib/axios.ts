
import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://spotify-clone-with-chatapp.onrender.com/api" : "/api",
    withCredentials: true, 
})
