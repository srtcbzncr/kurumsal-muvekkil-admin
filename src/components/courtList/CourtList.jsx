import "./style.css";
import { Grid, Button, Card, CardContent, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import AuthCheck from "../authCheck/AuthCheck";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { getAllCourts, createCourt } from "../../services/CourtService";
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
    const [formOpen, setFormOpen] = useState(false);
    const [createCourtRequestName, setCreateCourtRequestName] = useState(null);
    const [createCourtRequestParentId, setCreateCourtRequestParentId] = useState(null);
    const navigate = useNavigate();

    function getData() {
        getAllCourts(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            if(response.status === 200){
                console.log(response.data.data)
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
            console.log(error.response.data);
        });
    }

    useEffect(() => {
        getData();
    }, []);

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

    function handleOpenForm(){
        setFormOpen(true);
    }

    function handleCloseForm(){
        setFormOpen(false);
    }
      
    function handleSave(){
        const createCourtRequest = { name : createCourtRequestName, parentId : createCourtRequestParentId };
        createCourt(createCourtRequest, getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            if(response.status === 200){
                toast.success(t("court.create.successful"), {
                    position: toast.POSITION.TOP_CENTER,
                    theme : "colored",
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    hideProgressBar: true
                });
            }
            else if(response.status === 401){
                navigate("/login");
            }
            else if(response.status === 403){
                navigate("/forbidden");
            }
            else if(response.status === 400){

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
        }).finally(() => {
            setCreateCourtRequestName(null);
            setCreateCourtRequestParentId(null);
            handleCloseForm();
            getData();
        });
    }

    function handleChangeCreateCourtRequestName(event){
        setCreateCourtRequestName(event.target.value);
    }

    function handleChangeCreateCourtRequestParentId(event){
        setCreateCourtRequestParentId(event.target.value);
    }

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
                        <Button className="addButton" variant="contained" size="large" startIcon={<AddSharpIcon />} onClick={handleOpenForm}>
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
                <Dialog open={formOpen} onClose={handleCloseForm}>
                    <DialogTitle>{t("court.add")}</DialogTitle>
                    <DialogContent>
                        <Grid container sx={{ width : "300px", marginTop : "10px"}} justifyContent="center" alignItems="center">
                            <FormControl sx={{ marginTop : "10px" }}>
                                <InputLabel id="parent-court">{t("court.parent")}</InputLabel>
                                <Select
                                    labelId="parent-court-label"
                                    id="parent-court"
                                    value={createCourtRequestParentId}
                                    label={t("court.parent")}
                                    onChange={handleChangeCreateCourtRequestParentId}
                                    >
                                    {
                                        data.map((court) => (
                                            <MenuItem value={court.id}>{court.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <TextField id="name" name="name" label={t("name")} value={createCourtRequestName} onChange={handleChangeCreateCourtRequestName} variant="outlined" sx={{ width : "300px", marginTop : "10px" }}/>
                            </FormControl>
                        </Grid>
                    </DialogContent>
                    <DialogActions >
                        <Grid container item justifyContent="flex-end">
                            <Grid item marginRight="10px">
                                <Button variant="contained" onClick={handleSave}>{t("save")}</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="error" onClick={handleCloseForm}>{t("close")}</Button>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog>
                <ToastContainer />
            </Layout>
        </AuthCheck>
    )
}