import './style.css';

import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useNavigate } from 'react-router';

const SubscriptionList = () => {

    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    function handleNewClick() {
      navigate("/subscriptions/create");
    }

    function handlePlanManagementOnClick() {
      navigate("/plans");
    }

    return (
      <AuthCheck>
        <Layout>
          <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
            {/* Title */}
            <Stack id="title" direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: 0.8, justifyContent: "space-between", marginTop: "50px" }}>
                <Typography variant="h4">
                    {t("subscription.management")}
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button variant="outlined" onClick={handlePlanManagementOnClick}>
                    {t("plan.management")}
                  </Button>
                  <Button variant="contained" onClick={handleNewClick}>
                      <AddSharpIcon />
                  </Button>
                </Stack>
            </Stack>
            {/* Title */}            
          </Stack>
        </Layout>
      </AuthCheck>
    )
}

export default SubscriptionList;