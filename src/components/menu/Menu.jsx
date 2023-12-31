import React from 'react';

import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Stack, Box, Chip, Avatar, IconButton, Badge, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import GavelSharpIcon from '@mui/icons-material/GavelSharp';
import CasesSharpIcon from '@mui/icons-material/CasesSharp';
import PaidSharpIcon from '@mui/icons-material/PaidSharp';
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import SupervisedUserCircleSharpIcon from '@mui/icons-material/SupervisedUserCircleSharp';
import CircleNotificationsSharpIcon from '@mui/icons-material/CircleNotificationsSharp';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';

const Menu = () => {

    const [cookie, setCookie, removeCookie] = useCookies();
    const [selected, setSelected] = useState(1);
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    function handleOnSelect(index){
        setSelected(index);
        switch(index){
            case 1:
                navigate("/");
                return;
            case 2:
                navigate("/users");
                return;
            case 3:
                navigate("/companies");
                return;
            case 4:
                navigate("/lawyers");
                return;
            case 5:
                navigate("/clients");
                return;
            case 6:
                navigate("/courts");
                return;
            case 7:
                navigate("/files");
                return;
            case 8:
                navigate("/subscriptions");
                return;
            default:
                navigate("/");
                return;
        }
    }

    function handleLogoutOnClick() {
        removeCookie("username");
        removeCookie("password");
        removeCookie("role");
        navigate("/");
    }

    return (
        <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ width: { xs: "45vw", sm: "25vw", md: "20vw", lg: "15vw", xl: "15vw" }, height: 1, position: "fixed", backgroundColor: "primary.main" }}>
            <Stack direction="column"alignItems="center">
                <Stack direction="column" justifyContent="flex-start" alignItems="center" sx={{ width: "100%", backgroundColor: "primary.dark", paddingBottom: "20px"}}>
                    <Box className="logo" sx={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "20px" }}>
                        <img src='/logo.png' width="60%"></img>
                    </Box>
                    <Chip avatar={<Avatar>{ cookie.username.charAt(0) }</Avatar>} label={ cookie.username } size="medium" sx={{ backgroundColor: "background.paper", marginTop: "20px" }}/>
                    <Stack direction="row" sx={{ marginTop: "20px", width: "100%", justifyContent: "space-evenly" }}>
                            <IconButton sx={{ color: "primary.contrastText" }}>
                                <AccountCircleSharpIcon sx={{ fontSize: { xs: "26px", sm: "33px", md: "35px", lg: "38px", xl: "40px" }}}/>
                            </IconButton>
                            <IconButton sx={{ color: "primary.contrastText" }}>
                                <Badge badgeContent={4} color="primary">
                                    <CircleNotificationsSharpIcon sx={{ fontSize: { xs: "26px", sm: "33px", md: "35px", lg: "38px", xl: "40px" }}}/>
                                </Badge>
                            </IconButton>
                            <IconButton sx={{ color: "primary.contrastText" }} onClick={handleLogoutOnClick}>
                                <RemoveCircleSharpIcon sx={{ fontSize: { xs: "26px", sm: "33px", md: "35px", lg: "38px", xl: "40px" }}}/>
                            </IconButton>
                    </Stack>
                </Stack>
                <Stack direction="column" justifyContent="center" sx={{ width: "100%" }}>
                    <List className='menuList' sx={{ width: '100%', backgroundColor: "primary.main", color: "primary.contrastText" }} component="nav" aria-labelledby="nested-list-subheader">
                        <ListItemButton selected={selected === 1} onClick={() => handleOnSelect(1)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
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
                        <ListItemButton selected={selected === 2} onClick={() => handleOnSelect(2)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
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
                            <ListItemText primary={ t('user.management') } />
                        </ListItemButton>
                        <ListItemButton selected={selected === 3} onClick={() => handleOnSelect(3)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
                            },
                            "&.Mui-focusVisible": {
                            backgroundColor: "#279d62"
                            },
                            ":hover": {
                            backgroundColor: "#279d62"
                            }
                        }}>
                            <ListItemIcon>
                                <ShoppingBasketSharpIcon sx={{ color: "primary.contrastText" }} />
                            </ListItemIcon>
                            <ListItemText primary={ t('customer.management') } />
                        </ListItemButton>
                        <ListItemButton selected={selected === 4} onClick={() => handleOnSelect(4)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
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
                            <ListItemText primary={ t('lawyer.management') } />
                        </ListItemButton>
                        <ListItemButton selected={selected === 5} onClick={() => handleOnSelect(5)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
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
                            <ListItemText primary={ t('client.management') } />
                        </ListItemButton>
                        <ListItemButton selected={selected === 6} onClick={() => handleOnSelect(6)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
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
                            <ListItemText primary={ t('court.management') } />
                        </ListItemButton>
                        <ListItemButton selected={selected === 7} onClick={() => handleOnSelect(7)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
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
                            <ListItemText primary={ t('file.management') } />
                        </ListItemButton>
                        <ListItemButton selected={selected === 8} onClick={() => handleOnSelect(8)} sx={{
                            width: "100%",
                            "&.Mui-selected": {
                            backgroundColor: "primary.light"
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
                            <ListItemText primary={ t('subscription.management') } />
                        </ListItemButton>
                    </List>
                </Stack>
            </Stack>
            <Box marginBottom="20px" display="flex" justifyContent="center" sx={{ width: "100%", backgroundColor: "primary.main" }}>
                <LanguageSwitcher></LanguageSwitcher>
            </Box>
        </Stack>
    )
}

export default Menu