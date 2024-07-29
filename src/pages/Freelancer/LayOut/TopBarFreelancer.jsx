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
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logOutSuccess } from '../../../redux/authSlice';
import { toast } from 'react-toastify';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import profileApi from '../../../services/profileApi';
import LanguageSelector from '../../../components/language-selector';
import { UseChatState } from '../../../providers/ConnectContext';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import notificationApi from '../../../services/notificationApi';
import ListUser from '../../Common/Chat/ListUser';
import chatApi from '../../../services/chatApi';
import CustomAvatar from '../../../components/CustomAvatar';
import { styled } from '@mui/system';

const CustomLogin = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--primary-color)',
  color: 'var(--primary-color)',
  border: '1px solid var(--background-color)',
  borderRadius: '30px',
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  letterSpacing: '0.05rem',
  transition: 'background-color 0.3s, transform 0.3s, color 0.4s',
  '& span': {
    position: 'relative',
    color: 'var(--text-color)',
    zIndex: 10,
    transition: 'color 0.4s',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '120%',
    height: '150%',
    zIndex: 0,
    background: '#fff',
    transform: 'skew(30deg)',
    transition: 'transform 0.4s cubic-bezier(0.3, 1, 0.8, 1)',
  },
  '&:hover::before': {
    transform: 'translate3d(100%, 0, 0)',
  },
  '&:hover span': {
    color: 'var(--primary-color)',
  },
  '&:hover': {
    backgroundColor: 'var(--text-color)',
    border: '1px solid var(--background-color)',
    color: 'var(--primary-color)',
  },
  '&:active': {
    transform: 'scale(1)',
  },
  '&:disabled': {
    backgroundColor: 'var(--background-warning-color)',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
}));

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

  const handleProject = () => {
    navigate('/current-project');
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
      <AppBar position="sticky" sx={{ bgcolor: '#fff', mb: 5 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                display: 'flex',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                letterSpacing: '.3rem',
                textDecoration: 'none',
                mr: 2,
                color: 'var(--background-color)',
              }}
              // className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
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
                      <MessageRoundedIcon />
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
                  <Box
                    p={2}
                    sx={{
                      maxHeight: '400px',
                      overflow: 'auto',
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" className="font-bold text-xl">
                        Đoạn chat
                      </Typography>
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
                      <NotificationsRoundedIcon />
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
                  <Box
                    p={2}
                    sx={{
                      maxHeight: '400px',
                      overflow: 'auto',
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" className="font-bold text-xl">
                        Thông báo
                      </Typography>
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
                    <FavoriteRoundedIcon />
                  </Tooltip>
                </IconButton>

                <LanguageSelector />

                <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                  {profile?.name}
                </Typography>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {profile?.avatar === null ? (
                      <CustomAvatar name={profile?.name} />
                    ) : (
                      <Avatar alt="Profile Picture" src={profile?.avatar} />
                    )}
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
                  <MenuItem onClick={handleProject}>
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      <WorkOutlineRoundedIcon sx={{ mr: 1 }} />
                      Projects
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
                <CustomLogin
                  variant="outlined"
                  disableElevation
                  onClick={() =>
                    navigate('/login', { state: { showLogin: true } })
                  }
                >
                  <span>Đăng nhập</span>
                </CustomLogin>
                <CustomLogin
                  variant="outlined"
                  disableElevation
                  onClick={() =>
                    navigate('/login', { state: { showLogin: false } })
                  }
                >
                  <span>Đăng kí</span>
                </CustomLogin>
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
