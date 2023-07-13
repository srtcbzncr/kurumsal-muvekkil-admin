import './style.css';
import { Grid } from '@mui/material';
import Menu from '../menu/Menu';

export default function Layout ({ children }) {
    return (
        <Grid container height='100%'>
            <Grid container item md={2} height='100%' sx={{backgroundColor: 'primary.main', minWidth: "300px"}}>
                <Menu></Menu>
            </Grid>
            <Grid container item direction="column" md={10} paddingLeft="50px" paddingRight="50px">
                {children}
            </Grid>
        </Grid>
    )
}