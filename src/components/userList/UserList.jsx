import { Avatar, Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import './style.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../../services/UserService';
import getAuthHeader from '../../helpers/getAuthHeader';
import { setPassive } from '../../services/PlanService';
import { ToastContainer, toast } from 'react-toastify';

const UserList = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [tab, setTab] = useState("All");
    const [allCount, setAllCount] = useState(null);
    const [activeCount, setActiveCount] = useState(null);
    const [passiveCount, setPassiveCount] = useState(null);
    const [deletedCount, setDeletedCount] = useState(null);


    function fetchStats() {
        setIsLoading(true);
        getAdminStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setAllCount(response.data.data.allCount);
            setActiveCount(response.data.data.activeCount);
            setPassiveCount(response.data.data.passiveCount);
            setDeletedCount(response.data.data.deletedCount);
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

    function handleNewOnClick() {
        navigate("/users/create");
    }

    function handleSelectTab(tab) {
        setTab(tab);
    }

    useEffect(() => {
        fetchStats();
    }, [tab]);

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    {/* Title */}
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
                        <Typography variant="h4">
                            {t("user.management")}
                        </Typography>
                        <Button variant="contained" onClick={handleNewOnClick}>
                            <AddSharpIcon />
                        </Button>
                    </Stack>
                    {/* Title */}
                    {/* Navigation */}
                    <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                {t("home")}
                            </Link>
                            <Typography color="text.primary">{t("user.management")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    {/* Navigation */}
                    <Stack id="main" direction="column" sx={{ width: 0.8, backgroundColor: "secondary.main", marginTop: "25px" }}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 1, justifyContent: "space-between", padding: "20px", border: 1, borderColor: "border.secondary" }}>
                            <Typography variant="h6">{t("user.list")}</Typography>
                            <Stack id="main" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "flex-start" }}>
                                <Button onClick={() => handleSelectTab("All")} sx={{ color: tab === "All" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "All" && 2, borderColor: tab === "All" && "text.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("all")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "text.main" }}>{allCount}</Avatar></Button>
                                <Button onClick={() => handleSelectTab("Active")} sx={{ color: tab === "Active" ? "success.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Active" && 2, borderColor: tab === "Active" && "success.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("active")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "success.main" }}>{activeCount}</Avatar></Button>
                                <Button onClick={() => handleSelectTab("Passive")} sx={{ color: tab === "Passive" ? "warning.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Passive" && 2, borderColor: tab === "Passive" && "warning.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("passive")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "warning.main" }}>{passiveCount}</Avatar></Button>
                                <Button onClick={() => handleSelectTab("Deleted")} sx={{ color: tab === "Deleted" ? "error.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Deleted" && 2, borderColor: tab === "Deleted" && "error.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("deleted")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "error.main" }}>{deletedCount}</Avatar></Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Layout>
            <ToastContainer />
        </AuthCheck>
    )
}

export default UserList;