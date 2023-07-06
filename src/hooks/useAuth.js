import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { login } from "../services/Auth";

export default function useAuth() {
    const [cookie, setCookie, removeCookie] = useCookies();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [role, setRole] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if(cookie.username != undefined && cookie.password != undefined){
            login(cookie.username, cookie.password).then((response) => {
                console.log(response.status);
                if(response.status === 200){
                    console.log(response.data);
                    setAuthenticated(true);
                    setUsername(response.data.username);
                    setPassword(response.data.password);
                    console.log(username);
                    console.log(password);
                    if(response.data.role === "ROLE_ADMIN"){
                        setAuthorized(true);
                        setRole(response.data.role);
                    }
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    });

    console.log(authenticated);
    console.log(authorized);
    console.log(role);

    if(authenticated && authorized){
        setCookie("username", username, { path: '/' });
        setCookie("password", password, { path: '/' });
        setCookie("role", role, { path: '/' });
        return true;
    }
    else{
        /*removeCookie("username");
        removeCookie("password");
        removeCookie("role");*/
        return false;
    }
}