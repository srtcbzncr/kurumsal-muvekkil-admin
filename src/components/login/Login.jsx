import { Grid, TextField} from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './style.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import { login } from '../../services/Auth';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from 'react-cookie';

export default function Login() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies(["user"]);
    const { t } = useTranslation();

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    async function handleLoginOnClick(){
        setIsLoading(true);
        login(username, password).then((response) => {
            if(response.status === 200){
                setCookie("username", username, { path: '/' });
                setCookie("password", password, { path: '/' });
                setCookie("role", response.data.role, { path: '/' });
            }
            else if(response.status > 400){
                toast.error(response.error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    theme : "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    hideProgressBar: true
                })
            }
            console.log(response);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
            <Grid container height='100%' justifyContent='center' alignItems='center'>
                <Grid container item xs={12} md={6} height='100%' justifyContent='center' alignItems='center' sx={{backgroundColor: 'background.default'}}>
                    <LanguageSwitcher height='10%'></LanguageSwitcher>
                    <Grid container item height='90%' direction='column' justifyContent='center' alignItems='center'>
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
                                <Button variant="contained" onClick={handleLoginOnClick}>{t('login')}</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={6} height='100%' justifyContent='center' alignItems='center' sx={{backgroundColor: 'primary.main'}}>
                    <img src="/logo.png" width='35%'></img>
                </Grid>
            </Grid>
            <ToastContainer />
        </>
    )
}