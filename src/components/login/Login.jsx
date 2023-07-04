import { Grid, Stack, TextField, Button} from '@mui/material';
import './style.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import useLogin from '../../apis/auth/useLogin';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [setRequest, isLoading, response, error] = useLogin(username, password);
    const { t } = useTranslation();

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function login(event){
        setRequest(true);
    }

    return (
        <Grid container height='100%' justifyContent='center' alignItems='center'>
            <Grid container item xs={12} md={6} height='100%' justifyContent='center' alignItems='center' sx={{backgroundColor: 'background.default'}}>
                <LanguageSwitcher></LanguageSwitcher>
                <Grid container item height='100%' direction='column' justifyContent='center' alignItems='center'>
                    <Grid container item height='40%' justifyContent='center' alignItems='center'>
                        <h1 className='title'>{t('adminLogin')}</h1>
                    </Grid>
                    <Grid container item height='60%' direction='column' justifyContent='flex-start' alignItems='center'>
                        <Stack width='50%' justifyContent='center'>
                            <TextField fullWidth id="username" name='username' margin='normal' type='text' label={t('username')} variant="standard" onChange={updateUsername}/>
                            <TextField fullWidth id="password" name='password' margin='normal' type='password' label={t('password')} variant="standard" onChange={updatePassword}/>
                        </Stack>
                        <Stack className='buttons' width='50%' direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="text">{t('forgotPassword')}</Button>
                            <Button variant="contained" onClick={login}>{t('login')}</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} md={6} height='100%' justifyContent='center' alignItems='center' sx={{backgroundColor: 'primary.main'}}>
                <img src="/logo.png" width='30%'></img>
            </Grid>
        </Grid>
    )
}