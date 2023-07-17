import './style.css';
import React from 'react';
import { Grid, Stack, Box} from '@mui/material';
import Menu from '../menu/Menu';

export default function Layout ({ children }) {
    return (
        <Stack direction="row" height='100%'>
            <Box sx={{backgroundColor: 'primary.main', height:"100%", width: { xs: "45vw", sm: "25vw", md: "20vw", lg: "15vw", xl: "15vw" }}}>
                <Menu></Menu>
            </Box>
            <Box sx={{ width: { xs: "55vw", sm: "75vw", md: "80vw", lg: "85vw", xl: "85vw" }}}>
                { children }
            </Box>
        </Stack>
    )
}