import React from 'react'
import { Stack, Tooltip, IconButton } from '@mui/material';
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import PlaylistAddCircleSharpIcon from '@mui/icons-material/PlaylistAddCircleSharp';
import GppGoodSharpIcon from '@mui/icons-material/GppGoodSharp';
import GppBadSharpIcon from '@mui/icons-material/GppBadSharp';

const Actions = ({active, deleted}) => {
    return (
        <Stack direction="row" justifyContent="center">
          {
            deleted === false && 
            <Tooltip title="Edit">
              <IconButton size="small" color="text">
                <PlaylistAddCircleSharpIcon></PlaylistAddCircleSharpIcon>
              </IconButton>
            </Tooltip>
          }
          {
            deleted === false && active === true
            &&
              <Tooltip title="Set Passive">
                <IconButton size="small" color="warning">
                  <GppBadSharpIcon></GppBadSharpIcon>
                </IconButton>
              </Tooltip>
          }
          {
            deleted === false && active === false
            &&
              <Tooltip title="Set Active">
                <IconButton size="small" color="success">
                  <GppGoodSharpIcon></GppGoodSharpIcon>
                </IconButton>
              </Tooltip>
          }
          {
            deleted === false 
            && 
            <Tooltip title="Delete">
              <IconButton size="small" color="error">
                <RemoveCircleSharpIcon />
              </IconButton>
            </Tooltip>
          }
        </Stack>
      );
}

export default Actions