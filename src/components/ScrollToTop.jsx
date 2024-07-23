import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { styled } from '@mui/system';

const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  backgroundColor: '#fad702',
  color: '#black',
  '&:hover': {
    backgroundColor: '#595855',
    color: '#fad702',
  },
});

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Zoom in={visible}>
      <StyledFab size="medium" onClick={scrollToTop}>
        <NavigationIcon />
      </StyledFab>
    </Zoom>
  );
};

export default ScrollToTop;
