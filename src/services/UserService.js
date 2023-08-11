import axios from "axios";
import endpoints from "./endpoints";

export function getAdminStats(authorization, locale) {
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ADMIN_STATS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getAllAdmins(authorization, locale) {
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ALL_ADMINS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getActiveAdmins(authorization, locale) {
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ACTIVE_ADMINS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getPassiveAdmins(authorization, locale) {
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_PASSIVE_ADMINS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getDeletedAdmins(authorization, locale) {
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_DELETED_ADMINS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function setActive(id, authorization, locale) {
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.SET_ACTIVE_USER_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function setPassive(id, authorization, locale) {
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.SET_PASSIVE_USER_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function deleteUser(id, authorization, locale) {
    return axios({
        method: "DELETE",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.DELETE_USER_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}