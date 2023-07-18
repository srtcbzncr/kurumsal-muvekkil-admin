import React, { useState } from 'react'
import { Box, Stack, Button, Typography, Avatar, InputBase, IconButton, Breadcrumbs, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import Status from '../status/Status';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useTranslation } from 'react-i18next';
import Actions from '../actions/Actions';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getAllCourts, getActiveCourts, getPassiveCourts, getDeletedCourts, getCourtStats } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';
import { useNavigate } from 'react-router';

const CourtList = () => {

  const [cookie, setCookie, removeCookie] = useCookies();
  const [courts, setCourts] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [passiveCount, setPassiveCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [tab, setTab] = useState("All");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
          <Actions active={params.row.active} deleted={params.row.deleted}></Actions>
        );
      },
    },
  ];

  function fetchStats() {
    getCourtStats(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
      if (response.data.status === 200) {
        setAllCount(response.data.data.allCount);
        setActiveCount(response.data.data.activeCount);
        setPassiveCount(response.data.data.passiveCount);
        setDeletedCount(response.data.data.deletedCount);
      }
      else if (response.data.status === 400) {
        console.log(response.data.error);
      }
      else if (response.data.status === 401) {
        navigate("/login");
      }
      else if (response.data.status === 403) {
        navigate("/login");
      }
      else {
        console.log("Bilinmeyen hata");
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  function fetchCourts(type) {
    if (type === "All") {
      getAllCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setCourts(response.data.data);
        }
        else if (response.data.status === 400) {
          console.log(response.data.error);
        }
        else if (response.data.status === 401) {
          navigate("/login");
        }
        else if (response.data.status === 403) {
          navigate("/login");
        }
        else {
          console.log("Bilinmeyen hata");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    else if (type === "Active") {
      getActiveCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setCourts(response.data.data);
        }
        else if (response.data.status === 400) {
          console.log(response.data.error);
        }
        else if (response.data.status === 401) {
          navigate("/login");
        }
        else if (response.data.status === 403) {
          navigate("/login");
        }
        else {
          console.log("Bilinmeyen hata");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    else if (type === "Passive") {
      getPassiveCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setCourts(response.data.data);
        }
        else if (response.data.status === 400) {
          console.log(response.data.error);
        }
        else if (response.data.status === 401) {
          navigate("/login");
        }
        else if (response.data.status === 403) {
          navigate("/login");
        }
        else {
          console.log("Bilinmeyen hata");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    else if (type === "Deleted") {
      getDeletedCourts(getAuthHeader(cookie.username, cookie.password, i18n.language)).then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setCourts(response.data.data);
        }
        else if (response.data.status === 400) {
          console.log(response.data.error);
        }
        else if (response.data.status === 401) {
          navigate("/login");
        }
        else if (response.data.status === 403) {
          navigate("/login");
        }
        else {
          console.log("Bilinmeyen hata");
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCourts(tab);
  }, [tab]);

  function handleSelectTab(value) {
    setTab(value);
  };

  function handleNewClick(){
    navigate("/courts/create");
  };

  return (
    <AuthCheck>
      <Layout>
        <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
          <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
            <Typography variant="h4">
              {t("court.management")}
            </Typography>
            <Button variant="contained" onClick={handleNewClick}>
              <AddSharpIcon />
            </Button>
          </Stack>
          <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px"}}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Anasayfa
              </Link>
              <Typography color="text.primary">Mahkeme Yönetimi</Typography>
            </Breadcrumbs>
          </Box>
          <Stack id="main" direction="column" sx={{ width: 0.8, backgroundColor: "secondary.main", marginTop: "25px"}}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 1, justifyContent: "space-between", padding: "10px", border: 1, borderColor: "border.secondary" }}>
              <Stack id="main" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "flex-start" }}>
                <Button onClick={() => handleSelectTab("All")} sx={{ color: tab === "All" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "All" && 2, borderColor: tab === "All" && "text.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("all")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "text.main" }}>{allCount}</Avatar></Button>
                <Button onClick={() => handleSelectTab("Active")} sx={{ color: tab === "Active" ? "success.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Active" && 2, borderColor: tab === "Active" && "success.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("active")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "success.main" }}>{activeCount}</Avatar></Button>
                <Button onClick={() => handleSelectTab("Passive")} sx={{ color: tab === "Passive" ? "warning.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Passive" && 2, borderColor: tab === "Passive" && "warning.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("passive")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "warning.main" }}>{passiveCount}</Avatar></Button>
                <Button onClick={() => handleSelectTab("Deleted")} sx={{ color: tab === "Deleted" ? "error.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Deleted" && 2, borderColor: tab === "Deleted" && "error.main" }}><Typography variant='subtitle' textTransform="capitalize">{t("deleted")}</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "error.main" }}>{deletedCount}</Avatar></Button>
              </Stack>
            </Stack>
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
            <Box id="data-grid" display="flex" sx={{
              width: 1, border: 1, borderColor: "border.secondary", justifyContent: "center", padding: "10px",
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
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[8]}
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
          </Stack>
        </Stack>
      </Layout>
    </AuthCheck>
  )
}

export default CourtList;