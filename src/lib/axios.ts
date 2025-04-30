import axios from 'axios';

const serviceKey = "oqstjzumQ5124t7uVd5VZy/6QEtLK0YCF0b16HdHsW1nOAFd+xqVf742QW5XD9AQugVjvmT6AnUjMQ3+RlNyxw==";
const baseURL = `https://apis.data.go.kr/B551011/KorService1`;

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
        numOfRows: 31
    }
})

export default axiosDefault;