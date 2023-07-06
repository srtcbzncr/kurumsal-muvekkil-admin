import './style.css';
import { Grid } from '@mui/material';
import Menu from '../menu/Menu';
import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

export default function Layout ({ children }) {
    const auth = useAuth();

    console.log(auth);

    if(auth === true) {
        return (
            <Grid container height='100%' spacing={2}>
                <Grid item height='100%' sx={{backgroundColor: 'primary.main'}}>
                    <Menu></Menu>
                </Grid>
                <Grid item height='100%'>
                    {children}
                </Grid>
            </Grid>
        )
    }
    else{
        return (
            <Navigate to="/login" replace={true}/>
        )
    }
}