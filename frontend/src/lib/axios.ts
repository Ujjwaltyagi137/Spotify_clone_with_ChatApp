
import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://spotify-clone-with-chatapp-backend.onrender.com/api" ,
})