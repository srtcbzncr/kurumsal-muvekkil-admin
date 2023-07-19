import { Typography, TextField, Alert, CircularProgress, FormControl } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './style.css';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import { login } from '../../services/AuthService';
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

export default function Login() {

    const { t } = useTranslation();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(t("error.undefined"));
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    useEffect(() => {
        if(cookie.username !== undefined && cookie.password !== undefined ){
            navigate("/");
        }
    })

    async function handleLoginOnClick(){
        setError(false);
        setIsLoading(true);
        login(username, password).then((response) => {
            if(response.status === 200){
                setCookie("username", username, { path: '/' });
                setCookie("password", password, { path: '/' });
                setCookie("role", response.data.data.role, { path: '/' });
                navigate("/");
            }
            else if(response.status >= 400){
                console.log(response.data.error.message);
                setError(true);
                setErrorMessage(response.data.error.message);
            }
        }).catch((error) => {
            setError(true);
            setErrorMessage(t("error.undefined"));
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Stack direction="row" sx={{ width: 1, height: 1 }}>
            <Stack direction="column" sx={{ width: 0.5, alignItems: "center"}}>
                <LanguageSwitcher></LanguageSwitcher>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    <Typography variant="h3" sx={{ marginTop: "200px"}}>
                        {t("admin.login")}
                    </Typography>
                    {
                        isLoading === true &&
                        <CircularProgress sx={{ marginTop: "50px" }} />
                    }
                    {
                        error === true &&
                        <Alert variant="filled" severity="error" sx={{ marginTop: "50px", width: "50%" }}>
                            { errorMessage }
                        </Alert>
                    }
                    <FormControl sx={{ width: 0.5, marginTop: "25px"}}>
                        <TextField fullWidth id="username" name='username' margin='normal' type='text' label={t('username')} variant="standard" onChange={updateUsername}/>
                        <TextField fullWidth id="password" name='password' margin='normal' type='password' label={t('password')} variant="standard" onChange={updatePassword}/>       
                        <Stack className='buttons' direction="row" spacing={2} justifyContent="flex-end" sx={{ marginTop: "25px" }}>
                            <Button variant="text">{t('password.forget')}</Button>
                            <Button variant="contained" onClick={handleLoginOnClick}>{t('login')}</Button>
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