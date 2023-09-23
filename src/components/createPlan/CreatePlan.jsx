import { Alert, Box, Breadcrumbs, Button, FormControl, InputLabel, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import './style.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { createPlan } from '../../services/PlanService';

import { LoadingButton } from '@mui/lab';
import getAuthHeader from '../../helpers/getAuthHeader';
import { useCookies } from 'react-cookie';

const CreatePlan = () => {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [cookie, setCookie, removeCookie] = useCookies();

    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [monthlyPrice, setMonthlyPrice] = useState(null);
    const [annualPrice, setAnnualPrice] = useState(null);
    const [clientQuota, setClientQuota] = useState(null);
    const [lawyerQuota, setLawyerQuota] = useState(null);
    const [fileQuota, setFileQuota] = useState(null);

    const [nameValidationError, setNameValidationError] = useState(null);
    const [descriptionValidationError, setDescriptionValidationError] = useState(null);
    const [monthlyPriceValidationError, setMonthlyPriceValidationError] = useState(null);
    const [annualPriceValidationError, setAnnualPriceValidationError] = useState(null);
    const [clientQuotaValidationError, setClientQuotaValidationError] = useState(null);
    const [lawyerQuotaValidationError, setLawyerQuotaValidationError] = useState(null);
    const [fileQuotaValidationError, setFileQuotaValidationError] = useState(null);

    function createPlanRequest() {
        createPlan({ name, description, monthlyPrice, annualPrice, clientQuota, lawyerQuota, fileQuotaPerClient: fileQuota }, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            navigate("/plans");
        }).catch((error) => {
            setIsError(true);
            if(error.response.data === null) {
                setErrorMessage(t("error.undefined"));
            }
            else if (error.response.data.status === 400) {
                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "name") &&
                    setNameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "name").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "description") &&
                    setDescriptionValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "description").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "monthlyPrice") &&
                    setMonthlyPriceValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "monthlyPrice").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "annualPrice") &&
                    setAnnualPriceValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "annualPrice").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "clientQuota") &&
                    setClientQuotaValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "clientQuota").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "lawyerQuota") &&
                    setLawyerQuotaValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "lawyerQuota").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "fileQuotaPerClient") &&
                    setFileQuotaValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "fileQuotaPerClient").message);
            }
            else {
                setErrorMessage(error.response.data.error.message);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    function handleBackOnClick() {
        navigate("/plans");
    }

    async function handleSaveOnClick() {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(null);

        const validationResult = await validateCreatePlanForm();

        if (validationResult === true) {
            createPlanRequest();
        }
        else {
            setIsLoading(false);
            setIsError(true);
        }
    }

    async function validateCreatePlanForm() {
        let result = true;
        if (name === null || name === "") {
            setNameValidationError(t("null.validation.error"));
            result = false;
        }
        if (description === null || name === "") {
            setDescriptionValidationError(t("null.validation.error"));
            result = false;
        }
        if (monthlyPrice === null || monthlyPrice === "") {
            setMonthlyPriceValidationError(t("null.validation.error"));
            result = false;
        }
        else if (monthlyPrice < 0) {
            setMonthlyPriceValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if (annualPrice === null || annualPrice === "") {
            setAnnualPriceValidationError(t("null.validation.error"));
            result = false;
        }
        else if (annualPrice < 0) {
            setAnnualPriceValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if (clientQuota === null || clientQuota === "") {
            setClientQuotaValidationError(t("null.validation.error"));
            result = false;
        }
        else if (clientQuota < 0) {
            setClientQuotaValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if (lawyerQuota === null || lawyerQuota === "") {
            setLawyerQuotaValidationError(t("null.validation.error"));
            result = false;
        }
        else if (lawyerQuota < 0) {
            setLawyerQuotaValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if (fileQuota === null || fileQuota === "") {
            setFileQuotaValidationError(t("null.validation.error"));
            result = false;
        }
        else if (fileQuota < 0) {
            setFileQuotaValidationError(t("min.zero.validation.error"));
            result = false;
        }
        console.log("Validation Result:" + result);
        return result;
    }

    function handleNameOnChange(event) {
        setNameValidationError(null);
        setName(event.target.value);
    }

    function handleDescriptionOnChange(event) {
        setDescriptionValidationError(null);
        setDescription(event.target.value);
    }

    function handleMonthlyPriceOnChange(event) {
        setMonthlyPriceValidationError(null);
        setMonthlyPrice(event.target.value);
    }

    function handleAnnualPriceOnChange(event) {
        setAnnualPriceValidationError(null);
        setAnnualPrice(event.target.value);
    }

    function handleClientQuotaOnChange(event) {
        setClientQuotaValidationError(null);
        setClientQuota(event.target.value);
    }

    function handleLawyerQuotaOnChange(event) {
        setLawyerQuotaValidationError(null);
        setLawyerQuota(event.target.value);
    }

    function handleFileQuotaOnChange(event) {
        setFileQuotaValidationError(null);
        setFileQuota(event.target.value);
    }

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: { xs: "center", sm: "flex-start" }, alignItems: { xs: "center", sm: "center" } }}>
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
                        <Typography variant="h4">
                            {t("plan.create")}
                        </Typography>
                        <Tooltip title={t("back")}>
                            <Button variant="outlined" color="text" onClick={handleBackOnClick}>
                                <ArrowBackSharpIcon color="text" />
                            </Button>
                        </Tooltip>
                    </Stack>
                    <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                {t("home")}
                            </Link>
                            <Link underline="hover" color="inherit" href="/courts">
                                {t("plan.management")}
                            </Link>
                            <Typography color="text.primary">{t("plan.create")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    <FormControl display="flex" sx={{ width: 1 }}>
                        <Stack id="main" direction="column" sx={{ width: 1, justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "20px" }, paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                                <Stack direction="column" sx={{ width: 0.4 }}>
                                    <Typography variant="h5" color="text">
                                        {t("infos.general")}
                                    </Typography>
                                    <Typography variant="caption" color="text">
                                        {t("infos.general.caption")}
                                    </Typography>
                                </Stack>
                                <Stack direction="column" sx={{ width: 0.6 }}>
                                    {
                                        isError === true &&
                                        <Alert variant="filled" severity="error">
                                            { errorMessage }
                                        </Alert>
                                    }
                                    <TextField id="name" label={t("name")} variant="outlined" value={name} onChange={handleNameOnChange} sx={{ marginTop: isError === true ? "20px" : "0px"}} required error={nameValidationError !== null} helperText={nameValidationError} />
                                    <TextField id="description" label={t("description")} variant="outlined" value={description} onChange={handleDescriptionOnChange} multiline rows={6} sx={{ marginTop: "20px" }} required error={descriptionValidationError !== null} helperText={descriptionValidationError} />
                                </Stack>
                            </Stack>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginTop: "30px", border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "20px" }, paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                                <Stack direction="column" sx={{ width: 0.4 }}>
                                    <Typography variant="h5" color="text">
                                        {t("infos.price")}
                                    </Typography>
                                    <Typography variant="caption" color="text">
                                        {t("infos.price.caption")}
                                    </Typography>
                                </Stack>
                                <Stack direction="column" sx={{ width: 0.6 }}>
                                    <TextField id="monthlyPrice" label={t("price.monthly")} variant="outlined" type="number" value={monthlyPrice} onChange={handleMonthlyPriceOnChange} required error={monthlyPriceValidationError !== null} helperText={monthlyPriceValidationError} />
                                    <TextField id="annualPrice" label={t("price.annual")} variant="outlined" type="number" sx={{ marginTop: "20px" }} value={annualPrice} onChange={handleAnnualPriceOnChange} required error={annualPriceValidationError !== null} helperText={annualPriceValidationError} />
                                </Stack>
                            </Stack>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginTop: "30px", border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "30px" }, paddingRight: { xs: "0px", sm: "30px" }, paddingTop: "30px", paddingBottom: "30px" }}>
                                <Stack direction="column" sx={{ width: 0.4 }}>
                                    <Typography variant="h5" color="text">
                                        {t("infos.quota")}
                                    </Typography>
                                    <Typography variant="caption" color="text">
                                        {t("infos.quota.caption")}
                                    </Typography>
                                </Stack>
                                <Stack direction="column" sx={{ width: 0.6 }}>
                                    <TextField id="clientQuota" label={t("quota.client")} variant="outlined" type="number" value={clientQuota} onChange={handleClientQuotaOnChange} required error={clientQuotaValidationError !== null} helperText={clientQuotaValidationError} />
                                    <TextField id="lawyerQuota" label={t("quota.lawyer")} variant="outlined" type="number" sx={{ marginTop: "20px" }} value={lawyerQuota} onChange={handleLawyerQuotaOnChange} required error={lawyerQuotaValidationError !== null} helperText={lawyerQuotaValidationError} />
                                    <TextField id="fileQuota" label={t("quota.file.per.client")} variant="outlined" type="number" sx={{ marginTop: "20px" }} value={fileQuota} onChange={handleFileQuotaOnChange} required error={fileQuotaValidationError !== null} helperText={fileQuotaValidationError} />
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{ width: 0.8, justifyContent: "flex-end", marginTop: "30px", marginBottom: "30px" }}>
                                <Button variant="outlined" type="submit" size="large" color="text" onClick={handleBackOnClick}>{t("cancel")}</Button>
                                {
                                    isLoading === true
                                        ? <LoadingButton loading variant="contained" size="large">{t("save")}</LoadingButton>
                                        : <Button variant="contained" type="submit" size="large" onClick={handleSaveOnClick}>{t("save")}</Button>
                                }
                            </Stack>
                        </Stack>
                    </FormControl>
                </Stack>
            </Layout>
        </AuthCheck>
    )
}

export default CreatePlan;