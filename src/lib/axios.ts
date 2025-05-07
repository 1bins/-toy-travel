import axios from 'axios';

const serviceKey = import.meta.env.VITE_SERVICE_KEY;
const baseURL = import.meta.env.VITE_API_URL;

const axiosDefault = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        serviceKey,
        MobileOS: "ETC",
        MobileApp: "AppTesting",
        _type: "json",
        numOfRows: 10
    }
})

export default axiosDefault;