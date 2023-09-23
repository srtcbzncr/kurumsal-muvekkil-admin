import axios from "axios";
import endpoints from "./endpoints";

export function getStats(authorization, locale) {
    return axios({
        method : "GET",
        mode : "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_COMPANY_STATS_URL,
        headers : {
            "Authorization" : authorization,
            "Accept-Language" : locale,
            "Accept" : "application/json"
        }
    });
}

export function getAllCompanies(authorization, locale) {
    return axios({
        method : "GET",
        mode : "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ALL_COMPANIES_URL,
        headers : {
            "Authorization" : authorization,
            "Accept-Language" : locale,
            "Accept" : "application/json"
        }
    });
}

export function getActiveCompanies(authorization, locale) {
    return axios({
        method : "GET",
        mode : "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ACTIVE_COMPANIES_URL,
        headers : {
            "Authorization" : authorization,
            "Accept-Language" : locale,
            "Accept" : "application/json"
        }
    });
}

export function getPassiveCompanies(authorization, locale) {
    return axios({
        method : "GET",
        mode : "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_PASSIVE_COMPANIES_URL,
        headers : {
            "Authorization" : authorization,
            "Accept-Language" : locale,
            "Accept" : "application/json"
        }
    });
}

export function getDeletedCompanies(authorization, locale) {
    return axios({
        method : "GET",
        mode : "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_DELETED_COMPANIES_URL,
        headers : {
            "Authorization" : authorization,
            "Accept-Language" : locale,
            "Accept" : "application/json"
        }
    });
}

export function setActive(id, authorization, locale){
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.SET_ACTIVE_COMPANY_URL.replace("{id}", id),
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
        url: endpoints.SET_PASSIVE_COMPANY_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function deleteCompany(id, authorization, locale){
    return axios({
        method: "DELETE",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url:  endpoints.DELETE_COMPANY_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function createCompany(company, authorization, locale) {
    return axios({
        method: "POST",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.CREATE_COMPANY_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        data: company
    });
}