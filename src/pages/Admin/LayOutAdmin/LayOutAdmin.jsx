import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBarAdmin from './TopBarAdmin';
import SideBarAdmin from './SideBarAdmin';
import { Box } from '@mui/material';

const LayOutAdmin = () => {
    return (
        <Box display="flex">
            <SideBarAdmin />
            <Box component="main" className="flex-grow p-4 ml-64 mt-16">
                <TopBarAdmin />
                <main className="flex-grow p-4 bg-gray-50">
                    <Outlet />
                </main>
            </Box>
        </Box>
    );
};

export default LayOutAdmin;
