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
import { createAdmin } from '../../services/UserService';

const CreateAdmin = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDone, setIsDone] = useState(false);

    const [usernameValidationError, setUsernameValidationError] = useState(null);
    const [emailValidationError, setEmailValidationError] = useState(null);
    const [passwordValidationError, setPasswordValidationError] = useState(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleBackOnClick() {
        navigate("/users");
    }

    function handleUsernameOnChange(event) {
        setUsernameValidationError(null);
        setUsername(event.target.value);
    }

    function handleEmailOnChange(event) {
        setEmailValidationError(null);
        setEmail(event.target.value);
    }

    function handlePasswordOnChange(event) {
        setPasswordValidationError(null);
        setPassword(event.target.value);
    }

    function createAdminRequest() {
        createAdmin({username, email, password}, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            navigate("/users");
        }).catch((error) => {
            setIsError(true);
            if(error.response.data === null) {
                setErrorMessage(t("error.undefined"));
            }
            else if(error.response.data.status === 400) {
                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "username") &&
                    setUsernameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "username").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "email") &&
                    setEmailValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "email").message);

                error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "password") &&
                    setPasswordValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "password").message);
            }
            else {
                setErrorMessage(error.response.data.error);
            }
        }).finally(() => {

        })
    }

    async function validateCreateAdminForm() {
        let result = true;

        if(username === null || username === "") {
            setUsernameValidationError(t("null.validation.error"));
            result = false;
        }
        if(email === null || email === "") {
            setEmailValidationError(t("null.validation.error"));
            result = false;
        }
        if(password === null || password === "") {
            setPasswordValidationError(t("null.validation.error"));
            result = false;
        }

        return result
    }

    async function handleSaveOnClick() {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage(null);

        const validationResult = await validateCreateAdminForm();

        if(validationResult === true) {
            createAdminRequest();
        }
        else{
            setIsLoading(false);
            setIsError(false);
        }
    }

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: { xs: "center", sm: "flex-start" }, alignItems: { xs: "center", sm: "center" } }}>
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
                        <Typography variant="h4">
                            {t("user.create")}
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
                            <Link underline="hover" color="inherit" href="/users">
                                {t("user.management")}
                            </Link>
                            <Typography color="text.primary">{t("user.create")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    <FormControl display="flex" sx={{ width: 1 }}>
                        <Stack id="main" direction="column" sx={{ width: 1, justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "20px" }, paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                                <Stack direction="column" sx={{ width: 0.4 }}>
                                    <Typography variant="h5" color="text">
                                        {t("infos.user")}
                                    </Typography>
                                    <Typography variant="caption" color="text">
                                        {t("infos.user.caption")}
                                    </Typography>
                                </Stack>
                                <Stack direction="column" sx={{ width: 0.6 }}>
                                    <TextField id="username" type="text" label={t("username")} variant="outlined" value={username} onChange={handleUsernameOnChange} required error={usernameValidationError !== null} helperText={usernameValidationError} />
                                    <TextField id="email" type="email" label={t("email")} variant="outlined" value={email} onChange={handleEmailOnChange} sx={{marginTop: "20px"}} required error={emailValidationError !== null} helperText={emailValidationError} />
                                    <TextField id="password" type="password" label={t("password")} variant="outlined" value={password} onChange={handlePasswordOnChange} sx={{marginTop: "20px"}} required error={passwordValidationError !== null} helperText={passwordValidationError} />
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

export default CreateAdmin;