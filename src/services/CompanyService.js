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