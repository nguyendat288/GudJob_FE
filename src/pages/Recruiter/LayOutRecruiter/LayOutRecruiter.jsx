import { Box } from '@mui/material'
import React from 'react'
import SideBarRecruiter from './SideBarRecruiter'
import TopBarFreelancer from '../../Freelancer/LayOut/TopBarFreelancer'

const LayOutRecruiter = () => {
  return (
    <Box display='flex' height="100vh">
      <SideBarRecruiter />
      <Box flex='4' display='flex' flexDirection='column' height="100%">
        <TopBarFreelancer />
      </Box>
    </Box>
  )
}

export default LayOutRecruiter
