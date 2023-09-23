import './style.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { FormControl, Stack, Typography, MenuItem, TextField, Button, Select, InputLabel, Box, Breadcrumbs, Link, Tooltip, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

import getAuthHeader from '../../helpers/getAuthHeader';

import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { createCompany } from '../../services/CompanyService';

const CreateCompany = () => {

  const [cookie, setCookie, removeCookie] = useCookies();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDone, setIsDone] = useState(false);

  const [nameValidationError, setNameValidationError] = useState(null);
  const [taxNoValidationError, setTaxNoValidationError] = useState(null);

  const [name, setName] = useState("");
  const [taxNo, setTaxNo] = useState("");

  function handleBackOnClick() {
    navigate("/companies");
  }

  function handleNameOnChange(event) {
    setNameValidationError(null);
    setName(event.target.value);
  }

  function handleTaxNoOnChange(event) {
    setTaxNoValidationError(null);
    setTaxNo(event.target.value);
  }

  function createCompanyRequest() {
    createCompany({ name, taxNo }, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
      navigate("/companies");
    }).catch((error) => {
      setIsError(true);
      if (error.response.data === null) {
        setErrorMessage(t("error.undefined"));
      }
      else if (error.response.data.status === 400) {
        error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "name") &&
          setNameValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "name").message);

        error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "taxNo") &&
          setTaxNoValidationError(error.response.data.error.fieldErrors.find(fieldError => fieldError.field === "taxNo").message);
      }
      else {
        setErrorMessage(error.response.data.error.message);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }

  async function validateCreateCompanyForm() {
    let result = true;

    if (name === null || name === "") {
      setNameValidationError(t("null.validation.error"));
      result = false;
    }
    if (taxNo === null || taxNo === "") {
      setTaxNoValidationError(t("null.validation.error"));
      result = false;
    }

    return result
  }

  async function handleSaveOnClick() {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);

    const validationResult = await validateCreateCompanyForm();

    if (validationResult === true) {
      createCompanyRequest();
    }
    else {
      setIsLoading(false);
      setIsError(false);
    }
  }

  return (
    <AuthCheck>
      <Layout>
        <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: { xs: "center", sm: "flex-start" }, alignItems: { xs: "center", sm: "center" } }}>
          <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
            <Typography variant="h4">
              {t("customer.create")}
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
              <Link underline="hover" color="inherit" href="/users">
                {t("customer.management")}
              </Link>
              <Typography color="text.primary">{t("customer.create")}</Typography>
            </Breadcrumbs>
          </Box>
          <FormControl display="flex" sx={{ width: 1 }}>
            <Stack id="main" direction="column" sx={{ width: 1, justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
              <Stack direction={{ xs: "column", sm: "row" }} sx={{ border: 1, borderColor: "secondary.main", borderRadius: "10px", width: 0.8, backgroundColor: "secondary.main", justifyContent: "space-between", paddingLeft: { xs: "0px", sm: "20px" }, paddingRight: { xs: "0px", sm: "20px" }, paddingTop: "20px", paddingBottom: "20px" }}>
                <Stack direction="column" sx={{ width: 0.4 }}>
                  <Typography variant="h5" color="text">
                    {t("infos.company")}
                  </Typography>
                  <Typography variant="caption" color="text">
                    {t("infos.company.caption")}
                  </Typography>
                </Stack>
                <Stack direction="column" sx={{ width: 0.6 }}>
                  {
                    isError === true &&
                    <Alert variant="filled" severity="error">
                      { errorMessage }
                    </Alert>
                  }
                  <TextField id="name" type="text" label={t("name")} variant="outlined" value={name} onChange={handleNameOnChange} sx={{ marginTop: isError === true ? "20px" : "0px"}} required error={nameValidationError !== null} helperText={nameValidationError} />
                  <TextField id="taxNo" type="text" label={t("taxNo")} variant="outlined" value={taxNo} onChange={handleTaxNoOnChange} sx={{ marginTop: "20px" }} required error={taxNoValidationError !== null} helperText={taxNoValidationError} />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ width: 0.8, justifyContent: "flex-end", marginTop: "30px", marginBottom: "30px" }}>
                <Button variant="outlined" type="submit" size="large" color="text" onClick={handleBackOnClick}>{t("cancel")}</Button>
                {
                  isLoading === true
                    ? <LoadingButton loading variant="contained" size="large">{t("save")}</LoadingButton>
                    : <Button variant="contained" type="submit" size="large" onClick={handleSaveOnClick}>{t("save")}</Button>
                }
              </Stack>
            </Stack>
          </FormControl>
        </Stack>
      </Layout>
    </AuthCheck>
  )
}

export default CreateCompany;