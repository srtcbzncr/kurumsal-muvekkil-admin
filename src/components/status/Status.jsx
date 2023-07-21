import React from 'react'
import { Box, Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Status = ({active, deleted}) => {

    const {t, i18n} = useTranslation();
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            {
            deleted 
            ? <Chip label={t("deleted")} variant="filled" color="error" />
            :   (
                    active === true 
                    ? <Chip label={t("active")} variant="filled" color="success" />
                    : <Chip label={t("passive")} variant="filled" color="warning" />
                )
            }
    </Box>
    )
}

export default Status