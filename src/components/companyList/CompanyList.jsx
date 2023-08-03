import './style.css';

import React from 'react';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useConfirm } from 'material-ui-confirm';

import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

import getAuthHeader from '../../helpers/getAuthHeader';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import DataTable from '../dataTable/DataTable';
import { Link } from 'react-router-dom';
import { getAllCompanies, getStats } from '../../services/CompanyService';

const CompanyList = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const confirm = useConfirm();

    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState("All");
    const [allCount, setAllCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [passiveCount, setPassiveCount] = useState(0);
    const [deletedCount, setDeletedCount] = useState(0);
    const [companies, setCompanies] = useState([]);

    function fetchCompanies(){
        setIsLoading(true);
        getAllCompanies(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setCompanies(response.data.data);
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

    function fetchStats(){
        getStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setIsLoading(true);
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

    useEffect(() => {
        fetchCompanies();
        fetchStats();
    }, [tab]);
    
    function handleNewClick() {
        navigate("/companies/create");
    }

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    {/* Title */}
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
                        <Typography variant="h4">
                            {t("customer.management")}
                        </Typography>
                        <Button variant="contained" onClick={handleNewClick}>
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
                            <Typography color="text.primary">{t("customer.management")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    {/* Navigation */}
                </Stack>
            </Layout>
            <ToastContainer/>
        </AuthCheck>
    )
}

export default CompanyList;