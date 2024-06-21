import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'

function SideBar() {
    const sidebarData = [
        {
            title: "Hồ sơ cá nhân",
            link:"profile-setting"
        },
        {
            title: "Đổi mật khẩu",
            link:"change-password"
        },
        {
            title: "Kinh nghiệm và Học vấn",
            link:"experience-education"
        },
    ]
  return (
    <Box display="flex">
      <Box component="nav" width="250px" bgcolor="background.paper">
      <List>
          {sidebarData.map((val, key) => (
            <ListItemButton
              component={Link}
              to={val.link}
              key={key}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemText primary={val.title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default SideBar
