import axios from 'axios';

export default function GetAxiosInstance(){
    const instance = axios.create({
        baseUrl: process.env.REACT_APP_API_URL
    });

    return instance;
}