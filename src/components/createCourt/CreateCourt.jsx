import './style.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { FormControl, Stack, Typography, MenuItem, TextField, Button, Select, InputLabel, Box, Breadcrumbs, Link, Tooltip, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

import { getActiveCourts, createCourt } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import createCourtPNG from '../../illustrations/createCourt.png';
import donePNG from '../../illustrations/done.png';


const CreateCourt = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDone, setIsDone] = useState(false);

    const [nameValidationError, setNameValidationError] = useState(null);

    const [activeCourts, setActiveCourts] = useState([])
    const [selectedParentCourtId, setSelectedParentCourtId] = useState(null);
    const [newCourtName, setNewCourtName] = useState(null);

    function fetchActiveCourts() {
        getActiveCourts(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setActiveCourts(response.data.data);
        }).catch((error) => {
            setIsError(true);
            setErrorMessage(t("error.undefined"));
            if (error.response.data.status === 401) {
                navigate("/login");
            }
            else if (error.response.data.status === 403) {
                navigate("/login");
            }
        })
    };

    function createCourtRequest() {
        createCourt({ name: newCourtName, parentId: selectedParentCourtId }, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setIsDone(true);
            setSelectedParentCourtId(null);
            setNewCourtName(null);
        }).catch((error) => {
            setIsError(true);
            setErrorMessage(t("error.undefined"));
            if (error.response.data.status === 400) {
                setNameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "name").message);
                setErrorMessage(error.response.data.error.message);
            }
            else if (error.response.data.status === 401) {
                setIsError(true);
                setErrorMessage(error.response.data.error.message);
            }
            else if (error.response.data.status === 403) {
                setIsError(true);
                setErrorMessage(error.response.data.error.message);
            }
            else{
                setIsError(true);
                setErrorMessage(error.response.data.error.message);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    function handleSelectedParentCourtChange(event) {
        setSelectedParentCourtId(event.target.value);
    };

    function handleNewCourtNameChange(event) {
        setNameValidationError(null);
        setNewCourtName(event.target.value);
    };

    function handleBackOnClick() {
        navigate("/courts");
    }

    function handleBackCourtManagementOnClick() {
        navigate("/courts");
    }

    function handleNewCourtOnClick() {
        setIsDone(false);
        setIsError(false);
        setErrorMessage("");
    }

    async function handleSaveClick() {
        setIsError(false);
        setErrorMessage("");
        setIsLoading(true);

        const validationResult = await validateCreateCourtForm()

        if (validationResult === true) {
            createCourtRequest();
        }
        else {
            setIsLoading(false);
        }
    };

    async function validateCreateCourtForm() {
        let result = true;

        if (newCourtName === null || newCourtName === "") {
            setNameValidationError(t("null.validation.error"))
            result = false;
        }
        
        return result;
    }

    useEffect(() => {
        fetchActiveCourts();
    }, []);

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: { xs: "center", sm: "flex-start" }, alignItems: { xs: "center", sm: "center" } }}>
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
                        <Typography variant="h4">
                            {t("court.create")}
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
                                {t("court.management")}
                            </Link>
                            <Typography color="text.primary">{t("court.create")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    {
                        isDone === false
                            ?
                            <Stack id="main" direction={{ xs: "column", sm: "row" }} sx={{ width: 0.8, justifContent: "center", alignItems: "center", backgroundColor: "secondary.main", marginTop: "25px", paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                                <Box display="flex" sx={{ width: 0.5, justifyContent: "center" }}>
                                    <img src={createCourtPNG} width="90%"></img>
                                </Box>
                                <Stack direction="column" sx={{ width: 0.5, justifyContent: "center", alignItems: "center", paddingTop: { xs: "20px", sm: "0px" } }}>
                                    <Typography variant="h5" sx={{ width: 0.7 }}>
                                        {t("court.infos")}
                                    </Typography>
                                    {
                                        isError === true &&
                                        <Alert variant="filled" severity="error" sx={{ marginTop: "30px", width: "70%" }}>
                                            {errorMessage}
                                        </Alert>
                                    }
                                    <FormControl sx={{ marginTop: "30px", width: 0.7 }}>
                                        <InputLabel id="parent-court-select-label">{t("court.parent")}</InputLabel>
                                        <Select
                                            labelId="parent-court-select-label"
                                            id="parent-court-select"
                                            value={selectedParentCourtId}
                                            label={t("court.parent")}
                                            onChange={handleSelectedParentCourtChange}
                                        >
                                            <MenuItem value={null}>{t("none")}</MenuItem>
                                            {
                                                activeCourts.map((court) => <MenuItem key={court.id} value={court.id}>{court.name}</MenuItem>)
                                            }
                                        </Select>
                                        <TextField required error={nameValidationError !== null} helperText={nameValidationError} id="court-name" label={t("name")} variant="outlined" sx={{ marginTop: "20px" }} value={newCourtName} onChange={handleNewCourtNameChange} />
                                        <Stack direction="row" sx={{ width: 1, justifyContent: "flex-end", marginTop: "30px" }}>
                                            {
                                                isLoading === true
                                                    ? <LoadingButton loading variant="contained" size="large" sx={{ width: 0.4 }}>{t("save")}</LoadingButton>
                                                    : <Button variant="contained" type="submit" size="large" sx={{ width: 0.4 }} onClick={handleSaveClick}>{t("save")}</Button>
                                            }
                                        </Stack>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            :
                            <Stack id="main" direction={{ xs: "column", sm: "row" }} sx={{ width: 0.8, justifContent: "center", alignItems: "center", backgroundColor: "secondary.main", marginTop: "25px", paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                                <Box display="flex" sx={{ width: 0.5, justifyContent: "center" }}>
                                    <img src={donePNG} width="90%"></img>
                                </Box>
                                <Stack direction="column" sx={{ width: 0.5, justifyContent: "center", alignItems: "center", paddingTop: { xs: "20px", sm: "0px" } }}>
                                    <Stack direction="column" spacing={8} sx={{ width: 1, alignItems: "center" }}>
                                        <Typography variant='h5'>
                                            {t("court.create.successful")}
                                        </Typography>
                                        <Stack direction="row" spacing={2} sx={{ width: 1, justifyContent: "center" }}>
                                            <Button variant="contained" size="large" color="text" sx={{ color: "secondary.main" }} onClick={handleNewCourtOnClick}>{t("court.create")}</Button>
                                            <Button variant="outlined" size="large" color="text" onClick={handleBackCourtManagementOnClick}>{t("back.court.management")}</Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                    }
                </Stack>
            </Layout>
        </AuthCheck>
    )
}

export default CreateCourt;