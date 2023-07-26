import axios from "axios";
import endpoints from './endpoints';

export function getCourtStats(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_COURT_STATS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getSubCourtStats(id, authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_SUB_COURTS_STATS_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getAllCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ALL_COURTS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getAllSubCourts(id, authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ALL_SUB_COURTS_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getActiveCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ACTIVE_COURTS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getActiveSubCourts(id, authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ACTIVE_SUB_COURTS_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getPassiveCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_PASSIVE_COURTS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getPassiveSubCourts(id, authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_PASSIVE_SUB_COURTS_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getDeletedCourts(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_DELETED_COURTS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getDeletedSubCourts(id, authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_DELETED_SUB_COURTS_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getCourtById(id, authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_COURT_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
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
        url: endpoints.CREATE_COURT_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        data : courtData
    });
}

export function updateCourt(court, authorization, locale){
    
    let courtData;

    if(court.parentId !== null){
        courtData = {
            id: court.id,
            name: court.name,
            parent: {
                id: court.parentId
            }
        }
    }
    else{
        courtData = {
            id: court.id,
            name: court.name
        }
    }

    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.CREATE_COURT_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        data : courtData
    });
}

export function setActive(id, authorization, locale){
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.SET_ACTIVE_COURT_URL.replace("{id}", id),
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
        url: endpoints.SET_PASSIVE_COURT_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function deleteCourt(id, authorization, locale){
    return axios({
        method: "DELETE",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url:  endpoints.DELETE_COURT_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}
