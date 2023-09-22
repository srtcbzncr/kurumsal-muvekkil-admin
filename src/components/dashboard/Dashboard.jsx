import Layout from '../layout/Layout';
import './style.css';
import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';
import { useTranslation } from 'react-i18next';
import DashboardItem from '../dashboardItem/DashboardItem';
import subscriptionSVG from '../../illustrations/subscription.svg';
import courtSVG from '../../illustrations/court.svg';
import fileSVG from '../../illustrations/file.svg';
import customerSVG from '../../illustrations/customer.svg';
import planSVG from '../../illustrations/plan.svg';
import lawyerSVG from '../../illustrations/lawyer.svg';
import clientSVG from '../../illustrations/client.svg';
import userSVG from '../../illustrations/user.svg';
import { getStats as getSubscriptionStats } from '../../services/SubscriptionService';
import { getStats as getCustomerStats } from '../../services/CompanyService';
import { getStats as getLawyerStats } from '../../services/LawyerService';
import { getStats as getClientStats } from '../../services/ClientService';
import { getAdminStats as getUserStats } from '../../services/UserService';
import { getStats as getPlanStats } from '../../services/PlanService';
import { getCourtStats as getCourtStats } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';
import { useCookies } from 'react-cookie';

export default function Dashboard() {

    const { t, i18n } = useTranslation();
    const [cookie, setCookie, removeCookie] = useCookies();

    const [isLoading, setIsLoading] = useState(false);
    const [subscriptionCount, setSubscriptionCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [lawyerCount, setLawyerCount] = useState(0);
    const [clientCount, setClientCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [fileCount, setFileCount] = useState(0);
    const [planCount, setPlanCount] = useState(0);
    const [courtCount, setCourtCount] = useState(0);

    async function getSubscriptionCount() {
        getSubscriptionStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setSubscriptionCount(response.data.data.allCount);
        }).catch((error) => {

        });
    }

    async function getCustomerCount() {
        getCustomerStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setCustomerCount(response.data.data.allCount);
        }).catch((error) => {
            
        });
    }

    async function getLawyerCount() {
        getLawyerStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setLawyerCount(response.data.data.allCount);
        }).catch((error) => {
            
        });
    }

    async function getClientCount() {
        getClientStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setClientCount(response.data.data.allCount);
        }).catch((error) => {
            
        });
    }

    async function getUserCount() {
        getUserStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setUserCount(response.data.data.allCount);
        }).catch((error) => {
            
        });
    }

    async function getFileCount() {

    }

    async function getPlanCount() {
        getPlanStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setPlanCount(response.data.data.allCount);
        }).catch((error) => {
            
        });
    }

    async function getCourtCount() {
        getCourtStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setCourtCount(response.data.data.allCount);
        }).catch((error) => {
            
        });
    }

    async function getData() {
        setIsLoading(true);
        await getSubscriptionCount();
        await getLawyerCount();
        await getCustomerCount();
        await getClientCount();
        await getUserCount();
        await getPlanCount();
        await getCourtCount();
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    })

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }}>
                    {/* Main */}
                    <Stack id="main" direction="column" spacing={2} sx={{ width: 0.8, marginTop: "25px", justifyContent: "space-between" }}>
                        <Stack direction="column" sx={{ border: 1, borderColor: "primary.contrastText", backgroundColor: "primary.dark", color: "primary.contrastText", borderRadius: "10px", padding: "20px" }}>
                            <Typography variant="h5" color="text">
                                {t("statistics")}
                            </Typography>
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <DashboardItem width="0.25" title={t("subscription.count")} icon={subscriptionSVG} value={subscriptionCount} actionUrl="/subscriptions"></DashboardItem>
                            <DashboardItem width="0.25" title={t("customer.count")} icon={customerSVG} value={customerCount} actionUrl="/companies"></DashboardItem>
                            <DashboardItem width="0.25" title={t("lawyer.count")} icon={lawyerSVG} value={lawyerCount} actionUrl="/lawyers"></DashboardItem>
                            <DashboardItem width="0.25" title={t("client.count")} icon={clientSVG} value={clientCount} actionUrl="/clients"></DashboardItem>
                        </Stack>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <DashboardItem width="0.25" title={t("user.count")} icon={userSVG} value={userCount} actionUrl="/users"></DashboardItem>
                            <DashboardItem width="0.25" title={t("file.count")} icon={fileSVG} value={fileCount} actionUrl="/files"></DashboardItem>
                            <DashboardItem width="0.25" title={t("plan.count")} icon={planSVG} value={planCount} actionUrl="/plans"></DashboardItem>
                            <DashboardItem width="0.25" title={t("court.count")} icon={courtSVG} value={courtCount} actionUrl="/courts"></DashboardItem>
                        </Stack>
                    </Stack>
                    {/* Main */}
                </Stack>
            </Layout>
        </AuthCheck>
    )
}