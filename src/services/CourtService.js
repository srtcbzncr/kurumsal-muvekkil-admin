import axios from "axios";

export function getCourtStats(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_STATISTICS_COURTS_URL,
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

export function getActiveCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_ACTIVE_COURTS_URL,
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

export function getPassiveCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_PASSIVE_COURTS_URL,
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

export function getDeletedCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_DELETED_COURTS_URL,
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

export function createCourt(court, authorization, locale){
    
    let courtData;

    if(court.parentId !== null){
        courtData = {
            name: court.name,
            parent: {
                id: court.parentId
            }
        }
    }
    else{
        courtData = {
            name: court.name
        }
    }

    return axios({
        method: "POST",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: process.env.REACT_APP_API_CREATE_COURT_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        data : courtData,
        validateStatus : function(status){
            return true; // default
        }
    });
}

export function setActive(id, authorization, locale){
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: id + process.env.REACT_APP_API_SET_ACTIVE_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function setPassive(id, authorization, locale){
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: id + process.env.REACT_APP_API_SET_PASSIVE_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}
