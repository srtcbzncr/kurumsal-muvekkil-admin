import './style.css';
import { Grid, Drawer, List, ListItemButton, ListItemIcon, ListItemText, styled, Stack, IconButton, Divider } from '@mui/material';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GavelSharpIcon from '@mui/icons-material/GavelSharp';
import CasesSharpIcon from '@mui/icons-material/CasesSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import SupervisedUserCircleSharpIcon from '@mui/icons-material/SupervisedUserCircleSharp';
import CircleNotificationsSharpIcon from '@mui/icons-material/CircleNotificationsSharp';
import { useState } from 'react';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { useCookies } from "react-cookie";
import { Remove } from '@mui/icons-material';

export default function Menu() {
    const [selected, setSelected] = useState(1);
    const { t } = useTranslation();
    const [cookie, setCookie, removeCookie] = useCookies();

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    function handleOnSelect(event, index){
        setSelected(index);
    }

    return (
        <Grid container height='100%' width="300px">
            <Drawer
            sx={{
            width: "300px",
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: "300px",
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={true}
            >
                <Grid container direction="column" height="100%" justifyContent="space-between" alignItems="center">
                    <Grid container item direction="column" sx={{ backgroundColor: "primary.dark"}}>
                        <Grid container item justifyContent="center" alignItems="center" marginBottom="10px" marginTop="10px">
                            <img src="/logo.png" width='55%'></img>
                        </Grid>
                        <Grid container>
                            <Stack direction="row" width="100%" justifyContent="space-evenly"  alignItems="center" marginBottom="10px" spacing={2}>
                                <IconButton sx={{ color: "primary.contrastText" }} size="large">
                                    <AccountCircleSharpIcon fontSize="large" />
                                </IconButton>
                                <div>
                                <IconButton sx={{ color: "primary.contrastText" }} size="large">
                                    <CircleNotificationsSharpIcon fontSize="large" />
                                </IconButton>
                                </div>
                                <IconButton sx={{ color: "primary.contrastText" }} size="large">
                                    <RemoveCircleSharpIcon fontSize="large" />
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid container item>
                            <List
                            className='menuList'
                            sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton onClick={(event) => handleOnSelect(event, 1)} selected={selected === 1} sx={{
                                    "&.Mui-selected": {
                                    backgroundColor: "#1b7a4a"
                                    },
                                    "&.Mui-focusVisible": {
                                    backgroundColor: "#2e8b57"
                                    },
                                    ":hover": {
                                    backgroundColor: "#279d62"
                                    }
                                }}>
                                    <ListItemIcon>
                                    <HomeSharpIcon sx={{ color: "primary.contrastText" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={ t('home') } />
                                </ListItemButton>
                                <ListItemButton onClick={(event) => handleOnSelect(event, 2)} selected={selected === 2} sx={{
                                    "&.Mui-selected": {
                                    backgroundColor: "#1b7a4a"
                                    },
                                    "&.Mui-focusVisible": {
                                    backgroundColor: "#279d62"
                                    },
                                    ":hover": {
                                    backgroundColor: "#279d62"
                                    }
                                }}>
                                    <ListItemIcon>
                                    <SupervisedUserCircleSharpIcon sx={{ color: "primary.contrastText" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={ t('userManagement') } />
                                </ListItemButton>
                                <ListItemButton onClick={(event) => handleOnSelect(event, 3)} selected={selected === 3} sx={{
                                    "&.Mui-selected": {
                                    backgroundColor: "#1b7a4a"
                                    },
                                    "&.Mui-focusVisible": {
                                    backgroundColor: "#279d62"
                                    },
                                    ":hover": {
                                    backgroundColor: "#279d62"
                                    }
                                }}>
                                    <ListItemIcon>
                                    <BadgeSharpIcon sx={{ color: "primary.contrastText" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={ t('lawyerManagement') } />
                                </ListItemButton>
                                <ListItemButton onClick={(event) => handleOnSelect(event, 4)} selected={selected === 4} sx={{
                                    "&.Mui-selected": {
                                    backgroundColor: "#1b7a4a"
                                    },
                                    "&.Mui-focusVisible": {
                                    backgroundColor: "#279d62"
                                    },
                                    ":hover": {
                                    backgroundColor: "#279d62"
                                    }
                                }}>
                                    <ListItemIcon>
                                    <EmojiEmotionsSharpIcon sx={{ color: "primary.contrastText" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={ t('clientManagement') } />
                                </ListItemButton>
                                <ListItemButton onClick={(event) => handleOnSelect(event, 5)} selected={selected === 5} sx={{
                                    "&.Mui-selected": {
                                    backgroundColor: "#1b7a4a"
                                    },
                                    "&.Mui-focusVisible": {
                                    backgroundColor: "#279d62"
                                    },
                                    ":hover": {
                                    backgroundColor: "#279d62"
                                    }
                                }}>
                                    <ListItemIcon>
                                    <GavelSharpIcon sx={{ color: "primary.contrastText" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={ t('courtManagement') } />
                                </ListItemButton>
                                <ListItemButton onClick={(event) => handleOnSelect(event, 6)} selected={selected === 6} sx={{
                                    "&.Mui-selected": {
                                    backgroundColor: "#1b7a4a"
                                    },
                                    "&.Mui-focusVisible": {
                                    backgroundColor: "#279d62"
                                    },
                                    ":hover": {
                                    backgroundColor: "#279d62"
                                    }
                                }}>
                                    <ListItemIcon>
                                    <CasesSharpIcon sx={{ color: "primary.contrastText" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={ t('fileManagement') } />
                                </ListItemButton>
                                <ListItemButton onClick={(event) => handleOnSelect(event, 7)} selected={selected === 7} sx={{
                                    "&.Mui-selected": {
                                    backgroundColor: "#1b7a4a"
                                    },
                                    "&.Mui-focusVisible": {
                                    backgroundColor: "#279d62"
                                    },
                                    ":hover": {
                                    backgroundColor: "#279d62"
                                    }
                                }}>
                                    <ListItemIcon>
                                    <PaidSharpIcon sx={{ color: "primary.contrastText" }} />
                                    </ListItemIcon>
                                    <ListItemText primary={ t('subscriptionManagement') } />
                                </ListItemButton>
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item marginBottom="20px">
                        <LanguageSwitcher></LanguageSwitcher>
                    </Grid>
                </Grid>
            </Drawer>
        </Grid>
    )
}