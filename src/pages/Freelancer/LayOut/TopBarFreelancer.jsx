import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  Popover,
  Toolbar,
  Typography,
} from '@mui/material';
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
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [topMenuAnchorEl, setTopMenuAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [anchorElMessage, setAnchorElMessage] = useState(null);

  const hanldCloseAll = () => {
    setAnchorElUser(null);
    setAnchorEl(null);
    setMenuAnchorEl(null);
    setTopMenuAnchorEl(null);
    setAnchorElMessage(null);
    setSelectedNotification(null);
  };

  const {
    connection,
    userConnection,
    numberOfMessage,
    setNumberOfMessage,
    listNotification,
    setListNotification,
    numberOfNotification,
    setNumberOfNotification,
    setChatSelect,
  } = UseChatState();

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const res = await profileApi.getUserProfile();
        setProfile(res);
      };
      getData();
    }
  }, [currentUser]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    hanldCloseAll();
    navigate('/profile');
  };

  const handleSetting = () => {
    hanldCloseAll();
    navigate('/profile-setting');
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      dispatch(logOutSuccess());
      localStorage.clear();
      if (connection != null) {
        await connection.stop();
      }
      navigate('/login');
      toast.success('Logout successfully!');
    } catch (error) {}
  };
  const handleSearch = () => {
    hanldCloseAll();
    navigate(`/search/${search}`);
  };

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
    } else if (option === 'delete') {
      await notificationApi.DeleteNotification(
        selectedNotification?.notificationId
      );
      removeNotificationStatus(selectedNotification?.notificationId);
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
      await notificationApi.MarkToReadAll(currentUser?.userId);
      updateNotificationStatusAll();
    } else if (option === 'deleteAll') {
      await notificationApi.DeleteAllNotification(currentUser?.userId);
      removeNotificationStatusAll();
    }
    hanldCloseAll();
  };

  const handleCheck = async (link, notificationId, isRead) => {
    if (isRead === 0) {
      await notificationApi.MarkToRead(notificationId);
      updateNotificationStatus(notificationId);
      navigate(link);
    } else {
      navigate(link);
    }
    hanldCloseAll();
  };

  const getNotificationColor = (isRead) => {
    return isRead === 1 ? '#F8F8FF' : '#C6E2FF';
  };

  const updateNotificationStatusAll = () => {
    setListNotification((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: 1,
      }))
    );
  };

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
      prevNotifications.filter(
        (notification) => notification.notificationId !== notificationId
      )
    );
  };

  const removeNotificationStatusAll = () => {
    setListNotification([]);
  };

  const hanldeSelectChat = async (conversationId, userId, senderId, isRead) => {
    setChatSelect(conversationId);
    if (senderId !== currentUser?.userId && isRead === 0) {
      await chatApi.markToRead(conversationId);
    }
    hanldCloseAll();
    navigate(`/chat/${conversationId}/${userId}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                mr: 2,
              }}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
            >
              GoodJob
            </Typography>
            {/* <Button variant="outlined">Tin tức </Button>
            <Button variant="outlined">Dự án </Button> */}
            <Box display="flex" flex={1} maxWidth="600px" mx={2}>
              {currentUser?.role !== 'Recruiter' &&
                currentUser?.role !== 'Admin' && (
                  <Box
                    display="flex"
                    flex={1}
                    borderRadius="30px"
                    bgcolor="#EEEEEE"
                  >
                    <InputBase
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Nhập tên dự án , kỹ năng , danh mục ...."
                      sx={{ ml: 2, flex: 1 }}
                    />
                    <IconButton
                      type="button"
                      onClick={(e) => handleSearch(e)}
                      p={1}
                    >
                      <SearchOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
            </Box>
            {currentUser ? (
              <Box display="flex" gap={2} alignItems="center">
                <IconButton onClick={handleMessageClick}>
                  <Badge badgeContent={numberOfMessage} color="error">
                    <Tooltip title="Tin nhắn">
                      <MessageOutlinedIcon />
                    </Tooltip>
                  </Badge>
                </IconButton>

                <Popover
                  id="message-popover"
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">Tin nhắn</Typography>
                    </Box>
                    <ListUser
                      listUser={userConnection}
                      hanldeSelectChat={hanldeSelectChat}
                      currentUser={currentUser}
                    />
                  </Box>
                </Popover>

                <IconButton onClick={handleNotificationClick}>
                  <Badge badgeContent={numberOfNotification} color="error">
                    <Tooltip title="Thông báo">
                      <NotificationsNoneOutlinedIcon />
                    </Tooltip>
                  </Badge>
                </IconButton>

                <Popover
                  id="notifications-popover"
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
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">Thông báo</Typography>
                      <IconButton edge="end" onClick={handleTopMenuOpen}>
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
                        <MenuItem
                          onClick={() =>
                            handleTopMenuOptionClick('markAllAsRead')
                          }
                        >
                          Đánh dấu đã đọc tất cả
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleTopMenuOptionClick('deleteAll')}
                        >
                          Xoá tất cả thông báo
                        </MenuItem>
                      </Menu>
                    </Box>
                    <List sx={{ width: '250px' }}>
                      {listNotification?.length === 0 ? (
                        <ListItem>
                          <ListItemText secondary="Không có thông báo" />
                        </ListItem>
                      ) : (
                        listNotification.map((item, index) => (
                          <ListItemButton
                            key={index}
                            sx={{
                              backgroundColor: getNotificationColor(
                                item?.isRead
                              ),
                            }}
                          >
                            <ListItemText
                              primary={
                                <Box>
                                  <Typography>
                                    {item?.sendUserName} {item?.description}
                                  </Typography>
                                  <Typography
                                    style={{ color: 'gray', fontSize: '0.8em' }}
                                  >
                                    {new Date(item?.datetime).toLocaleString()}
                                  </Typography>
                                </Box>
                              }
                              onClick={() =>
                                handleCheck(
                                  item?.link,
                                  item?.notificationId,
                                  item?.isRead
                                )
                              }
                            />
                            <IconButton
                              edge="end"
                              onClick={(event) => handleMenuOpen(event, item)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </ListItemButton>
                        ))
                      )}
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
                  <MenuItem onClick={() => handleMenuOptionClick('markAsRead')}>
                    Đánh dấu đã đọc
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuOptionClick('delete')}>
                    Xoá thông báo
                  </MenuItem>
                </Menu>

                <IconButton onClick={() => navigate('/favorite-list')}>
                  <Tooltip title="Danh sách yêu thích">
                    <FavoriteBorderOutlinedIcon />
                  </Tooltip>
                </IconButton>

                <LanguageSelector />

                <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                  {profile?.name}
                </Typography>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Profile Picture" src={profile?.avatar} />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleProfile}>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountCircleOutlinedIcon sx={{ mr: 1 }} />
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSetting}>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <SettingsOutlinedIcon sx={{ mr: 1 }} />
                      Settings
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Log Out
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box display="flex" gap={2}>
                <Button variant="outlined" onClick={() => navigate('/login')}>
                  Sign in
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/register')}
                >
                  Sign up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default TopBarFreelancer;
