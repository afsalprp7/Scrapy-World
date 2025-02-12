import axios from "axios";

const AnxiosInstance = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BASE_URL
})

export default AnxiosInstance ;