import './style.css';
import React from 'react';
import { Grid, Stack, Box} from '@mui/material';
import Menu from '../menu/Menu';

export default function Layout ({ children }) {
    return (
        <Stack direction="row" height='100%'>
            <Box height='100%' sx={{backgroundColor: 'primary.main', width: { xs: "35vw", sm: "25vw", md: "20vw", lg: "15vw", xl: "15vw" }}}>
                <Menu></Menu>
            </Box>
            <Box paddingLeft="50px" paddingRight="50px" sx={{ width: { xs: "65vw", sm: "75vw", md: "80vw", lg: "85vw", xl: "85vw" }}}>
                { children }
            </Box>
        </Stack>
    )
}