import React, { useEffect, useState } from 'react';
import './style.css';
import { FormControl, Stack, Typography, MenuItem, TextField, Button, Select, InputLabel } from '@mui/material';
import { getActiveCourts } from '../../services/CourtService';
import getAuthHeader from '../../helpers/getAuthHeader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';

const CreateCourt = () => {

    const[cookie, setCookie, removeCookie] = useCookies();
    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const [activeCourts, setActiveCourts] = useState([]);
    const [selectedParentCourtId, setSelectedParentCourtId] = useState("");

    function fetchActiveCourts(){
        getActiveCourts(getAuthHeader(cookie.username, cookie.password), i18n.language).then((response) => {
            if(response.data.status === 200){
                console.log(response);
                setActiveCourts(response.data.data);
            }
            else if(response.data.status === 400){
                console.log("Validation error");
            }
            else if(response.data.status === 401){
                navigate("/login");
            }
            else if(response.data.status === 403){
                navigate("/login");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchActiveCourts();
    }, []);

    function handleSelectedParentCourtChange(event){
        setSelectedParentCourtId(event.target.value);
    }

    return (
        <Stack direction="column" sx={{ width: 1, alignItems:"center", marginTop: "10px" }}>
            <FormControl fullWidth={true}>
                <InputLabel id="parent-court-select-label">{t("court.parent")}</InputLabel>
                <Select
                    labelId="parent-court-select-label"
                    id="parent-court-select"
                    value={selectedParentCourtId}
                    label={t("court.parent")}
                    onChange={handleSelectedParentCourtChange}
                >
                    {
                        activeCourts.map((court) => 
                            <MenuItem key={court.id} value={court.id}>{court.name}</MenuItem>
                        )
                    }
                </Select>
                <TextField required id="court-name" label={t("name")} variant="outlined" sx={{marginTop: "20px"}} />
                <Stack direction="row" sx={{ width: 1, justifyContent: "flex-end"}}>
                    <Button variant="contained" sx={{  width: 0.4, marginTop: "20px"}} size="large">{t("save")}</Button>
                </Stack>
            </FormControl>
        </Stack>
    )
}

export default CreateCourt;