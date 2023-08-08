import './style.css';

import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { Avatar, Box, Breadcrumbs, Button, IconButton, InputBase, Stack, Typography } from '@mui/material';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import DataTable from '../dataTable/DataTable';
import Status from '../status/Status';
import Actions from '../actions/Actions';

import { deletePlan, getAllPlans, getStats, setActive, setPassive } from '../../services/PlanService';
import getAuthHeader from '../../helpers/getAuthHeader';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';

const PlanList = () => {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const confirm = useConfirm();

  const [tab, setTab] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const [plans, setPlans] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [passiveCount, setPassiveCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);

  const columns = [
    {
        field: 'id',
        headerName: 'ID',
        headerClassName: 'super-app-theme--header',
        flex: 0.1,
    },
    {
        field: 'name',
        headerName: t("name"),
        headerClassName: 'super-app-theme--header',
        flex: 0.1,
    },
    {
        field: 'description',
        headerName: t("description"),
        headerClassName: 'super-app-theme--header',
        flex: 0.1,
    },
    {
      field: 'monthlyPrice',
      headerName: t("price.monthly"),
      headerClassName: 'super-app-theme--header',
      flex: 0.1,
    },
    {
      field: 'annualPrice',
      headerName: t("price.annual"),
      headerClassName: 'super-app-theme--header',
      flex: 0.1,
    },
    {
      field: 'clientQuota',
      headerName: t("quota.client"),
      headerClassName: 'super-app-theme--header',
      flex: 0.1,
    },
    {
      field: 'lawyerQuota',
      headerName: t("quota.lawyer"),
      headerClassName: 'super-app-theme--header',
      flex: 0.1,
    },
    {
      field: 'fileQuotaPerClient',
      headerName: t("quota.file.per.client"),
      headerClassName: 'super-app-theme--header',
      flex: 0.1,
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
                <Actions id={params.row.id} url="/courts" isDetails={false} size="medium" active={params.row.active} deleted={params.row.deleted} setActiveFunc={setActiveRequest} setPassiveFunc={setPassiveRequest} deleteFunc={handleDeleteOnClick}></Actions>
            );
        },
    },
  ];

  function fetchPlans() {
    setIsLoading(true);
    getAllPlans(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      setPlans(response.data.data);
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

  function fetchStats() {
    setIsLoading(true);
    getStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      console.log(response);
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

  function setActiveRequest(id) {
    setIsLoading(true);
    setActive(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      fetchStats();
      fetchPlans();
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
      fetchPlans();
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
    deletePlan(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      fetchStats();
      fetchPlans();
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
    }).catch(() => {
          console.log("Cancel");
      });
  }

  function handleBackOnClick() {
    navigate("/subscriptions");
  }

  function handleNewOnClick() {
    navigate("/plans/create");
  }

  function handleSelectTab(tab) {
    setTab(tab);
}

useEffect(() => {
  fetchStats();
  fetchPlans();
}, [tab])

  return (
    <AuthCheck>
      <Layout>
        <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
          {/* Title */}
          <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
            <Typography variant="h4">
              {t("plan.management")}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="outlined" color="text" onClick={handleBackOnClick}>
                <ArrowBackSharpIcon color="text" />
              </Button>
              <Button variant="contained" onClick={handleNewOnClick}>
                <AddSharpIcon />
              </Button>
            </Stack>
          </Stack>
          {/* Title */}
          {/* Navigation */}
          <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                {t("home")}
              </Link>
              <Link underline="hover" color="inherit" href="/subscriptions">
                {t("subscription.management")}
              </Link>
              <Typography color="text.primary">{t("plan.management")}</Typography>
            </Breadcrumbs>
          </Box>
          {/* Navigation */}
          <Stack id="main" direction="column" sx={{ width: 0.8, backgroundColor: "secondary.main", marginTop: "25px" }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 1, justifyContent: "space-between", padding: "20px", border: 1, borderColor: "border.secondary" }}>
              <Typography variant="h6">{t("plan.list")}</Typography>
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
            <DataTable height="600px" isLoading={isLoading} columns={columns} data={plans} />
            {/* Data */}
          </Stack>
          {/* Main */}
        </Stack>
      </Layout>
      <ToastContainer />
    </AuthCheck>
  )
}

export default PlanList;