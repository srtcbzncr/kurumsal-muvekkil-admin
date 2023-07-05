import axios from "axios";

export async function login(username, password) {
    const response = axios({
        method: "POST",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_LOGIN_URL,
        data: {
            username: username,
            password: password
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
      
    return response;
}