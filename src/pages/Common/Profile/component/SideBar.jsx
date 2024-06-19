import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'

function SideBar() {
    const sidebarData = [
        {
            title: "Profile",
            link:"profile-setting"
        },
        {
            title: "Change password",
            link:"change-password"
        },
        {
            title: "Experience and Education",
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
