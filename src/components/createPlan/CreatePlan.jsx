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
        console.log("Create Plan Request");
        createPlan({name, description, monthlyPrice, annualPrice, clientQuota, lawyerQuota, fileQuota}, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            navigate("/plans");
        }).catch((error) => {            
            setIsError(true);
            if (error.response.data.status === 400) {
                setNameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "name").message);
                setDescriptionValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "description").message);
                setMonthlyPriceValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "monthlyPrice").message);
                setAnnualPriceValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "annualPrice").message);
                setClientQuotaValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "clientQuota").message);
                setLawyerQuotaValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "lawyerQuota").message);
                setFileQuotaValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "fileQuota").message);
            }
            setErrorMessage(error.response.error.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    function handleBackOnClick() {
        navigate("/plans");
    }

    function handleNewPlanOnClick() {
        
    }

    async function handleSaveOnClick() {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(null);
        setNameValidationError("");
        setDescriptionValidationError("");
        setMonthlyPriceValidationError(null);
        setAnnualPriceValidationError(null);
        setClientQuotaValidationError(null);
        setLawyerQuotaValidationError(null);
        setFileQuotaValidationError(null);

        const validationResult = await validateCreatePlanForm();
    
        if(validationResult === true){
            createPlanRequest();
        }
        else{
            setIsLoading(false);
            setIsError(true);
        }
    }

    async function validateCreatePlanForm() {
        console.log(name);
        let result = true;

        if(name === null || name === ""){
            console.log("Name null");
            setNameValidationError(t("null.validation.error"));
            result = false;
        }
        if(description === null || name === ""){
            console.log("Description null");
            setDescriptionValidationError(t("null.validation.error"));
            result = false;
        }
        if(monthlyPrice === null){
            console.log("Monthly Price null");
            setMonthlyPriceValidationError(t("null.validation.error"));
            result = false;
        }
        if(monthlyPrice < 0){
            console.log("Monthly Price less than zero");
            setNameValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if(annualPrice === null) {
            console.log("Annual Price null");
            setAnnualPriceValidationError(t("null.validation.error"));
            result = false;
        }
        if(annualPrice < 0) {
            console.log("Annual Price less than zero");
            setAnnualPriceValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if(clientQuota === null) {
            setClientQuotaValidationError(t("null.validation.error"));
            result = false;
        }
        if(clientQuota < 0) {
            setClientQuotaValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if(lawyerQuota === null) {
            setLawyerQuotaValidationError(t("null.validation.error"));
            result = false;
        }
        if(lawyerQuota < 0) {
            setLawyerQuotaValidationError(t("min.zero.validation.error"));
            result = false;
        }
        if(fileQuota === null) {
            setFileQuotaValidationError(t("null.validation.error"));
            result = false;
        }
        if(fileQuota < 0) {
            setFileQuotaValidationError(t("zero.min.validation.error"));
            result = false;
        }
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
                    {
                        isDone === false
                            ?
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
                                            <TextField id="name" label={t("name")} variant="outlined" required error={nameValidationError !== null} helperText={nameValidationError} />
                                            <TextField id="description" label={t("description")} variant="outlined" multiline rows={6} sx={{ marginTop: "20px" }} required error={descriptionValidationError !== null} helperText={descriptionValidationError}/>
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
                                            <TextField id="monthlyPrice" label={t("price.monthly")} variant="outlined" type="number" required error={monthlyPriceValidationError !== null} helperText={monthlyPriceValidationError}/>
                                            <TextField id="annualPrice" label={t("price.annual")} variant="outlined" type="number" sx={{ marginTop: "20px" }} required error={annualPriceValidationError !== null} helperText={annualPriceValidationError}/>
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
                                            <TextField id="clientQuota" label={t("quota.client")} variant="outlined" type="number" required error={clientQuotaValidationError !== null} helperText={clientQuotaValidationError}/>
                                            <TextField id="lawyerQuota" label={t("quota.lawyer")} variant="outlined" type="number" sx={{ marginTop: "20px" }} required error={lawyerQuotaValidationError !== null} helperText={lawyerQuotaValidationError}/>
                                            <TextField id="fileQuota" label={t("quota.file.per.client")} variant="outlined" type="number" sx={{ marginTop: "20px" }} required error={fileQuotaValidationError !== null} helperText={fileQuotaValidationError}/>
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
                            :
                            <Stack id="main" direction={{ xs: "column", sm: "row" }} sx={{ width: 0.8, justifyContent: "center", alignItems: "center", backgroundColor: "secondary.main", marginTop: "25px", paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>

                            </Stack>
                    }
                </Stack>
            </Layout>
        </AuthCheck>
    )
}

export default CreatePlan;