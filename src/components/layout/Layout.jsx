import './style.css';
import { Grid } from '@mui/material';
import Menu from '../menu/Menu';

export default function Layout ({ children }) {
    return (
        <Grid container height='100%'>
            <Grid container item md={2} height='100%' sx={{backgroundColor: 'primary.main'}}>
                <Menu></Menu>
            </Grid>
            <Grid container item md={10} paddingLeft="50px" paddingRight="50px">
                {children}
            </Grid>
        </Grid>
    )
}