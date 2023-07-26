import './style.css';

import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import { Alert, Box, Breadcrumbs, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';

import getAuthHeader from '../../helpers/getAuthHeader';
import { getActiveCourts, getCourtById, updateCourt } from '../../services/CourtService';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import createCourtPNG from '../../illustrations/createCourt.png';

const EditCourt = () => {

  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [nameValidationError, setNameValidationError] = useState(null);

  const [activeCourts, setActiveCourts] = useState([])
  const [court, setCourt] = useState({});
  const [courtName, setCourtName] = useState();
  const [selectedParentCourtId, setSelectedParentCourtId] = useState(null);

  function fetchCourt() {
    setIsLoading(true);
    getCourtById(id, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      setCourt(response.data.data);
      setCourtName(response.data.data.name);
      if(response.data.data.parent !== null){
        setSelectedParentCourtId(response.data.data.parent.id);
      }
    }).catch((error) => {
      if (error.response.data.status === 404) {
        setIsError(true);
        setErrorMessage(error.response.data.error.message);
      }
      else if (error.response.data.status === 401) {
        setIsError(true);
        setErrorMessage(error.response.data.error.message);
      }
      else if (error.response.data.status === 403) {
        setIsError(true);
        setErrorMessage(error.response.data.error.message);
      }
      else {
        setIsError(true);
        setErrorMessage(error.response.data.error.message);
      }
    }).finally(() => {
      setIsLoading(false);
    })
  }

  function fetchActiveCourts() {
    getActiveCourts(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      setActiveCourts(response.data.data);
    }).catch((error) => {
      setIsError(true);
      setErrorMessage(t("error.undefined"));
      if (error.response.data.status === 401) {
        navigate("/login");
      }
      else if (error.response.data.status === 403) {
        navigate("/login");
      }
    })
  }

  function updateCourtRequest() {
    updateCourt({ id: id, name: courtName, parentId: selectedParentCourtId }, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      toast.success(t("court.update.success"), {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
    });
    }).catch((error) => {
      setIsError(true);
      setErrorMessage(t("error.undefined"));
      if (error.response.data.status === 400) {
        setNameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "name").message);
        setErrorMessage(error.response.data.error.message);
      }
      else if (error.response.data.status === 401) {
        setIsError(true);
        setErrorMessage(error.response.data.error.message);
      }
      else if (error.response.data.status === 403) {
        setIsError(true);
        setErrorMessage(error.response.data.error.message);
      }
      else {
        setIsError(true);
        setErrorMessage(error.response.data.error.message);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleSelectedParentCourtChange(event) {
    setSelectedParentCourtId(event.target.value);
  }

  function handleBackOnClick() {
    navigate("/courts/" + id);
  }

  async function validateUpdateCourtForm() {
    let result = true;

    if (courtName === null || courtName === "") {
      setNameValidationError(t("null.validation.error"))
      result = false;
    }

    return result;
  }

  function handleCourtNameChange(event) {
    setNameValidationError(null);
    setCourtName(event.target.value);
  }

  async function handleSaveClick() {
    setIsError(false);
    setErrorMessage("");
    setIsLoading(true);

    const validationResult = await validateUpdateCourtForm()

    if (validationResult === true) {
      updateCourtRequest();
    }
    else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCourt();
    fetchActiveCourts();
  }, []);

  return (
    <AuthCheck>
      <Layout>
        <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: { xs: "center", sm: "flex-start" }, alignItems: { xs: "center", sm: "center" } }}>
          <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "100px" }}>
            <Typography variant="h4">
              {t("court.edit")}
            </Typography>
            <Tooltip title={t("back")}>
              <Button variant="outlined" color="text" onClick={handleBackOnClick}>
                <ArrowBackSharpIcon color="text" />
              </Button>
            </Tooltip>
          </Stack>
          <Box id="navigation" display="flex" spacing={2} sx={{ width: 0.8, marginTop: "25px" }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                {t("home")}
              </Link>
              <Link underline="hover" color="inherit" href="/courts">
                {t("court.management")}
              </Link>
              <Typography color="text.primary">{t("court.create")}</Typography>
            </Breadcrumbs>
          </Box>
              <Stack id="main" direction={{ xs: "column", sm: "row" }} sx={{ width: 0.8, justifContent: "center", alignItems: "center", backgroundColor: "secondary.main", marginTop: "25px", paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                <Box display="flex" sx={{ width: 0.5, justifyContent: "center" }}>
                  <img src={createCourtPNG} width="90%"></img>
                </Box>
                <Stack direction="column" sx={{ width: 0.5, justifyContent: "center", alignItems: "center", paddingTop: { xs: "20px", sm: "0px" } }}>
                  <Typography variant="h5" sx={{ width: 0.7 }}>
                    {t("court.infos")}
                  </Typography>
                  {
                    isError === true &&
                    <Alert variant="filled" severity="error" sx={{ marginTop: "30px", width: "70%" }}>
                      {errorMessage}
                    </Alert>
                  }
                  <FormControl sx={{ marginTop: "30px", width: 0.7 }}>
                    <InputLabel shrink id="parent-court-select-label">{ t("court.parent") }</InputLabel>
                    <Select
                      notched
                      labelId="parent-court-select-label"
                      id="parent-court-select"
                      value={selectedParentCourtId}
                      label={t("court.parent")}
                      onChange={handleSelectedParentCourtChange}
                    >
                      <MenuItem value={null}>{t("none")}</MenuItem>
                      {
                        activeCourts.map((court) => <MenuItem key={court.id} value={court.id}>{court.name}</MenuItem>)
                      }
                    </Select>
                    <TextField required InputLabelProps={{ shrink: true }} error={nameValidationError !== null} helperText={nameValidationError} id="court-name" label={t("name")} variant="outlined" sx={{ marginTop: "20px" }} value={courtName} onChange={handleCourtNameChange} />
                    <Stack direction="row" sx={{ width: 1, justifyContent: "flex-end", marginTop: "30px" }}>
                      {
                        isLoading === true
                          ? <LoadingButton loading variant="contained" size="large" sx={{ width: 0.4 }}>{t("save")}</LoadingButton>
                          : <Button variant="contained" type="submit" size="large" sx={{ width: 0.4 }} onClick={handleSaveClick}>{t("save")}</Button>
                      }
                    </Stack>
                  </FormControl>
                </Stack>
              </Stack>
        </Stack>
        <ToastContainer/>
      </Layout>
    </AuthCheck>
  )
}

export default EditCourt