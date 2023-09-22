import { Button, Card, CardActions, CardContent, Typography, Stack } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router'

const DashboardItem = ({width, color, textColor, icon, title, value, actionUrl}) => {

    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    function handleActionOnClick() {
        navigate(actionUrl);
    }

    return (
        <Card sx={{ minWidth: 275, width: width, backgroundColor: color === null || color === "" || color === undefined ? "ffffff" : color, padding: "5px" }} variant="outlined">
            <CardContent>
                <Stack direction="row" sx={{ justifyContent: "space-between"}}>
                    <Typography sx={{ color: textColor === null || textColor === "" || textColor === undefined ? "primary" : textColor}} variant="h6" gutterBottom>
                        {title} 
                    </Typography>
                    <Button variant="text" color="primary" href={actionUrl}>{t("detail")}</Button>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between", marginTop: "10px"}}>
                    <Stack sx={{ width: 0.8}}>
                        <Typography sx={{ color: textColor === null || textColor === "" || textColor === undefined ? "primary" : textColor}} variant="h2" component="div">
                            {value}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ width: 0.2, alignItems: "center"}}>
                        {icon}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default DashboardItem