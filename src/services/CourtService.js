import axios from "axios";

export function getAllCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_COURTS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        validateStatus : function(status){
            return true; // default
        }
    });
}

export function createCourt(courtRequest, authorization, locale){
    return axios({
        method: "POST",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_COURTS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        data : {
            name : courtRequest.name,
            parentId : courtRequest.parentId
        },
        validateStatus : function(status){
            return true; // default
        }
    });
}
