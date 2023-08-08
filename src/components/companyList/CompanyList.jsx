import './style.css';

import React from 'react';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useConfirm } from 'material-ui-confirm';

import { Box, Breadcrumbs, Button, Stack, Typography, Avatar, InputBase, IconButton } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import Status from '../status/Status';
import Actions from '../actions/Actions';

import getAuthHeader from '../../helpers/getAuthHeader';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import DataTable from '../dataTable/DataTable';
import { Link } from 'react-router-dom';
import { deleteCompany, getAllCompanies, getActiveCompanies, getPassiveCompanies, getDeletedCompanies, getStats, setActive, setPassive } from '../../services/CompanyService';

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
            flex: 0.12,
        },
        {
            field: 'lawyer-count',
            headerName: t("lawyer.count"),
            headerClassName: 'super-app-theme--header',
            flex: 0.12,
            renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="center">
                        {
                            params.row.lawyerCount
                        }
                    </Box>
                )
            }
        },
        {
            field: 'plan',
            headerName: t("plan"),
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
            renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="center">
                        {
                            params.row.plan
                        }
                    </Box>
                )
            }
        },
        {
            field: "status",
            headerName: t("status"),
            headerClassName: 'super-app-theme--header',
            flex: 0.15,
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
            flex: 0.21,
            renderCell: (params) => {
                return (
                    <Actions id={params.row.id} url="/courts" isDetails={false} size="medium" active={params.row.active} deleted={params.row.deleted} setActiveFunc={setActiveRequest} setPassiveFunc={setPassiveRequest} deleteFunc={handleDeleteOnClick}></Actions>
                );
            },
        },
    ];

    function fetchCompanies() {
        if (tab === "Active") {
            getActiveCompanies(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
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
        else if (tab === "Passive") {
            getPassiveCompanies(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
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
        else if (tab === "Deleted") {
            getDeletedCompanies(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
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
        else {
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
    }

    function fetchStats() {
        getStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
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

    function handleNewClick() {
        navigate("/companies/create");
    }

    function handleSelectTab(tab) {
        setTab(tab);
    }

    function setActiveRequest(id) {
        setIsLoading(true);
        setActive(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            toast.success(t("company.set.active.success"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            fetchStats();
            fetchCompanies();
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
            toast.success(t("company.set.passive.success"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            fetchStats();
            fetchCompanies();
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
        deleteCompany(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            toast.success(t("company.delete.success"), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            fetchStats();
            fetchCompanies();
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
        confirm({ title: t("warning"), description: t("company.before.delete.warning"), confirmationText: t("yes"), cancellationText: t("no") }).then(() => {
            deleteRequest(id);
        })
            .catch(() => {
                console.log("Cancel");
            });
    }

    useEffect(() => {
        setIsLoading(true);
        fetchCompanies();
        fetchStats();
    }, [tab]);

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    {/* Title */}
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
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
                    {/* Main */}
                    <Stack id="main" direction="column" sx={{ width: 0.8, backgroundColor: "secondary.main", marginTop: "25px" }}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 1, justifyContent: "space-between", padding: "20px", border: 1, borderColor: "border.secondary" }}>
                            <Typography variant="h6">{t("customer.list")}</Typography>
                            <Stack id="main" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "flex-start" }}>
                                <Button onClick={() => handleSelectTab("All")} sx={{ color: tab === "All" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "All" && 2, borderColor: tab === "All" && "text.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("all")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "text.main" }}>{allCount}</Avatar></Button>
                                <Button onClick={() => handleSelectTab("Active")} sx={{ color: tab === "Active" ? "success.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Active" && 2, borderColor: tab === "Active" && "success.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("active")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "success.main" }}>{activeCount}</Avatar></Button>
                                <Button onClick={() => handleSelectTab("Passive")} sx={{ color: tab === "Passive" ? "warning.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Passive" && 2, borderColor: tab === "Passive" && "warning.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("passive")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "warning.main" }}>{passiveCount}</Avatar></Button>
                                <Button onClick={() => handleSelectTab("Deleted")} sx={{ color: tab === "Deleted" ? "error.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Deleted" && 2, borderColor: tab === "Deleted" && "error.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("deleted")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "error.main" }}>{deletedCount}</Avatar></Button>
                            </Stack>
                        </Stack>
                        {/* Search */}
                        <Stack id="search" direction="row" sx={{ width: 1, border: 1, borderColor: "border.secondary" }}>
                            <InputBase
                                sx={{ ml: 1, paddingLeft: "10px", flex: 1 }}
                                placeholder="Search"
                                type="search"
                            />
                            <IconButton color="primary" size="large" sx={{ marginRight: "5px" }}>
                                <SearchSharpIcon />
                            </IconButton>
                        </Stack>
                        {/* Search */}
                        {/* Data */}
                        <DataTable height="600px" isLoading={isLoading} columns={columns} data={companies} />
                        {/* Data */}
                    </Stack>
                    {/* Main */}
                </Stack>
            </Layout>
            <ToastContainer />
        </AuthCheck>
    )
}

export default CompanyList;