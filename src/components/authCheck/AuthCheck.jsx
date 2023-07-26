import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router';


export default function AuthCheck({children}) {
    const [cookie, setCookie, removeCookie] = useCookies();

    if(cookie.username === undefined || cookie.password === undefined){
        return(
            <Navigate to="/login" replace={true} />
        )
    }
    else if(cookie.role !== "ROLE_ADMIN"){
        removeCookie("username");
        removeCookie("password");
        removeCookie("role");
        return (
            <Navigate to="/login" replace={true} />
        )
    }
    else{
        return(
            <>
                {children}
            </>
        )
    }

}