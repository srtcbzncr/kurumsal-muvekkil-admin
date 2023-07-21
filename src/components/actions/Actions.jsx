import React from 'react'
import { Stack, Tooltip, IconButton } from '@mui/material';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import PendingSharpIcon from '@mui/icons-material/PendingSharp';
import GppGoodSharpIcon from '@mui/icons-material/GppGoodSharp';
import GppBadSharpIcon from '@mui/icons-material/GppBadSharp';
import { useTranslation } from 'react-i18next';

const Actions = ({id, active, deleted, setActiveFunc, setPassiveFunc, deleteFunc}) => {

    const {t, i18n} = useTranslation();

    return (
        <Stack direction="row" justifyContent="center">
          {
            deleted === false && 
            <Tooltip title={t("details")}>
              <IconButton size="small" color="text">
                <PendingSharpIcon></PendingSharpIcon>
              </IconButton>
            </Tooltip>
          }
          {
            deleted === false && active === true
            &&
              <Tooltip title={t("setPassive")}>
                <IconButton size="small" color="warning" onClick={() => setPassiveFunc(id)}>
                  <GppBadSharpIcon></GppBadSharpIcon>
                </IconButton>
              </Tooltip>
          }
          {
            deleted === false && active === false
            &&
              <Tooltip title={t("setActive")}>
                <IconButton size="small" color="success" onClick={() => setActiveFunc(id)}>
                  <GppGoodSharpIcon></GppGoodSharpIcon>
                </IconButton>
              </Tooltip>
          }
          {
            deleted === false 
            && 
            <Tooltip title={t("delete")}>
              <IconButton size="small" color="error" onClick={() => deleteFunc(id)}>
                <RemoveCircleSharpIcon />
              </IconButton>
            </Tooltip>
          }
        </Stack>
      );
}

export default Actions