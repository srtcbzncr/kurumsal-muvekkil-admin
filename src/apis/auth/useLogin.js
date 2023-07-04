import { useState, useEffect } from "react";
import GetAxiosInstance from "../config/GetAxios";
import axios from "axios";


export default function useLogin(username, password){
    const [request, setRequest] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const apiCall = async () => {
        setRequest(false);
        setIsLoading(true);
        await axios({
            method: "POST",
            mode: "cors",
            baseURL: process.env.REACT_APP_API_URL,
            url: process.env.REACT_APP_API_LOGIN_URL,
            data: {
                username: username,
                password: password
            }
        }).then((response) => {
            setResponse(response);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if(request){
            apiCall();
        }
    });

    return [setRequest, isLoading, response, error]
}