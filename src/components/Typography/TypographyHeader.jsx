import { Typography } from '@mui/material'
import React from 'react'

const TypographyHeader = ({title}) => {
  return (
    <Typography
        sx={{
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#333333',
        }}
        >{title}</Typography>
  )
}

export default TypographyHeader
