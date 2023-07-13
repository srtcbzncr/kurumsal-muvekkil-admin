import "./style.css";
import { Grid, Button, Card, CardContent, Box, Typography } from '@mui/material';
import AuthCheck from "../authCheck/AuthCheck";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { getAllCourts } from "../../services/CourtService";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import getAuthHeader from "../../helpers/getAuthHeader";
import NotFound from "../notFound/NotFound";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from 'react-toastify';

export default function CourtList() {

    const { t, i18n } = useTranslation();
    const [cookie, setCookie, removeCookie] = useCookies();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    console.log(data.length);

    useEffect(() => {
        getAllCourts(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            if(response.status === 200){
                setData(response.data.data);
            }
            else if(response.status === 401){
                navigate("/login");
            }
            else if(response.status === 403){
                navigate("/forbidden");
            }
            else{
                toast.error(response.error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    theme : "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    hideProgressBar: true
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    });

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID',
            headerClassName: 'super-app-theme--header',
            flex: 0.25,
        },
        {
            field: 'name',
            headerName: 'Name',
            headerClassName: 'super-app-theme--header',
            flex: 0.25,
        },
        {
            field: 'parent.name',
            headerName: 'Parent',
            headerClassName: 'super-app-theme--header',
            flex: 0.25,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            headerClassName: 'super-app-theme--header',
            sortable: false,
            filterable: false,
            editable: false,
            flex: 0.25,
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
      

    return (
        <AuthCheck>
            <Layout>
            <Grid container item justifyContent="space-evenly" alignItems="center" spacing={10} marginTop="-50px">
                    <Grid item md={3}>
                        <Card sx={{ backgroundColor: "secondary.light", color: "primary.contrastText" }}>
                            <CardContent>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="h2">120</Typography>
                                    </Grid>
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="string">Toplam Kullanıcı</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={3}>
                        <Card sx={{ backgroundColor: "secondary.main", color: "primary.contrastText" }}>
                            <CardContent>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="h2">120</Typography>
                                    </Grid>
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="string">Toplam Kullanıcı</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={3}>
                        <Card sx={{ backgroundColor: "secondary.dark", color: "primary.contrastText" }}>
                            <CardContent>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="h2">120</Typography>
                                    </Grid>
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="string">Toplam Kullanıcı</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={3}>
                        <Card sx={{ backgroundColor: "secondary.dark", color: "primary.contrastText" }}>
                            <CardContent>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="h2">120</Typography>
                                    </Grid>
                                    <Grid container item md={12} justifyContent="center">
                                        <Typography variant="string">Toplam Kullanıcı</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="center" alignItems="flex-start" marginTop="60px">
                    <Grid container item justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h4">{t("courts")}</Typography>
                        <Button className="addButton" variant="contained" size="large" startIcon={<AddSharpIcon />}>
                            <Typography variant="string">{t("new")}</Typography>
                        </Button>
                    </Grid>
                    <Grid container item justifyContent="center" alignItems="center" marginTop="100px">
                        {
                            data.length > 0 ? 
                            <Box sx={{ backgroundColor: "background.paper", width: "100%", '& .super-app-theme--header': { backgroundColor: 'secondary.main', color: 'secondary.contrastText'}, }} >
                                <DataGrid
                                    checkboxSelection={false}
                                    rows={data}
                                    columns={columns}
                                    initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 10,
                                        },
                                    },
                                    }}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                />
                            </Box>
                            :
                            <NotFound></NotFound>
                        }
                    </Grid>
                </Grid>
            </Layout>
        </AuthCheck>
    )
}