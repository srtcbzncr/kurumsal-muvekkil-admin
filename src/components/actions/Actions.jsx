import React from 'react'
import { Stack, Tooltip, IconButton } from '@mui/material';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import PlaylistAddCircleSharpIcon from '@mui/icons-material/PlaylistAddCircleSharp';
import GppGoodSharpIcon from '@mui/icons-material/GppGoodSharp';
import GppBadSharpIcon from '@mui/icons-material/GppBadSharp';
import { useTranslation } from 'react-i18next';

const Actions = ({active, deleted}) => {

    const {t, i18n} = useTranslation();

    return (
        <Stack direction="row" justifyContent="center">
          {
            deleted === false && 
            <Tooltip title={t("edit")}>
              <IconButton size="small" color="text">
                <PlaylistAddCircleSharpIcon></PlaylistAddCircleSharpIcon>
              </IconButton>
            </Tooltip>
          }
          {
            deleted === false && active === true
            &&
              <Tooltip title={t("setPassive")}>
                <IconButton size="small" color="warning">
                  <GppBadSharpIcon></GppBadSharpIcon>
                </IconButton>
              </Tooltip>
          }
          {
            deleted === false && active === false
            &&
              <Tooltip title={t("setActive")}>
                <IconButton size="small" color="success">
                  <GppGoodSharpIcon></GppGoodSharpIcon>
                </IconButton>
              </Tooltip>
          }
          {
            deleted === false 
            && 
            <Tooltip title={t("delete")}>
              <IconButton size="small" color="error">
                <RemoveCircleSharpIcon />
              </IconButton>
            </Tooltip>
          }
        </Stack>
      );
}

export default Actions