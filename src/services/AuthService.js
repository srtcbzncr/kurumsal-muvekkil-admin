import axios from "axios";

export function login(username, password) {
    return axios({
        method: "POST",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_LOGIN_URL,
        data: {
            username: username,
            password: password
        },
        validateStatus : function(status){
            return true; // default
        }
    });
}