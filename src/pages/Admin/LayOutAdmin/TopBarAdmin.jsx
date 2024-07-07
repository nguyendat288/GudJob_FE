import React, { useState } from 'react'
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logOutSuccess } from '../../../redux/authSlice';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LanguageSelector from '../../../components/language-selector';
import { useTranslation } from 'react-i18next';

const TopBarAdmin = () => {
    const { t } = useTranslation('common');
    const currentUser = useSelector((state) => state.auth.login?.currentUser)
    const [anchorElUser, setAnchorElUser] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        dispatch(logOutSuccess())
        localStorage.clear();
        navigate('/login');
        toast.success('Logout successfully!');
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: 'white', zIndex: 1201 }}>
                <Container maxWidth="xl">
                    <Toolbar >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/admin"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                            className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text'
                        >
                            GoodJob
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, borderRadius: '30px' }}>

                        </Box>
                        <Box display='flex' gap={2}>
                            <Tooltip title={t('message')}>
                                <IconButton>
                                    <MessageOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('notifications')}>
                                <IconButton>
                                    <NotificationsNoneOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('settings')}>
                                <IconButton>
                                    <SettingsOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <LanguageSelector />
                            <Typography sx={{
                                color: 'black',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 'bold'
                            }}>{currentUser?.name}</Typography>
                            <Tooltip title={t('open_settings')}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={currentUser?.avatar} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                                        Profile
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogOut} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LogoutIcon sx={{ mr: 1 }} />
                                        LogOut
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>

    )
}

export default TopBarAdmin
