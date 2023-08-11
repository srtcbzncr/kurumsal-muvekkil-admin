import { Avatar, Box, Breadcrumbs, Button, IconButton, InputBase, Stack, Typography } from '@mui/material';
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
import { deleteUser, getActiveAdmins, getAdminStats, getAllAdmins, getDeletedAdmins, getPassiveAdmins, setActive, setPassive } from '../../services/UserService';
import getAuthHeader from '../../helpers/getAuthHeader';
import { ToastContainer, toast } from 'react-toastify';
import DataTable from '../dataTable/DataTable';
import Status from '../status/Status';
import Actions from '../actions/Actions';
import { useConfirm } from 'material-ui-confirm';

const UserList = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const confirm = useConfirm();

    const [isLoading, setIsLoading] = useState(false);

    const [tab, setTab] = useState("All");
    const [admins, setAdmins] = useState([]);
    const [allCount, setAllCount] = useState(null);
    const [activeCount, setActiveCount] = useState(null);
    const [passiveCount, setPassiveCount] = useState(null);
    const [deletedCount, setDeletedCount] = useState(null);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerClassName: 'super-app-theme--header',
            flex: 0.25,
        },
        {
            field: 'username',
            headerName: t("username"),
            headerClassName: 'super-app-theme--header',
            flex: 0.1,
        },
        {
          field: 'email',
          headerName: t("email"),
          headerClassName: 'super-app-theme--header',
          flex: 0.1,
        },
        {
          field: 'role',
          headerName: t("role"),
          headerClassName: 'super-app-theme--header',
          flex: 0.1,
          renderCell: (params) => {
            return params.row.role.name === "ROLE_ADMIN" ? t("role.admin") : params.row.role.name === "ROLE_CLIENT" ? t("role.client") : t("role.lawyer");
        }
        },
        {
            field: "status",
            headerName: t("status"),
            headerClassName: 'super-app-theme--header',
            flex: 0.1,
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
            flex: 0.15,
            renderCell: (params) => {
                return (
                    <Actions id={params.row.id} url="/users" isDetails={false} size="medium" active={params.row.active} deleted={params.row.deleted} setActiveFunc={setActiveRequest} setPassiveFunc={setPassiveRequest} deleteFunc={handleDeleteOnClick}></Actions>
                );
            },
        },
      ];

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

    function fetchAdmins() {
        setIsLoading(true);
        if (tab === "Active") {
            getActiveAdmins(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setAdmins(response.data.data);
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
            getPassiveAdmins(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setAdmins(response.data.data);
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
            getDeletedAdmins(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setAdmins(response.data.data);
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
            getAllAdmins(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
                setAdmins(response.data.data);
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

    function handleNewOnClick() {
        navigate("/users/create");
    }

    function handleSelectTab(tab) {
        setTab(tab);
    }

    function handleDeleteOnClick(id) {
        confirm({ title: t("warning"), description: t("user.before.delete.warning"), confirmationText: t("yes"), cancellationText: t("no") }).then(() => {
          deleteRequest(id);
        }).catch(() => {
              console.log("Cancel");
          });
      }

    function setActiveRequest(id) {
        setIsLoading(true);
        setActive(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            fetchStats();
            fetchAdmins();
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
            fetchStats();
            fetchAdmins();
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
        deleteUser(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            fetchStats();
            fetchAdmins();
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
        fetchStats();
        fetchAdmins();
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
                    {/* Main */}
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
                        <DataTable height="600px" isLoading={isLoading} columns={columns} data={admins} />
                        {/* Data */}
                    </Stack>
                    {/* Main */}
                </Stack>
            </Layout>
            <ToastContainer />
        </AuthCheck>
    )
}

export default UserList;