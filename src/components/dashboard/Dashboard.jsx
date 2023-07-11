import Layout from '../layout/Layout';
import './style.css';
import { Grid } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';

export default function Dashboard() {

    return (
        <AuthCheck>
            <Layout>
                <Grid container>
                    <Grid item>
                        Deneme
                    </Grid>
                </Grid>
            </Layout>
        </AuthCheck>
    )
}