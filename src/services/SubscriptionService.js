import axios from "axios";
import endpoints from './endpoints';

export function getStats(authorization, locale) {
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_SUBSCRIPTION_STATS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getAllSubscriptions(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ALL_SUBSCRIPTIONS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getActiveSubscriptions(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_ACTIVE_SUBSCRIPTIONS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getPassiveSubscriptions(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_PASSIVE_SUBSCRIPTIONS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getDeletedSubscriptions(authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_DELETED_SUBSCRIPTIONS_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function getSubscriptionById(id, authorization, locale){
    return axios({
        method: "GET",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.GET_SUBSCRIPTION_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function createSubscription(plan, authorization, locale){
    return axios({
        method: "POST",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.CREATE_SUBSCRIPTION_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        data : plan
    });
}

export function updateSubscription(plan, authorization, locale){
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.UPDATE_SUBSCRIPTION_URL,
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        },
        data : plan
    });
}

export function setActive(id, authorization, locale){
    return axios({
        method: "PUT",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url: endpoints.SET_ACTIVE_SUBSCRIPTION_URL.replace("{id}", id),
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
        url: endpoints.SET_PASSIVE_SUBSCRIPTION_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}

export function deleteSubscription(id, authorization, locale){
    return axios({
        method: "DELETE",
        mode: "cors",
        baseURL: process.env.REACT_APP_API_URL,
        url:  endpoints.DELETE_SUBSCRIPTION_URL.replace("{id}", id),
        headers: {
            "Authorization": authorization,
            "Accept-Language": locale,
            "Accept": "application/json"
        }
    });
}