import "./style.css";
import { Grid, Stack, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import AuthCheck from "../authCheck/AuthCheck";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import CourtService from "../../services/CourtService";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

export default function CourtList() {


    /*useEffect(() => {
        CourtService.getAll("authorization", "locale").then((response) => {

        }).catch((error) => {

        });
    });*/

    return (
        <AuthCheck>
            <Layout>
                <Grid item xs={8}>
                    <div>xs=8</div>
                </Grid>
                <Grid item xs={4}>
                    <div>xs=4</div>
                </Grid>
                <Grid item xs={4}>
                    <div>xs=4</div>
                </Grid>
                <Grid item xs={8}>
                    <div>xs=8</div>
                </Grid>
            </Layout>
        </AuthCheck>
    )
}