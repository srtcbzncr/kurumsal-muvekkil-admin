const endpoints = {
    GET_COURT_STATS_URL : "/court/stats",
    GET_ALL_COURTS_URL : "/court/all",
    GET_ACTIVE_COURTS_URL : "/court/active",
    GET_PASSIVE_COURTS_URL : "/court/passive",
    GET_DELETED_COURTS_URL : "/court/deleted",
    GET_ALL_SUB_COURTS_URL : "/court/{id}/subs/all",
    GET_ACTIVE_SUB_COURTS_URL : "/court/{id}/subs/active",
    GET_PASSIVE_SUB_COURTS_URL : "/court/{id}/subs/passive",
    GET_DELETED_SUB_COURTS_URL : "/court/{id}/subs/deleted",
    GET_COURT_URL : "/court/{id}",
    CREATE_COURT_URL : "/court",
    UPDATE_COURT_URL : "/court",
    SET_ACTIVE_COURT_URL : "/court/{id}/setActive",
    SET_PASSIVE_COURT_URL : "/court/{id}/setPassive",
    DELETE_COURT_URL : "/court/{id}",
    GET_SUB_COURTS_STATS_URL : "/court/{id}/stats"
}

export default endpoints;