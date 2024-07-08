import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'

function SideBarAdmin() {
  const location = useLocation();
  const {t} = useTranslation(['admin', 'common']);
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const sidebarData = [
    {
      title: t("dashboard", { ns: 'common' }),
      link: "/admin",
      icon: <DashboardIcon />
    },
    {
      title: t("userList"),
      link: "/users-list",
      icon: <GroupIcon />
    },
    {
      title: t("reportList"),
      link: "/report-list",
      icon: <ReportProblemIcon />
    },
    {
      title: "Project List",
      link: "/project-list",
      icon: <AssignmentIndIcon />
    },
    {
      title: t("roles"),
      link: "/roles",
      icon: <AssignmentIndIcon />
    },
  ];

  return (
    <Box className="fixed top-0 left-0 h-full w-64 bg-gray-100 text-gray-800 border-r-2 border-gray-200">
      {/* Sidebar */}
      <Box className="w-64 bg-gray-100 text-gray-800 border-r-2 border-gray-200 flex flex-col justify-between" sx={{ mt: '64px', height: 'calc(100vh - 64px)' }}>
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Avatar and Admin Info */}
          <div className="flex items-center justify-center h-20 bg-gray-100 flex-col p-2">
            <Avatar
              alt="Avatar"
              src={currentUser?.avatar}
              sx={{ height: 64, width: 64, mb: 1 }}
            />
          </div>
          <Divider />
          {/* Sidebar links */}
          <div className="flex-1 overflow-y-auto">
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
          </div>
        </div>

        {/* Bottom Section (Logout Button) */}
        <div>
          <Divider />
          <ListItemButton
            component={Link}
            to="/logout"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(75, 85, 99, 0.5)',
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
                opacity: 0,
                transition: 'opacity 0.3s ease',
              },
              paddingX: 2,
              paddingY: 1,
              borderRadius: '4px',
            }}
          >
            <div className="flex items-center">
              <LogoutIcon sx={{mr: 1}}/>
              <ListItemText primary={t('logout', { ns: 'common' })} />
            </div>
          </ListItemButton>
        </div>
      </Box>
    </Box>
  );
}

export default SideBarAdmin;
