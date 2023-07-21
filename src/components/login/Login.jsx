import './style.css';

import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Typography, TextField, Alert, FormControl } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';

import { login } from '../../services/AuthService';

export default function Login() {
    const { t } = useTranslation();
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [usernameValidationError, setUsernameValidationError] = useState(null);
    const [passwordValidationError, setPasswordValidationError] = useState(null);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    function handleUsernameOnChange(event) {
        setUsername(event.target.value);
        setUsernameValidationError(null);
    }

    function handlePasswordOnChange(event) {
        setPassword(event.target.value);
        setPasswordValidationError(null);
    }

    function loginRequest(){
        login(username, password).then((response) => {
            setCookie("username", username, { path: '/' });
            setCookie("password", password, { path: '/' });
            setCookie("role", response.data.data.role, { path: '/' });
            navigate("/");
        }).catch((error) => {
            if(error.response.status === 400 ){
                setUsernameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "username").message);
                setUsernameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "password").message);
                setErrorMessage(error.response.data.error.message);
            }
            else {
                setIsError(true);
                setErrorMessage(error.response.data.error.message);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    async function handleLoginOnClick(){
        setIsError(false);
        setIsLoading(true);

        const validationResult = await validateLoginForm();

        if(validationResult === true){
            loginRequest();
        }
        else{
            setIsLoading(false);
        }
    }

    async function validateLoginForm(){
        let result = true;

        if(username === null || username === ""){
            setUsernameValidationError(t("null.validation.error"));
            result = false;
        }

        if(password === null || password === ""){
            setPasswordValidationError(t("null.validation.error"));
            result = false;
        }
        
        return result;
    }

    useEffect(() => {
        if(cookie.username !== undefined && cookie.password !== undefined ){
            navigate("/");
        }
    });

    return (
        <Stack direction="row" sx={{ width: 1, height: 1 }}>
            <Stack direction="column" sx={{ width: 0.5, alignItems: "center"}}>
                <LanguageSwitcher></LanguageSwitcher>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    <Typography variant="h3" sx={{ marginTop: "200px"}}>
                        {t("admin.login")}
                    </Typography>
                    {
                        isError === true &&
                        <Alert variant="filled" severity="error" sx={{ marginTop: "50px", width: "50%" }}>
                            { errorMessage }
                        </Alert>
                    }
                    <FormControl sx={{ width: 0.5, marginTop: "25px"}}>
                        <TextField fullWidth error={usernameValidationError !== null} helperText={usernameValidationError} id="username" name='username' margin='normal' type='text' label={t('username')} variant="standard" onChange={handleUsernameOnChange}/>
                        <TextField fullWidth error={passwordValidationError !== null} helperText={passwordValidationError} id="password" name='password' margin='normal' type='password' label={t('password')} variant="standard" onChange={handlePasswordOnChange}/>       
                        <Stack className='buttons' direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: "25px" }}>
                            <Button variant="text">{t('password.forget')}</Button>
                            {
                                isLoading === true
                                    ? <LoadingButton loading variant="contained" sx={{ width: 0.4 }}>{t("login")}</LoadingButton>
                                    : <Button variant="contained" sx={{ width: 0.4 }} onClick={handleLoginOnClick}>{t("login")}</Button>
                            }
                        </Stack>
                    </FormControl>
                </Stack>
            </Stack>
            <Stack direction="column" sx={{ width: 0.5, backgroundColor: "primary.main", justifyContent: "center", alignItems: "center" }}>
                <img src="/logo.png" width='35%'></img>
            </Stack>
        </Stack>
    )
}