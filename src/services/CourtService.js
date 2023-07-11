import axios from "axios";

export default class CourtService{

    getAll(authorization, locale){
        return axios({
            method: "GET",
            mode: "cors",
            baseURL: process.env.REACT_APP_API_URL,
            url: process.env.REACT_APP_API_COURTS_URL,
            headers: {
                "Authorization": authorization,
                "Accept-Language": locale,
                "Accept": "application/json"
            }
        });
    }

}
