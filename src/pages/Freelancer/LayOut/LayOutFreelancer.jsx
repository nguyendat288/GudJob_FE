import { Box } from '@mui/material'
import React from 'react'
import TopBar from './TopBarFreelancer'
import Footer from '../../../components/Footer'

const LayOutFreelancer = () => {
    return (
        <>
            <Box display='flex'>
                <Box flex='4'>
                    <TopBar />
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default LayOutFreelancer
