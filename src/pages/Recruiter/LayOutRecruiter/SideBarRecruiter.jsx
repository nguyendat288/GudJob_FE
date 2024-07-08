import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import QuizIcon from '@mui/icons-material/Quiz';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}

    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};


const SideBarRecruiter = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("List Project");

  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  console.log(currentUser);

  return (
    <Box>
      <Sidebar collapsed={isCollapsed} width='300px' style={{ height: '100%' }}>
        <Menu iconShape="square"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? '#B0E0E6' : '#000000',
                  backgroundColor: active ? `#B0E2FF` : undefined,
                };
            },
          }}
        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: '#e0e0e0',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography fontSize='30px'>
                  GoodJob
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="80px"
                  height="80px"
                  src={currentUser?.avatar}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {currentUser?.name}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Divider />
            <Item
              title="Home Recruiter"
              to="/recruiter"
              icon={<HouseOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />
            <Typography
              variant="h6"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Project
            </Typography>
            <SubMenu label="Project Management" icon={<QuizIcon />}>
              <Item
                title="List Project"
                to="/list-project-recruiter"
                icon={<QuizIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </Sidebar>
    </Box>

  )
}

export default SideBarRecruiter
