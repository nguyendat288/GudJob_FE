import React from 'react'
import SideBar from './component/SideBar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

function Setting() {
  return (
    <>
      <div className='setting-container'>
        <Box display="flex" className="h-screen">
          <SideBar />
          <Box flex={1} className="overflow-y-auto">
            <Outlet />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Setting