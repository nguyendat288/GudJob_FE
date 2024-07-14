import { Box, Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'

const HomeAdmin = () => {
  const {t} = useTranslation('admin');
  const description = t("description");
  return (
    <Box>
      <Typography>{t("dashboard")}</Typography>
      <Typography>{description.line1}</Typography>
      <Typography>{description.line2}</Typography>
    </Box>
  )
}

export default HomeAdmin
