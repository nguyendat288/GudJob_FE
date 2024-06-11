import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarRecruiter from './SideBarRecruiter'
import TopBarRecruiter from './TopBarRecruiter'

const LayOutRecruiter = () => {
  return (
    <Box display='flex'>
      <SideBarRecruiter />
      <Box flex='4'>
        <TopBarRecruiter />
        <Box>
      {/* <Outlet /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default LayOutRecruiter
