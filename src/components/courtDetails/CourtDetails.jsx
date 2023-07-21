import './style.css';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { Box, Breadcrumbs, Button, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import { useConfirm } from "material-ui-confirm";

import { ToastContainer, toast } from 'react-toastify';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import Actions from '../actions/Actions';

import { deleteCourt, getCourtById, setActive, setPassive } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';
import Status from '../status/Status';

const CourtDetails = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const confirm = useConfirm();

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [court, setCourt] = useState({});

    function fetchCourtDetails(id) {
        getCourtById(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setCourt(response.data.data);
        }).catch((error) => {
            toast.error(error.response.data.error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    function setActiveRequest(id) {
        setIsLoading(true);
        setActive(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            toast.success(t("court.set.active.success"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            fetchCourtDetails(id);
        }).catch((error) => {
            toast.error(error.response.data.error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    function setPassiveRequest(id) {
        setIsLoading(true);
        setPassive(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            toast.success(t("court.set.passive.success"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            fetchCourtDetails(id);
        }).catch((error) => {
            toast.error(error.response.data.error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    function deleteRequest(id) {
        setIsLoading(true);
        deleteCourt(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            toast.success(t("court.delete.success"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            navigate("/courts");
        }).catch((error) => {
            toast.error(error.response.data.error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    function handleDeleteOnClick(id) {
        confirm({ title: t("warning"), description: t("court.before.delete.warning"), confirmationText: t("yes"), cancellationText: t("no") }).then(() => {
            deleteRequest(id);
        }).catch(() => {
            console.log("Cancel");
        });
    }

    useEffect(() => {
        fetchCourtDetails(id);
    }, []);

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    {/* Title */}
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
                        <Typography variant="h4">
                            {t("court.management")}
                        </Typography>
                    </Stack>
                    {/* Title */}
                    {/* Navigation */}
                    <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                {t("home")}
                            </Link>
                            <Link underline="hover" color="inherit" href="/">
                                {t("court.management")}
                            </Link>
                            <Typography color="text.primary">{t("court.management")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    {/* Navigation */}
                    {/* Loading */}
                    {
                        isLoading === true
                            ?
                            <Box sx={{ width: '80%', marginTop: "25px" }}>
                                <LinearProgress />
                            </Box>
                            :
                            /* Main */
                            <Stack id="main" direction="column" sx={{ width: 0.8, backgroundColor: "secondary.main", marginTop: "25px" }}>
                                <Stack direction={{ xs: "column", sm: "row" }} sx={{ width: 1, padding: "30px", border: 1, borderColor: "border.secondary", justifyContent: "space-between" }}>
                                    <Stack direction="column" spacing={1} sx={{alignItems: "center"}}>
                                        <Typography variant="h5">{t("court.name")}</Typography>
                                        <Typography variant="subtitle1">{court.name}</Typography>
                                    </Stack>
                                    <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
                                        <Typography variant="h5">{t("court.parent")}</Typography>
                                        {
                                            court.parent === null || court.parent === undefined
                                                    ? <Typography variant="h5">Null</Typography>
                                                    : <Typography variant="subtitle">{court.parent.name}</Typography>
                                        }
                                    </Stack>
                                    <Status active={court.active} deleted={court.deleted}></Status>
                                    <Actions id={court.id} isDetails={true} size="large" active={court.active} deleted={court.deleted} setActiveFunc={setActiveRequest} setPassiveFunc={setPassiveRequest} deleteFunc={handleDeleteOnClick}></Actions>
                                </Stack>
                            </Stack>
                        /* Main */

                    }
                    {/* Loading */}
                </Stack>
            </Layout>
            <ToastContainer />
        </AuthCheck>
    )
}

export default CourtDetails