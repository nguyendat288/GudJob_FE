import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Box, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import WorkIcon from '@mui/icons-material/School';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

function SideBar() {
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const sidebarData = [
    {
      title: "Hồ sơ cá nhân",
      link: "profile-setting",
      icon: <PersonIcon />
    },
    {
      title: "Đổi mật khẩu",
      link: "change-password",
      icon: <LockIcon />
    },
    {
      title: "Kinh nghiệm và Học vấn",
      link: "experience-education",
      icon: <WorkIcon />
    },
  ];

  return (
    <Box display="flex" className="h-screen">
      {/* Sidebar */}
      <Box className="w-64 bg-gray-100 text-gray-800 border-r-2 border-gray-200">
        {/* Avatar */}
        <div className="flex items-center justify-center h-20 bg-gray-100">
          <Avatar
            alt="Avatar"
            src={currentUser?.avatar}
            sx={{ height: 64, width: 64 }} />
        </div>
        <Divider />
        {/* Sidebar links */}
        <List>
          {sidebarData.map((item, index) => {
            const isSelected = location.pathname.includes(item.link);
            return (
              <ListItemButton
                key={index}
                component={Link}
                to={item.link}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  backgroundColor: isSelected ? 'rgba(75, 85, 99, 0.5)' : 'inherit',
                  '&:hover': {
                    backgroundColor: isSelected ? 'rgba(75, 85, 99, 1)' : 'rgba(75, 85, 99, 0.5)',
                    '&::before': {
                      opacity: 1,
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: '60%',
                    width: '3px',
                    backgroundColor: 'white',
                    opacity: isSelected ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  },
                  paddingX: 2,
                  paddingY: 1,
                  borderRadius: '4px',
                }}
              >
                <div className="flex items-center">
                  <div className="mr-3">{item.icon}</div>
                  <ListItemText primary={item.title} />
                </div>
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box flex={1} p={4} className="overflow-y-auto">
        <Outlet />
      </Box>
    </Box>
  );
}

export default SideBar;
