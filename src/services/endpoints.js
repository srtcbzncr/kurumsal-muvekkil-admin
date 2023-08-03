const endpoints = {
    // Court
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
    GET_SUB_COURTS_STATS_URL : "/court/{id}/stats",

    // Company
    GET_COMPANY_STATS_URL : "/company/stats",
    GET_ALL_COMPANIES_URL : "/company/all",
    GET_ACTIVE_COMPANIES_URL : "/company/active",
    GET_PASSIVE_COMPANIES_URL : "/company/passive",
    GET_DELETED_COMPANIES_URL : "/company/deleted",
    GET_COMPANY_URL : "/company/{id}",
    CREATE_COMPANY_URL : "/company",
    UPDATE_COMPANY_URL : "/company",
    SET_ACTIVE_COMPANY_URL : "/company/{id}/setActive",
    SET_PASSIVE_COMPANY_URL : "/company/{id}/setPassive",
    DELETE_COMPANY_URL : "/company/{id}"
}

export default endpoints;