import './style.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { Box, Stack, Button, Typography, Avatar, InputBase, IconButton, Breadcrumbs, Link, LinearProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useConfirm } from "material-ui-confirm";

import { ToastContainer, toast } from 'react-toastify';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import Status from '../status/Status';
import NoRowsOverlay from "../noRowsOverlay/NoRowsOverlay";
import Actions from '../actions/Actions';

import { getAllCourts, getActiveCourts, getPassiveCourts, getDeletedCourts, getCourtStats, setActive, setPassive, deleteCourt } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

const CourtList = () => {

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
  const [courts, setCourts] = useState([]);

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
      flex: 0.18,
    },
    {
      field: 'parent',
      headerName: t("court.parent"),
      headerClassName: 'super-app-theme--header',
      flex: 0.18,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center">
            {
              params.row.parent !== null &&
              params.row.parent.name
            }
          </Box>
        )
      }
    },
    {
      field: "status",
      headerName: t("status"),
      headerClassName: 'super-app-theme--header',
      flex: 0.18,
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
          <Actions id={params.row.id} isDetails={false} size="medium" active={params.row.active} deleted={params.row.deleted} setActiveFunc={setActiveRequest} setPassiveFunc={setPassiveRequest} deleteFunc={handleDeleteOnClick}></Actions>
        );
      },
    },
  ];

  function fetchStats() {
    getCourtStats(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
      setAllCount(response.data.data.allCount);
      setActiveCount(response.data.data.activeCount);
      setPassiveCount(response.data.data.passiveCount);
      setDeletedCount(response.data.data.deletedCount);
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
  };

  function fetchCourts() {
    setIsLoading(true);
    if (tab === "All") {
      getAllCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        setCourts(response.data.data);
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
    else if (tab === "Active") {
      getActiveCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        setCourts(response.data.data);
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
    else if (tab === "Passive") {
      getPassiveCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        setCourts(response.data.data);
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
    else if (tab === "Deleted") {
      getDeletedCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        setCourts(response.data.data);
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
  };

  function setActiveRequest(id){
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
      fetchStats();
      fetchCourts();
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

  function setPassiveRequest(id){
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
      fetchStats();
      fetchCourts();
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

  function deleteRequest(id){
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
      fetchStats();
      fetchCourts();
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

  function handleSelectTab(value) {
    setTab(value);
  }

  function handleNewClick(){
    navigate("/courts/create");
  }

  function handleDeleteOnClick(id){
    confirm({ title: t("warning"), description: t("court.before.delete.warning"), confirmationText: t("yes"), cancellationText: t("no") }).then(() => {
      deleteRequest(id);
    })
    .catch(() => {
      console.log("Cancel");
    });
  }

  useEffect(() => {
    fetchStats();
    fetchCourts(tab);
  }, [tab]);

  return (
    <AuthCheck>
      <Layout>
        <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
          {/* Title */}
          <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
            <Typography variant="h4">
              {t("court.management")}
            </Typography>
            <Button variant="contained" onClick={handleNewClick}>
              <AddSharpIcon />
            </Button>
          </Stack>
          {/* Title */}
          {/* Navigation */}
          <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px"}}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                {t("home")}
              </Link>
              <Typography color="text.primary">{t("court.management")}</Typography>
            </Breadcrumbs>
          </Box>
          {/* Navigation */}
          {/* Main */}
          <Stack id="main" direction="column" sx={{ width: 0.8, backgroundColor: "secondary.main", marginTop: "25px"}}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 1, justifyContent: "space-between", padding: "10px", border: 1, borderColor: "border.secondary" }}>
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
            <Box id="data-grid" display="flex" sx={{ width: 1, height: "550px", border: 1, borderColor: "border.secondary", justifyContent: "center", padding: "10px",
              "& .super-app-theme--header": {
                backgroundColor: "background.default",
                color: "text.main",
              },
              "& .MuiDataGrid-sortIcon": {
                opacity: 1,
                color: "text.main",
              },
              "& .MuiDataGrid-menuIconButton": {
                opacity: 1,
                color: "text.main"
              },
            }}
            >
              <DataGrid
                rows={courts}
                columns={columns}
                slots={{
                  loadingOverlay: LinearProgress,
                  noRowsOverlay: NoRowsOverlay,
                  noResultsOverlay: NoRowsOverlay,
                }}
                loading={isLoading}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 8,
                    },
                  },
                }}
                disableRowSelectionOnClick
                localeText={{
                  noRowsLabel: t("noRowsLabel"),
                  noResultsOverlayLabel: t("noRowsLabel"),
                  columnMenuLabel: t("columnMenuLabel"),
                  columnMenuShowColumns: t("columnMenuShowColumns"),
                  columnMenuManageColumns: t("columnMenuManageColumns"),
                  columnMenuFilter: t("columnMenuFilter"),
                  columnMenuHideColumn: t("columnMenuHideColumn"),
                  columnMenuUnsort: t("columnMenuUnsort"),
                  columnMenuSortAsc: t("columnMenuSortAsc"),
                  columnMenuSortDesc: t("columnMenuSortDesc"),
                  toolbarColumns: t("toolbarColumns"),
                  toolbarColumnsLabel: t("toolbarColumnsLabel"),
                  columnsPanelTextFieldLabel: t("columnsPanelTextFieldLabel"),
                  columnsPanelTextFieldPlaceholder: t("columnsPanelTextFieldPlaceholder"),
                  columnsPanelDragIconLabel: t("columnsPanelDragIconLabel"),
                  columnsPanelShowAllButton: t("columnsPanelShowAllButton"),
                  columnsPanelHideAllButton: t("columnsPanelHideAllButton"),
                  filterPanelAddFilter: t("filterPanelAddFilter"),
                  filterPanelRemoveAll: t("filterPanelRemoveAll"),
                  filterPanelDeleteIconLabel: t("filterPanelDeleteIconLabel"),
                  filterPanelLogicOperator: t("filterPanelLogicOperator"),
                  filterPanelOperator: t("filterPanelOperator"),
                  filterPanelOperatorAnd: t("filterPanelOperatorAnd"),
                  filterPanelOperatorOr: t("filterPanelOperatorOr"),
                  filterPanelColumns: t("filterPanelColumns"),
                  filterPanelInputLabel: t("filterPanelInputLabel"),
                  filterPanelInputPlaceholder: t("filterPanelInputPlaceholder"),
                  toolbarExport: t("toolbarExport"),
                  toolbarExportLabel: t("toolbarExportLabel"),
                  toolbarExportCSV: t("toolbarExportCSV"),
                  toolbarExportPrint: t("toolbarExportPrint"),
                  toolbarExportExcel: t("toolbarExportExcel"),
                  filterOperatorContains: t("filterOperatorContains"),
                  filterOperatorEquals: t("filterOperatorEquals"),
                  filterOperatorStartsWith: t("filterOperatorStartsWith"),
                  filterOperatorEndsWith: t("filterOperatorEndsWith"),
                  filterOperatorIs: t("filterOperatorIs"),
                  filterOperatorNot: t("filterOperatorNot"),
                  filterOperatorAfter: t("filterOperatorAfter"),
                  filterOperatorOnOrAfter: t("filterOperatorOnOrAfter"),
                  filterOperatorBefore: t("filterOperatorBefore"),
                  filterOperatorOnOrBefore: t("filterOperatorOnOrBefore"),
                  filterOperatorIsEmpty: t("filterOperatorIsEmpty"),
                  filterOperatorIsNotEmpty: t("filterOperatorIsNotEmpty"),
                  filterOperatorIsAnyOf: t("filterOperatorIsAnyOf"),
                  headerFilterOperatorContains: t("headerFilterOperatorContains"),
                  headerFilterOperatorEquals: t("headerFilterOperatorEquals"),
                  headerFilterOperatorStartsWith: t("headerFilterOperatorStartsWith"),
                  headerFilterOperatorEndsWith: t("headerFilterOperatorEndsWith"),
                  headerFilterOperatorIs: t("headerFilterOperatorIs"),
                  headerFilterOperatorNot: t("headerFilterOperatorNot"),
                  headerFilterOperatorAfter: t("headerFilterOperatorAfter"),
                  headerFilterOperatorOnOrAfter: t("headerFilterOperatorOnOrAfter"),
                  headerFilterOperatorBefore: t("headerFilterOperatorBefore"),
                  headerFilterOperatorOnOrBefore: t("headerFilterOperatorOnOrBefore"),
                  headerFilterOperatorIsEmpty: t("headerFilterOperatorIsEmpty"),
                  headerFilterOperatorIsNotEmpty: t("headerFilterOperatorIsNotEmpty"),
                  headerFilterOperatorIsAnyOf: t("headerFilterOperatorIsAnyOf"),
                  'headerFilterOperator=': t("'headerFilterOperator='"),
                  'headerFilterOperator!=': t("'headerFilterOperator!='"),
                  'headerFilterOperator>': t("'headerFilterOperator>'"),
                  'headerFilterOperator>=': t("'headerFilterOperator>='"),
                  'headerFilterOperator<': t("'headerFilterOperator<'"),
                  'headerFilterOperator<=': t("'headerFilterOperator<='")
                }}
              />
            </Box>
            {/* Data */}
          </Stack>
          {/* Main */}
        </Stack>
      </Layout>
      <ToastContainer/>
    </AuthCheck>
  )
}

export default CourtList;