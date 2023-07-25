import './style.css';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { Avatar, Box, Breadcrumbs, Button, CircularProgress, Divider, LinearProgress, Stack, Tooltip, Typography } from '@mui/material';
import { useConfirm } from "material-ui-confirm";

import { ToastContainer, toast } from 'react-toastify';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import Actions from '../actions/Actions';

import { deleteCourt, getActiveSubCourts, getAllSubCourts, getCourtById, getDeletedSubCourts, getPassiveSubCourts, getSubCourtStats, setActive, setPassive } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';
import Status from '../status/Status';


import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import DataTable from '../dataTable/DataTable';

const CourtDetails = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const confirm = useConfirm();

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [court, setCourt] = useState({});
    const [subCourts, setSubCourts] = useState([]);
    const [tab, setTab] = useState("All");
    const [allSubsCount, setAllSubsCount] = useState(0);
    const [activeSubsCount, setActiveSubsCount] = useState(0);
    const [passiveSubsCount, setPassiveSubsCount] = useState(0);
    const [deletedSubsCount, setDeletedSubsCount] = useState(0);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerClassName: 'super-app-theme--header',
            flex: 0.25,
        },
        {
            field: 'name',
            headerName: t("name"),
            headerClassName: 'super-app-theme--header',
            flex: 0.24,
        },
        {
            field: "status",
            headerName: t("status"),
            headerClassName: 'super-app-theme--header',
            flex: 0.24,
            renderCell: (params) => {
                return (
                    <Status active={params.row.active} deleted={params.row.deleted}></Status>
                )
            }
        },
        {
            field: 'actions',
            headerName: t("actions"),
            type: "actions",
            headerClassName: 'super-app-theme--header',
            flex: 0.27,
            renderCell: (params) => {
                return (
                    <Actions id={params.row.id} url="/courts" isDetails={false} size="medium" active={params.row.active} deleted={params.row.deleted} setActiveFunc={setActiveRequest} setPassiveFunc={setPassiveRequest} deleteFunc={handleDeleteOnClick}></Actions>
                );
            },
        },
    ];

    function fetchCourtDetails() {
        setIsLoading(true);
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

    function fetchSubCourts() {
        setIsLoading(true);
        if(tab === "All"){
            getAllSubCourts(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setSubCourts(response.data.data);
            }).catch((error) => {
                if (error.response.data.status === 401) {
                    navigate("/login");
                  }
                  else if (error.response.data.status === 403) {
                    navigate("/login");
                  }
                  else {
                    console.log("Bilinmeyen hata");
                  }
            }).finally(() => {
                setIsLoading(false);
            });
        }
        else if(tab === "Active"){
            getActiveSubCourts(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setSubCourts(response.data.data);
            }).catch((error) => {
                if (error.response.data.status === 401) {
                    navigate("/login");
                  }
                  else if (error.response.data.status === 403) {
                    navigate("/login");
                  }
                  else {
                    console.log("Bilinmeyen hata");
                  }
            }).finally(() => {
                setIsLoading(false);
            });
        }
        else if(tab === "Passive"){
            getPassiveSubCourts(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setSubCourts(response.data.data);
            }).catch((error) => {
                if (error.response.data.status === 401) {
                    navigate("/login");
                  }
                  else if (error.response.data.status === 403) {
                    navigate("/login");
                  }
                  else {
                    console.log("Bilinmeyen hata");
                  }
            }).finally(() => {
                setIsLoading(false);
            });
        }
        if(tab === "Deleted"){
            getDeletedSubCourts(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setSubCourts(response.data.data);
            }).catch((error) => {
                if (error.response.data.status === 401) {
                    navigate("/login");
                  }
                  else if (error.response.data.status === 403) {
                    navigate("/login");
                  }
                  else {
                    console.log("Bilinmeyen hata");
                  }
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    function fetchStats() {
        getSubCourtStats(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setAllSubsCount(response.data.data.allCount);
            setActiveSubsCount(response.data.data.activeCount);
            setPassiveSubsCount(response.data.data.passiveCount);
            setDeletedSubsCount(response.data.data.deletedCount);
        }).catch((error) => {
            if (error.response.data.status === 401) {
                navigate("/login");
            }
            else if (error.response.data.status === 403) {
                navigate("/login");
            }
            else {
                console.log("Bilinmeyen hata");
            }
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
            fetchCourtDetails();
            fetchStats();
            fetchSubCourts();
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
            fetchCourtDetails();
            fetchStats();
            fetchSubCourts();
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
            fetchCourtDetails();
            fetchStats();
            fetchSubCourts();
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

    function handleBackOnClick() {
        navigate("/courts");
    }

    function handleSelectTab(value) {
        setTab(value);
      }

    useEffect(() => {
        fetchStats();
        fetchCourtDetails();
        fetchSubCourts();
    }, [id, tab]);

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    {/* Title */}
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
                        <Typography variant="h4">
                            {t("court.management")}
                        </Typography>
                        <Tooltip title={t("back")}>
                            <Button variant="outlined" color="text" onClick={handleBackOnClick}>
                                <ArrowBackSharpIcon color="text" />
                            </Button>
                        </Tooltip>
                    </Stack>
                    {/* Title */}
                    {/* Navigation */}
                    <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                {t("home")}
                            </Link>
                            <Link underline="hover" color="inherit" href="/courts">
                                {t("court.management")}
                            </Link>
                            <Typography color="text.primary">{court.name}</Typography>
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
                                <Stack direction={{ xs: "column", sm: "row" }} sx={{ width: 1, padding: "30px", border: 1, borderColor: "border.secondary", justifyContent: {xs: "center", sm: "space-between"} }}>
                                    <Stack direction="column" spacing={1} sx={{ width: {xs: 1, sm: 0.3}, alignItems: "center" }}>
                                        <Typography variant="h5">{t("court.name")}</Typography>
                                        <Typography variant="subtitle1">{court.name}</Typography>
                                    </Stack>
                                    <Divider width="3px" color="#FAF7FF" orientation="vertical" flexItem />
                                    <Stack direction="column" spacing={1} sx={{ width: {xs: 1, sm: 0.3}, alignItems: "center" }} marginTop={{ xs: "20px", sm: "0px" }}>
                                        <Typography variant="h5">{t("court.parent")}</Typography>
                                        {
                                            court.parent === null || court.parent === undefined
                                                ? <Typography variant="subtitle1"><HighlightOffSharpIcon color="error" fontSize="medium" /></Typography>
                                                : <Typography variant="subtitle1">{court.parent.name}</Typography>
                                        }
                                    </Stack>
                                    <Divider width="3px" color="#FAF7FF" orientation="vertical" flexItem />
                                    <Box display="flex" sx={{ width: {xs: 1, sm: 0.2}, alignItems: "center", justifyContent: "center"}}>
                                        <Status active={court.active} deleted={court.deleted} ></Status>
                                    </Box>
                                    <Divider width="3px" color="#FAF7FF" orientation="vertical" flexItem />
                                    <Box display="flex" sx={{ width: {xs: 1, sm: 0.2}, alignItems: "center", justifyContent: "center"}}>
                                        <Actions id={court.id} isDetails={true} size="large" active={court.active} deleted={court.deleted} setActiveFunc={setActiveRequest} setPassiveFunc={setPassiveRequest} deleteFunc={handleDeleteOnClick}></Actions>
                                    </Box>
                                </Stack>
                                <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ width: 1, justifyContent: "space-between", padding: "20px", border: 1, borderColor: "border.secondary" }}>
                                    <Typography variant="h5">{t("court.subs")}</Typography>
                                    <Stack id="main" direction={{ xs: "column", md: "row" }} spacing={2} sx={{ justifyContent: "flex-start" }}>
                                        <Button onClick={() => handleSelectTab("All")} sx={{ color: tab === "All" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "All" && 2, borderColor: tab === "All" && "text.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("all")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "text.main" }}>{allSubsCount}</Avatar></Button>
                                        <Button onClick={() => handleSelectTab("Active")} sx={{ color: tab === "Active" ? "success.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Active" && 2, borderColor: tab === "Active" && "success.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("active")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "success.main" }}>{activeSubsCount}</Avatar></Button>
                                        <Button onClick={() => handleSelectTab("Passive")} sx={{ color: tab === "Passive" ? "warning.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Passive" && 2, borderColor: tab === "Passive" && "warning.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("passive")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "warning.main" }}>{passiveSubsCount}</Avatar></Button>
                                        <Button onClick={() => handleSelectTab("Deleted")} sx={{ color: tab === "Deleted" ? "error.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Deleted" && 2, borderColor: tab === "Deleted" && "error.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("deleted")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "error.main" }}>{deletedSubsCount}</Avatar></Button>
                                    </Stack>
                                </Stack>
                                <DataTable height="450px" isLoading={isLoading} columns={columns} data={subCourts} />
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