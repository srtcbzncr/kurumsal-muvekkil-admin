import { Alert, Box, Breadcrumbs, Button, FormControl, InputLabel, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import './style.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import createCourtPNG from '../../illustrations/createCourt.png';
import donePNG from '../../illustrations/done.png';
import { LoadingButton } from '@mui/lab';

const CreatePlan = () => {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    function handleBackOnClick() {
        navigate("/plans");
    }

    function handleNewPlanOnClick() {

    }

    function handleSaveOnClick() {

    }

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: { xs: "center", sm: "flex-start" }, alignItems: { xs: "center", sm: "center" } }}>
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
                        <Typography variant="h4">
                            {t("plan.create")}
                        </Typography>
                        <Tooltip title={t("back")}>
                            <Button variant="outlined" color="text" onClick={handleBackOnClick}>
                                <ArrowBackSharpIcon color="text" />
                            </Button>
                        </Tooltip>
                    </Stack>
                    <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                {t("home")}
                            </Link>
                            <Link underline="hover" color="inherit" href="/courts">
                                {t("plan.management")}
                            </Link>
                            <Typography color="text.primary">{t("plan.create")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    {
                        isDone === false
                            ?
                            <FormControl display="flex" sx={{ width: 1 }}>
                                <Stack id="main" direction="column" sx={{ width: 1, justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                                    <Stack direction={{ xs: "column", sm: "row" }} sx={{ border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "20px" }, paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                                        <Stack direction="column" sx={{ width: 0.4 }}>
                                            <Typography variant="h5" color="text">
                                                {t("infos.general")}
                                            </Typography>
                                            <Typography variant="caption" color="text">
                                                {t("infos.general.caption")}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="column" sx={{ width: 0.6 }}>
                                            <TextField id="name" label={t("name")} variant="outlined" />
                                            <TextField id="description" label={t("description")} variant="outlined" multiline rows={6} maxRows={6} sx={{ marginTop: "20px" }} />
                                        </Stack>
                                    </Stack>
                                    <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginTop: "30px", border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "20px" }, paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                                        <Stack direction="column" sx={{ width: 0.4 }}>
                                            <Typography variant="h5" color="text">
                                                {t("infos.price")}
                                            </Typography>
                                            <Typography variant="caption" color="text">
                                                {t("infos.price.caption")}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="column" sx={{ width: 0.6 }}>
                                            <TextField id="monthlyPrice" label={t("price.monthly")} variant="outlined" type="number" />
                                            <TextField id="annualPrice" label={t("price.annual")} variant="outlined" type="number" sx={{ marginTop: "20px" }} />
                                        </Stack>
                                    </Stack>
                                    <Stack direction={{ xs: "column", sm: "row" }} sx={{ marginTop: "30px", border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "30px" }, paddingRight: { xs: "0px", sm: "30px" }, paddingTop: "30px", paddingBottom: "30px" }}>
                                        <Stack direction="column" sx={{ width: 0.4 }}>
                                            <Typography variant="h5" color="text">
                                                {t("infos.quota")}
                                            </Typography>
                                            <Typography variant="caption" color="text">
                                                {t("infos.quota.caption")}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="column" sx={{ width: 0.6 }}>
                                            <TextField id="clientQuota" label={t("quota.client")} variant="outlined" type="number" />
                                            <TextField id="lawyerQuota" label={t("quota.lawyer")} variant="outlined" type="number" sx={{ marginTop: "20px" }} />
                                            <TextField id="fileQuota" label={t("quota.file.per.client")} variant="outlined" type="number" sx={{ marginTop: "20px" }} />
                                        </Stack>
                                    </Stack>
                                    <Stack direction="row" spacing={2} sx={{ width: 0.8, justifyContent: "flex-end", marginTop: "30px", marginBottom: "30px" }}>
                                        <Button variant="outlined" type="submit" size="large" color="text" onClick={handleBackOnClick}>{t("cancel")}</Button>
                                        {
                                            isLoading === true
                                            ? <LoadingButton loading variant="contained" size="large">{t("save")}</LoadingButton>
                                            : <Button variant="contained" type="submit" size="large" onClick={handleSaveOnClick}>{t("save")}</Button>
                                        }
                                    </Stack>
                                </Stack>
                            </FormControl>
                            :
                            <Stack id="main" direction={{ xs: "column", sm: "row" }} sx={{ width: 0.8, justifyContent: "center", alignItems: "center", backgroundColor: "secondary.main", marginTop: "25px", paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>

                            </Stack>
                    }
                </Stack>
            </Layout>
        </AuthCheck>
    )
}

export default CreatePlan;