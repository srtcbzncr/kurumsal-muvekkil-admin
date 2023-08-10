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