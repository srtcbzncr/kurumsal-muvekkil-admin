import './style.css';
import { Grid } from '@mui/material';
import Menu from '../menu/Menu';

export default function Layout ({ children }) {


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