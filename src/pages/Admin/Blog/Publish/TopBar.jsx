import React, { useState } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import logoImage from '../../../../assets/logo.png'


const TopBar = () => {
  const [search, setSearch] = useState('')

  return (
    <Container maxWidth="xl">
      <Box p={4}>
      <Box
      sx={{
        width :'12%',
        height:'100px',
        backgroundImage: `url(${logoImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
      }}
    >
    </Box>       
     {/* <Typography fontSize='40px' color='#FFFF00' fontWeight='bold'>
          GOOD JOBS BLOG
        </Typography> */}

        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                BLOGS
              </Typography>

              <Search>
                <SearchIconWrapper>
                  <SearchOutlinedIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm theo tiêu đề ... "
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </Box>
    </Container>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export default TopBar
