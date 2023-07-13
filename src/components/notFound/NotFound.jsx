import "./style.css"
import { Card, CardContent, Typography, CardActions, Button, Grid } from "@mui/material"
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

export default function NotFound(){
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid container item justifyContent="center" alignItems="center">
                <Grid container item justifyContent="center">
                    <ClearSharpIcon sx={{ fontSize: "120px", color: "error.main" }}></ClearSharpIcon>
                </Grid>
                <Grid container item justifyContent="center">
                    <Typography sx={{ fontSize: "30px" }}>Not found</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}