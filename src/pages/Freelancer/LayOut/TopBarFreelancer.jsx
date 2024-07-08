import React, { useEffect, useState } from 'react'
import { AppBar, Badge, Box, Button, Container, IconButton, InputBase, List, ListItem, ListItemButton, ListItemText, Menu, Popover, Toolbar, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../../../redux/authSlice';
import { toast } from 'react-toastify';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import profileApi from '../../../services/profileApi';
import LanguageSelector from '../../../components/language-selector';
import { UseChatState } from '../../../providers/ConnectContext';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import notificationApi from '../../../services/notificationApi';
import ListUser from '../../Common/Chat/ListUser';
import chatApi from '../../../services/chatApi';
const TopBarFreelancer = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const res = await profileApi.getUserProfile();
        setProfile(res);
      };
      getData();
    }
  }, [currentUser]);
  const [search, setSearch] = useState('')

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [topMenuAnchorEl, setTopMenuAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [anchorElMessage, setAnchorElMessage] = useState(null);

  const {
    connection,
    userConnection,
    numberOfMessage,
    setNumberOfMessage,
    listNotification,
    setListNotification,
    numberOfNotification,
    setNumberOfNotification,
    setChatSelect
  } = UseChatState();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSetting = () => {
    navigate('/profile-setting');
  };

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    dispatch(logOutSuccess())
    localStorage.clear();
    await connection.stop();
    navigate('/login');
    toast.success('Logout successfully!');
  }

  const handleSearch = () => {
    navigate(`/search/${search}`)
  }

  const handleNotificationClick = (event) => {
    setNumberOfNotification(0);
    setAnchorEl(event.currentTarget);
  };

  const handleMessageClick = (event) => {
    setNumberOfMessage(0);
    setAnchorElMessage(event.currentTarget);
  };

  const handleMessageClose = () => {
    setAnchorElMessage(null);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event, notification) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleMenuOptionClick = async (option) => {
    if (option === 'markAsRead') {
      await notificationApi.MarkToRead(selectedNotification?.notificationId);
      updateNotificationStatus(selectedNotification?.notificationId);
      console.log('Marking notification as read');
    } else if (option === 'delete') {
      await notificationApi.DeleteNotification(selectedNotification?.notificationId);
      removeNotificationStatus(selectedNotification?.notificationId);
      console.log('Deleting notification');
      // Add your logic to delete all notifications
    }
    handleMenuClose();
  };

  const handleTopMenuOpen = (event) => {
    setTopMenuAnchorEl(event.currentTarget);
  };

  const handleTopMenuClose = () => {
    setTopMenuAnchorEl(null);
  };

  const handleTopMenuOptionClick = async (option) => {
    if (option === 'markAllAsRead') {
      await notificationApi.MarkToReadAll(currentUser?.userId)
      updateNotificationStatusAll()
      //  console.log('Marking all notifications as read');
    } else if (option === 'deleteAll') {
      await notificationApi.DeleteAllNotification(currentUser?.userId)
      removeNotificationStatusAll()
      //   console.log('Deleting all notifications');
    }
    else if (option === 'check') {
      // Add your logic to delete all notifications
      console.log('check');
    }
    handleTopMenuClose();
  };

  const handleCheck = async (link, notificationId, isRead) => {
    if (isRead === 0) {
      await notificationApi.MarkToRead(notificationId);
      updateNotificationStatus(notificationId);
      navigate(link);
    } else {
      navigate(link);
    }
  };

  const getNotificationColor = (isRead) => {
    return isRead === 1 ? '#F8F8FF' : '#C6E2FF';
  };

  const updateNotificationStatusAll = () => {
    setListNotification((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: 1
      }))
    );
  }

  const updateNotificationStatus = (notificationId) => {
    setListNotification((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.notificationId === notificationId
          ? { ...notification, isRead: 1 }
          : notification
      )
    );
  };

  const removeNotificationStatus = (notificationId) => {
    setListNotification((prevNotifications) =>
      prevNotifications.filter((notification) => notification.notificationId !== notificationId)
    );
  };
  const removeNotificationStatusAll = () => {
    setListNotification([]);
  };

  const hanldeSelectChat = async (conversationId, userId, senderId, isRead) => {
    setChatSelect(conversationId)
    if (senderId !== currentUser?.userId && isRead === 0) {
      await chatApi.markToRead(conversationId)
    }
    navigate(`/chat/${conversationId}/${userId}`)
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
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
              <Box display='flex'
                borderRadius='3px'
                bgcolor='#EEEEEE'
                sx={{ width: '50%' }}
              >
                <InputBase
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Seach name project' sx={{ ml: 2, flex: 1 }} />
                <IconButton type='button'
                  onClick={(e) => handleSearch(e)}
                  p={1}>
                  <SearchOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            {currentUser && (
              <Box display='flex' gap={2}  >
                <IconButton onClick={handleMessageClick}>
                  <Badge badgeContent={numberOfMessage} color="error">
                    <MessageOutlinedIcon />
                  </Badge>
                </IconButton>

                <Popover
                  id='message-popover'
                  open={Boolean(anchorElMessage)}
                  anchorEl={anchorElMessage}
                  onClose={handleMessageClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Box p={2}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Typography variant='h6'>Tin Nhắn</Typography>
                    </Box>
                    <ListUser listUser={userConnection}
                      hanldeSelectChat={hanldeSelectChat}
                      currentUser={currentUser} />
                  </Box>
                </Popover>


                <IconButton onClick={handleNotificationClick}>
                  <Badge badgeContent={numberOfNotification} color="error">
                    <NotificationsNoneOutlinedIcon />
                  </Badge>
                </IconButton>
                <Popover
                  id='notifications-popover'
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleNotificationClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Box p={2}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Typography variant='h6'>Thông báo</Typography>
                      <IconButton edge='end' aria-label='options' onClick={(e) => handleTopMenuOpen(e)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={topMenuAnchorEl}
                        open={Boolean(topMenuAnchorEl)}
                        onClose={handleTopMenuClose}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem onClick={() => handleTopMenuOptionClick('markAllAsRead')}>
                          Mark All as Read
                        </MenuItem>
                        <MenuItem onClick={() => handleTopMenuOptionClick('deleteAll')}>
                          Delete All
                        </MenuItem>
                      </Menu>
                    </Box>
                    <List sx={{ width: '250px' }}>
                      {listNotification?.length === 0 && (
                        <ListItem>
                          <ListItemText secondary='Không có thông báo nào' />
                        </ListItem>
                      )}
                      {listNotification?.length !== 0 &&
                        listNotification.map((item, index) => (
                          <ListItemButton
                            key={index}
                            sx={{ backgroundColor: getNotificationColor(item?.isRead) }}
                          >
                            <ListItemText
                              onClick={() => handleCheck(item?.link, item?.notificationId, item?.isRead)}
                              primary={
                                <React.Fragment>
                                  <span>{item?.description}</span>
                                  <br />
                                  <span style={{ color: 'gray', fontSize: '0.8em' }}>
                                    {new Date(item?.datetime).toLocaleString()}
                                  </span>
                                </React.Fragment>
                              }
                            />
                            <IconButton
                              edge='end'
                              aria-label='options'
                              onClick={(event) => handleMenuOpen(event, item)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </ListItemButton>
                        ))}
                    </List>
                  </Box>
                </Popover>
                <Menu
                  anchorEl={menuAnchorEl}
                  open={Boolean(menuAnchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleMenuOptionClick('markAsRead')}>Mark as Read</MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick('delete')}>Delete</MenuItem>
                </Menu>
                <IconButton>
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
                <LanguageSelector />
                <Typography sx={{
                  color: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 'bold'
                }}>{profile?.name}</Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={profile?.avatar} />
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
                  <MenuItem onClick={handleProfile} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSetting} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <SettingsOutlinedIcon sx={{ mr: 1 }} />
                      Setting
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
            )}
            {
              currentUser == null && (
                <>
                  <Box display='flex' gap={2}>
                    <Button variant="outlined" onClick={(e) => navigate('/login')}>Sign in</Button>
                    <Button variant="outlined" onClick={(e) => navigate('/register')}>Sign up</Button>
                  </Box>
                </>
              )
            }
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default TopBarFreelancer
