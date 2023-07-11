import './style.css';
import { Grid } from '@mui/material';
import Menu from '../menu/Menu';

export default function Layout ({ children }) {
    return (
        <Grid container height='100%' spacing={2}>
            <Grid container item md={2} height='100%' sx={{backgroundColor: 'primary.main'}}>
                <Menu></Menu>
            </Grid>
            <Grid container item md={10} alignItems="flex-start" spacing={2}>
                {children}
            </Grid>
        </Grid>
    )
}