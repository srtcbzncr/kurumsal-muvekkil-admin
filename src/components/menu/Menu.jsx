import './style.css';
import { Grid, Drawer, List, ListItemButton, ListItemIcon, ListItemText, styled, Stack, IconButton, Badge, Chip} from '@mui/material';
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
import { useNavigate } from 'react-router';

export default function Menu() {
    const [selected, setSelected] = useState(1);
    const { t, i18n } = useTranslation();
    const [cookie, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    function handleOnSelect(event, index){
        setSelected(index);
        switch(index){
            case 1:
                navigate("/");
                return;
            case 2:
                navigate("/users");
                return;
            case 3:
                navigate("/lawyers");
                return;
            case 4:
                navigate("/clients");
                return;
            case 5:
                navigate("/courts");
                return;
            case 6:
                navigate("/files");
                return;
            case 7:
                navigate("/subscriptions");
                return;
            default:
                navigate("/notFound");

        }
    }

    return (
        <Grid container item direction="column" justifyContent="space-between" alignItems="center">
            <Grid container item>
                <Grid container item direction="column" alignItems="center" sx={{ backgroundColor: "primary.dark"}}>
                    <Grid item width="55%" marginTop="10px">
                        <img src="/logo.png" width="100%"></img>
                    </Grid>
                    <Grid item marginTop="10px">
                        <Chip label={cookie.username} variant="filled" sx={{backgroundColor: "primary.contrastText"}}/>
                    </Grid>
                    <Grid item marginTop="30px" marginBottom="10px">
                        <Stack direction="row" width="100%" justifyContent="space-evenly"  alignItems="center" marginBottom="10px" spacing={2}>
                            <IconButton sx={{ color: "primary.contrastText" }} size="large">
                                <AccountCircleSharpIcon fontSize="large" />
                            </IconButton>
                            <IconButton sx={{ color: "primary.contrastText" }} size="large">
                            <Badge badgeContent={4} color="primary">
                                <CircleNotificationsSharpIcon fontSize="large" />
                            </Badge>
                            </IconButton>
                            <IconButton sx={{ color: "primary.contrastText" }} size="large">
                                <RemoveCircleSharpIcon fontSize="large" />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container item direction="column">
                    <List className='menuList' sx={{ width: '100%', bgcolor: 'parimary.main' }} component="nav" aria-labelledby="nested-list-subheader">
                        <ListItemButton onClick={(event) => handleOnSelect(event, 1)} selected={selected === 1} sx={{
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
                        <ListItemButton onClick={(event) => handleOnSelect(event, 2)} selected={selected === 2} sx={{
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
                        <ListItemButton onClick={(event) => handleOnSelect(event, 3)} selected={selected === 3} sx={{
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
                        <ListItemButton onClick={(event) => handleOnSelect(event, 4)} selected={selected === 4} sx={{
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
                        <ListItemButton onClick={(event) => handleOnSelect(event, 5)} selected={selected === 5} sx={{
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
                        <ListItemButton onClick={(event) => handleOnSelect(event, 6)} selected={selected === 6} sx={{
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
                        <ListItemButton onClick={(event) => handleOnSelect(event, 7)} selected={selected === 7} sx={{
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
                </Grid>
            </Grid>
            <Grid container item justifyContent="center" paddingBottom="20px">
                <LanguageSwitcher></LanguageSwitcher>
            </Grid>
        </Grid>
    )
}