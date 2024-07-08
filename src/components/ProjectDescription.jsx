import React from 'react';
import { Box, Typography } from '@mui/material';
import parse, { domToReact } from 'html-react-parser';

const ProjectDescription = ({ description }) => {
  // Ensure the description is a string
  const validDescription = typeof description === 'string' ? description : '';

  const parsedDescription = parse(validDescription, {
    replace: domNode => {
      if (domNode.name === 'p') {
        return (
          <Typography variant="body1" paragraph>
            {domToReact(domNode.children)}
          </Typography>
        );
      }
      if (domNode.name === 'ul') {
        return (
          <Box component="ul" sx={{ paddingLeft: 3 }}>
            {domToReact(domNode.children)}
          </Box>
        );
      }
      if (domNode.name === 'li') {
        return (
          <Typography component="li" variant="body1">
            {domToReact(domNode.children)}
          </Typography>
        );
      }
    },
  });

  return <Box>{parsedDescription}</Box>;
};

export default ProjectDescription;
