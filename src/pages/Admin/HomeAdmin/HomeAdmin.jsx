import { Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'

const HomeAdmin = () => {
  const {t} = useTranslation('admin');
  const description = t("description");
  return (
    <div>
      <Typography>{t("dashboard")}</Typography>
      <Typography>{description.line1}</Typography>
      <Typography>{description.line2}</Typography>
    </div>
  )
}

export default HomeAdmin
