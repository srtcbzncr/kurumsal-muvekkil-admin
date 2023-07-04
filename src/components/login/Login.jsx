import { Grid, TextField} from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './style.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import useLogin from '../../apis/auth/useLogin';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [setRequest, isLoading, response, error] = useLogin(username, password);
    const { t } = useTranslation();
    const [alertOpen, setAlertOpen] = React.useState(false);

    function updateUsername(event) {
        setUsername(event.target.value);
    }

    function updatePassword(event) {
        setPassword(event.target.value);
    }

    function login(event){
        setRequest(true);
    }

    function andleClick(){
        setAlertOpen(true);
      };
    
    function alertHandleClose(event, reason){
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertOpen(false);
    };

    return (
        <>
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
                    <img src="/logo.png" width='35%'></img>
                </Grid>
            </Grid>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={alertHandleClose}>
            <Alert onClose={alertHandleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
            </Snackbar>
        </>
    )
}