import { Box } from '@mui/material'
import React from 'react'
import SideBarAdmin from './SideBarAdmin'
import TopBarAdmin from './TopBarAdmin'
import { Outlet } from 'react-router-dom'
import TopBarRecruiter from '../../Recruiter/LayOutRecruiter/TopBarRecruiter'

const LayOutAdmin = () => {
    return (
        <Box display='flex'>
            <SideBarAdmin />
            <Box flex='4'>
                <TopBarRecruiter />
                <Box>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default LayOutAdmin
