import { Button, Card, CardActions, CardContent, Typography, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const DashboardItem = ({width, color, textColor, icon, title, value, actionUrl}) => {

    const navigate = useNavigate();

    function handleActionOnClick() {
        navigate(actionUrl);
    }

    return (
        <Card sx={{ minWidth: 275, width: width, backgroundColor: color === null || color === "" || color === undefined ? "ffffff" : color }} variant="outlined">
            <CardContent>
                <Typography sx={{ color: textColor === null || textColor === "" || textColor === undefined ? "primary" : textColor}} variant="h6" gutterBottom>
                    {title} 
                </Typography>
                <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                    <Stack sx={{ width: 0.65, marginTop: "10px" }}>
                        <Typography sx={{ color: textColor === null || textColor === "" || textColor === undefined ? "primary" : textColor}} variant="h2" component="div">
                            {value}
                        </Typography>
                    </Stack>
                    <Stack sx={{ width: 0.35, justifyContent: "flex-end" }}>
                        <img src={icon} sx={{ width: 1 }}></img>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default DashboardItem