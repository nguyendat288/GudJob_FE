import React from 'react';
import { Box } from '@mui/material'
import SideBarAdmin from './SideBarAdmin'
import TopBarAdmin from './TopBarAdmin'
import { Outlet } from 'react-router-dom'

const LayOutAdmin = () => {
    return (
        <Box display="flex">
            <SideBarAdmin />
            <Box component="main" className="flex-grow p-4 ml-64 mt-16">
                <TopBarAdmin />
                <div className="flex-grow bg-gray-50">
                    <Outlet />
                </div>
            </Box>
        </Box>
    );
};

export default LayOutAdmin;
