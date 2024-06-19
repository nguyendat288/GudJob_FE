import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBarRecruiter from './SideBarRecruiter'
import TopBarRecruiter from './TopBarRecruiter'

const LayOutRecruiter = () => {
  return (
    <Box display='flex' height="100vh">
      <SideBarRecruiter />
      <Box flex='4' display='flex' flexDirection='column' height="100%">
        <TopBarRecruiter />
        <Box flex="1" overflow="auto">
          {/* <Outlet /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default LayOutRecruiter
