import React from 'react'
import { Box, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Status = ({active, deleted}) => {

    const {t, i18n} = useTranslation();
    
    return (
        <Box display="flex" justifyContent="center">
            {
            deleted 
            ? <Chip label="Deleted" variant="outlined" color="error" />
            :   (
                    active === true 
                    ? <Chip label={t("active")} variant="outlined" color="success" />
                    : <Chip label={t("passive")} variant="outlined" color="warning" />
                )
            }
    </Box>
    )
}

export default Status