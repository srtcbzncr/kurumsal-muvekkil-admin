import "./style.css";
import { Grid, Button, Card, CardContent, Box, Typography } from '@mui/material';
import AuthCheck from "../authCheck/AuthCheck";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import getAllCourts from "../../services/CourtService";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { DataGrid } from '@mui/x-data-grid';

export default function CourtList() {


    /*useEffect(() => {
        getAllCourts("authorization", "locale").then((response) => {

        }).catch((error) => {

        });
    });*/

    const columns = [
        { 
            field: 'id', headerName: 'ID',
            flex: 0.25,
        },
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 0.25,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 0.25,
        },
        {
            field: 'actions',
            headerName: 'Actions',
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
                <Grid container item justifyContent="space-evenly" alignItems="center" spacing={10}>
                    <Grid item md={4}>
                        <Card sx={{ backgroundColor: "secondary.light", color: "primary.contrastText" }}>
                            <CardContent>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Typography variant="h3">120</Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card sx={{ backgroundColor: "secondary.main", color: "primary.contrastText" }}>
                            <CardContent>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Typography variant="h3">120</Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={4}>
                        <Card sx={{ backgroundColor: "secondary.dark", color: "primary.contrastText" }}>
                            <CardContent>
                                <Grid container justifyContent="center" alignItems="center">
                                    <Typography variant="h3">120</Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container item justifyContent="center" alignItems="flex-start">
                    <Grid container item justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h4">Mahkemeler</Typography>
                        <Button className="addButton" variant="contained" size="large" startIcon={<AddSharpIcon />}>
                            <Typography variant="string">Add</Typography>
                        </Button>
                    </Grid>
                    <Box sx={{ backgroundColor: "background.paper", width: "100%" }} >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: {
                                pageSize: 10,
                                },
                            },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Grid>
            </Layout>
        </AuthCheck>
    )
}