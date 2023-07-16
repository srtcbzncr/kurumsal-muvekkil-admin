import React, { useState } from 'react'
import { Box, Stack, Button, Typography, Avatar, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import AuthCheck from '../authCheck/AuthCheck';
import Layout from '../layout/Layout';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';

const CourtList = () => {

  const [tab, setTab] = useState("All");
  const [openMenu, setOpenMenu] = useState(false);

  function handleSelectTab(value){
    setTab(value);
  }

  return (
    <AuthCheck>
    <Layout>
        <Stack direction="column">
            <Stack direction="row" justifyContent="space-between" sx={{ marginTop: "40px" }}>
              <Box display="flex" width="15vw" justifyContent="center" sx={{ backgroundColor: "secondary.main", border: 1, borderColor: "border.secondary", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <Stack direction="column">
                  <Box>
                    Deneme
                  </Box>
                  <Box>
                    Deneme
                  </Box>
                </Stack>
              </Box>
              <Box display="flex" width="15vw" justifyContent="center" sx={{ backgroundColor: "secondary.main", border: 1, borderColor: "border.secondary", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <Stack direction="column">
                  <Box>
                    Deneme
                  </Box>
                  <Box>
                    Deneme
                  </Box>
                </Stack>
              </Box>
              <Box display="flex" width="15vw" justifyContent="center" sx={{ backgroundColor: "secondary.main", border: 1, borderColor: "border.secondary", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <Stack direction="column">
                  <Box>
                    Deneme
                  </Box>
                  <Box>
                    Deneme
                  </Box>
                </Stack>
              </Box>
              <Box display="flex" width="15vw" justifyContent="center" sx={{ backgroundColor: "secondary.main", border: 1, borderColor: "border.secondary", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px" }}>
                <Stack direction="column">
                  <Box>
                    Deneme
                  </Box>
                  <Box>
                    Deneme
                  </Box>
                </Stack>
              </Box>
            </Stack>
        </Stack>
        <Stack direction="column" width="100%" sx={{ marginTop: "40px" }}>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Typography variant="h4">
              Mahkeme Yönetimi
            </Typography>
            <Button variant="contained" startIcon={<AddCircleSharpIcon />}>
              YENİ
            </Button>
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between" sx={{ backgroundColor: "secondary.main", marginTop: "40px", padding: "10px", border: 1, borderColor: "border.secondary", }}>
            <Stack direction="row" width="100%" spacing={2} justifyContent="flex-start">
              <Button onClick={() => handleSelectTab("All")} sx={{color: tab === "All" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "All" && 2, borderColor: tab === "All" && "text.main" }}><Typography variant='subtitle'>All</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "text.main"}}>120</Avatar></Button>
              <Button onClick={() => handleSelectTab("Active")} sx={{color: tab === "Active" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Active" && 2, borderColor: tab === "Active" && "success.main" }}><Typography variant='subtitle'>Active</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "success.main"}}>12</Avatar></Button>
              <Button onClick={() => handleSelectTab("Passive")} sx={{color: tab === "Passive" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Passive" && 2, borderColor: tab === "Passive" && "warning.main" }}><Typography variant='subtitle'>Passive</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "warning.main"}}>12</Avatar></Button>
              <Button onClick={() => handleSelectTab("Deleted")} sx={{color: tab === "Deleted" ? "text.main" : "secondary.dark", borderRadius: 0, borderBottom: tab === "Deleted" && 2, borderColor: tab === "Deleted" && "error.main" }}><Typography variant='subtitle'>Deleted</Typography><Avatar sx={{ width: "22px", height: "22px", fontSize: "10px", marginLeft: "5px", backgroundColor: "error.main"}}>12</Avatar></Button>
            </Stack>
            <IconButton size="small">
              <MoreVertSharpIcon/>
            </IconButton>
          </Stack>
          <Stack direction="row" width="100%" justifyContent="flex-end" sx={{ backgroundColor: "secondary.main", border: 1, borderColor: "border.secondary"}}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
            />
            <IconButton color="primary" size="large">
              <SearchSharpIcon />
            </IconButton>
          </Stack>
        </Stack>
    </Layout>
</AuthCheck>
  )
}

export default CourtList