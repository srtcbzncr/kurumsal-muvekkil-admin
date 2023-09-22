import Layout from '../layout/Layout';
import './style.css';
import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, CircularProgress, Stack, Typography, Alert } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';
import { useTranslation } from 'react-i18next';
import DashboardItem from '../dashboardItem/DashboardItem';
import GavelSharpIcon from '@mui/icons-material/GavelSharp';
import CasesSharpIcon from '@mui/icons-material/CasesSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import SupervisedUserCircleSharpIcon from '@mui/icons-material/SupervisedUserCircleSharp';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import StyleSharpIcon from '@mui/icons-material/StyleSharp';
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
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
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
            setIsError(true);
            if(error.response !== undefined && error.response.data.error !== undefined && error.response.data.error !== null){
                setErrorMessage(error.response.data.error);
            }
            else{
                setErrorMessage(t("error.undefined"));
            }
        });
    }

    async function getCustomerCount() {
        getCustomerStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setCustomerCount(response.data.data.allCount);
        }).catch((error) => {
            setIsError(true);
            if(error.response !== undefined && error.response.data.error !== undefined && error.response.data.error !== null){
                setErrorMessage(error.response.data.error);
            }
            else{
                setErrorMessage(t("error.undefined"));
            }
        });
    }

    async function getLawyerCount() {
        getLawyerStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setLawyerCount(response.data.data.allCount);
        }).catch((error) => {
            setIsError(true);
            if(error.response !== undefined && error.response.data.error !== undefined && error.response.data.error !== null){
                setErrorMessage(error.response.data.error);
            }
            else{
                setErrorMessage(t("error.undefined"));
            }
        });
    }

    async function getClientCount() {
        getClientStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setClientCount(response.data.data.allCount);
        }).catch((error) => {
            setIsError(true);
            if(error.response !== undefined && error.response.data.error !== undefined && error.response.data.error !== null){
                setErrorMessage(error.response.data.error);
            }
            else{
                setErrorMessage(t("error.undefined"));
            }
        });
    }

    async function getUserCount() {
        getUserStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setUserCount(response.data.data.allCount);
        }).catch((error) => {
            setIsError(true);
            if(error.response !== undefined && error.response.data.error !== undefined && error.response.data.error !== null){
                setErrorMessage(error.response.data.error);
            }
            else{
                setErrorMessage(t("error.undefined"));
            }
        });
    }

    async function getFileCount() {

    }

    async function getPlanCount() {
        getPlanStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setPlanCount(response.data.data.allCount);
        }).catch((error) => {
            setIsError(true);
            if(error.response !== undefined && error.response.data.error !== undefined && error.response.data.error !== null){
                setErrorMessage(error.response.data.error);
            }
            else{
                setErrorMessage(t("error.undefined"));
            }
        });
    }

    async function getCourtCount() {
        getCourtStats(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            setCourtCount(response.data.data.allCount);
        }).catch((error) => {
            setIsError(true);
            if(error.response !== undefined && error.response.data.error !== undefined && error.response.data.error !== null){
                setErrorMessage(error.response.data.error);
            }
            else{
                setErrorMessage(t("error.undefined"));
            }
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
    }, [])

    return (
        <AuthCheck>
            <Layout>
                <Stack direction="column" sx={{ width: 1, alignItems: "center" }} spacing={4}>
                    <Stack direction="column" spacing={2} sx={{ width: 0.8, marginTop: "25px", justifyContent: "space-between" }}>
                        <Stack direction="column" sx={{ paddingTop: "20px" }}>
                            <Typography variant="h5" color="text">
                                {t("statistics")}
                            </Typography>
                        </Stack>
                        {
                            isLoading === true
                                ?
                                <Box display="flex" sx={{ width: 1, justifyContent: "center" }}>
                                    <CircularProgress />
                                </Box>
                                :
                                isError === true
                                ?
                                    <Alert variant="filled" severity="error">
                                        {errorMessage}
                                    </Alert>
                                :
                                <Stack direction="column" sx={{ width: 1 }} spacing={2}>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <DashboardItem width="0.25" title={t("subscription.count")} icon={<PaidSharpIcon sx={{ fontSize: "50px" }}/>} value={subscriptionCount} actionUrl="/subscriptions"></DashboardItem>
                                        <DashboardItem width="0.25" title={t("customer.count")} icon={<ShoppingBasketSharpIcon sx={{ fontSize: "50px" }}/>} value={customerCount} actionUrl="/companies"></DashboardItem>
                                        <DashboardItem width="0.25" title={t("lawyer.count")} icon={<BadgeSharpIcon sx={{ fontSize: "50px" }}/>} value={lawyerCount} actionUrl="/lawyers"></DashboardItem>
                                        <DashboardItem width="0.25" title={t("client.count")} icon={<EmojiEmotionsSharpIcon sx={{ fontSize: "50px" }}/>} value={clientCount} actionUrl="/clients"></DashboardItem>
                                    </Stack>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <DashboardItem width="0.25" title={t("user.count")} icon={<SupervisedUserCircleSharpIcon sx={{ fontSize: "50px" }}/>} value={userCount} actionUrl="/users"></DashboardItem>
                                        <DashboardItem width="0.25" title={t("file.count")} icon={<CasesSharpIcon sx={{ fontSize: "50px" }}/>} value={fileCount} actionUrl="/files"></DashboardItem>
                                        <DashboardItem width="0.25" title={t("plan.count")} icon={<StyleSharpIcon sx={{ fontSize: "50px" }}/>} value={planCount} actionUrl="/plans"></DashboardItem>
                                        <DashboardItem width="0.25" title={t("court.count")} icon={<GavelSharpIcon sx={{ fontSize: "50px" }}/>} value={courtCount} actionUrl="/courts"></DashboardItem>
                                    </Stack>
                                </Stack>
                        }
                    </Stack>
                    <Stack direction={{ xs: "column", sm: "row" }} sx={{ width: 0.8 }} spacing={2}>
                        <Stack direction="column" sx={{ width: 0.5 }} spacing={2}>
                            <Typography variant="h5" color="text">
                                {t("statistics")}
                            </Typography>
                            <Stack direction="column" sx={{ backgroundColor: "secondary.main", width: 1}}>
                                Deneme
                            </Stack>
                        </Stack>
                        <Stack direction="column" sx={{ width: 0.5 }} spacing={2}>
                            <Typography variant="h5" color="text">
                                {t("statistics")}
                            </Typography>
                            <Stack direction="column" sx={{ backgroundColor: "secondary.main", width: 1}}>
                                Deneme
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Layout>
        </AuthCheck>
    )
}