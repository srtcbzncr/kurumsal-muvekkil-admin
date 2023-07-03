import { Grid, Stack, TextField, Button} from '@mui/material';
import './style.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';

export default function Login() {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const { t } = useTranslation();

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <Grid container height='100%' justifyContent='center' alignItems='center'>
            <Grid container item md={6} height='100%' justifyContent='center' alignItems='center' sx={{backgroundColor: 'primary.main'}}>
                <img src="/logo.png" width='30%'></img>
            </Grid>
            <Grid container item md={6} height='100%' justifyContent='center' alignItems='center' sx={{backgroundColor: 'background.default'}}>
                <LanguageSwitcher></LanguageSwitcher>
                <Grid container item height='100%' direction='column' justifyContent='center' alignItems='center'>
                    <Stack width='50%' justifyContent='center'>
                        <h2 className='title'>Kurumsal Müvekkil Yönetici Girişi</h2>
                        <TextField fullWidth id="username" name='username' margin='normal' type='text' label={t('username')} variant="standard" onChange={updateUsername}/>
                        <TextField fullWidth id="password" name='password' margin='normal' type='password' label={t('password')} variant="standard" onChange={updatePassword}/>
                    </Stack>
                    <Stack className='buttons' width='50%' direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="text">{t('forgotPassword')}</Button>
                        <Button variant="contained">{t('login')}</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}