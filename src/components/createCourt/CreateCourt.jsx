import React, { useEffect, useState } from 'react';
import './style.css';
import { FormControl, Stack, Typography, MenuItem, TextField, Button, Select, InputLabel, Box, Breadcrumbs, Link, IconButton, Tooltip } from '@mui/material';
import { getActiveCourts, createCourt } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import createCourtPNG from '../../illustrations/createCourt.png';
import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

const CreateCourt = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [activeCourts, setActiveCourts] = useState([]);
    const [selectedParentCourtId, setSelectedParentCourtId] = useState("");
    const [newCourtName, setNewCourtName] = useState(null);
    const [created, setCreated] = useState(false);
    const [error, setError] = useState(false);

    function fetchActiveCourts() {
        getActiveCourts(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            if (response.data.status === 200) {
                setActiveCourts(response.data.data);
            }
            else if (response.data.status === 401) {
                navigate("/login");
            }
            else if (response.data.status === 403) {
                navigate("/login");
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        fetchActiveCourts();
    }, []);

    function handleSelectedParentCourtChange(event) {
        setSelectedParentCourtId(event.target.value);
    };

    function handleNewCourtNameChange(event) {
        setNewCourtName(event.target.value);
    };

    function handleSaveClick() {
        createCourt({ name: newCourtName, parentId: selectedParentCourtId }, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            if (response.data.status === 201) {
                setCreated(true);
            }
            else if (response.data.status === 400) {
                setError(true);
            }
            else if (response.data.status === 401) {
                setError(true);
            }
            else if (response.data.status === 403) {
                setError(true);
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    function handleBackClick() {
        navigate("/courts");
    }

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
                        <Typography variant="h4">
                            {t("court.create")}
                        </Typography>
                        <Tooltip title={t("back")}>
                            <Button variant="outlined" color="text" onClick={handleBackClick}>
                                <ArrowBackSharpIcon color="text"/>
                            </Button>
                        </Tooltip>
                    </Stack>
                    <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                            {t("home")}
                            </Link>
                            <Link underline="hover" color="inherit" href="/">
                                {t("court.management")}
                            </Link>
                            <Typography color="text.primary">{t("court.create")}</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Stack id="main" direction="row" sx={{ width: 0.8, backgroundColor: "secondary.main", marginTop: "25px" }}>
                        <Box display="flex" sx={{ width: 0.5, justifyContent: "center" }}>
                            <img src={createCourtPNG} width="90%"></img>
                        </Box>
                        <Stack direction="column" sx={{ width: 0.5, justifyContent: "center", paddingRight: "50px" }}>
                            <Typography variant="h5">
                                {t("court.infos")}
                            </Typography>
                            <FormControl sx={{ marginTop: "40px"}}>
                                <InputLabel id="parent-court-select-label">{t("court.parent")}</InputLabel>
                                <Select
                                    labelId="parent-court-select-label"
                                    id="parent-court-select"
                                    value={selectedParentCourtId}
                                    label={t("court.parent")}
                                    onChange={handleSelectedParentCourtChange}
                                >
                                    {
                                        activeCourts.map((court) => <MenuItem key={court.id} value={court.id}>{court.name}</MenuItem>)
                                    }
                                </Select>
                                <TextField required id="court-name" label={t("name")} variant="outlined" sx={{ marginTop: "20px"}} value={newCourtName} onChange={handleNewCourtNameChange} />
                                <Stack direction="row" sx={{ width: 1, justifyContent: "flex-end", marginTop: "30px" }}>
                                    <Button variant="contained" size="large" sx={{ width: 0.4}}>{t("save")}</Button>
                                </Stack>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Stack>
            </Layout>
            <Outlet />
        </AuthCheck>
    )
}

export default CreateCourt;