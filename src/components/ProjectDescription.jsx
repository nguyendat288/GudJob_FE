import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import parse, { domToReact } from 'html-react-parser';

const ProjectDescription = ({ description }) => {
  // Ensure the description is a string
  const validDescription = typeof description === 'string' ? description : '';

  const parsedDescription = parse(validDescription, {
    replace: domNode => {
      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'p':
            // Replace <p> tags with Typography wrapped in a div
            return (
              <Box component="div" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  {domToReact(domNode.children)}
                </Typography>
              </Box>
            );
          case 'a':
            // Replace <a> tags with MUI Link component
            return (
              <Link href={domNode.attribs.href} sx={{ textDecoration: 'block' }} target={domNode.attribs.target} rel={domNode.attribs.rel}>
                {domToReact(domNode.children)}
              </Link>
            );
          case 'div':
            // Replace <div> tags with MUI Box component
            return (
              <Box sx={{ marginBottom: 2 }}>
                {domToReact(domNode.children)}
              </Box>
            );
          case 'ul':
            return (
              <Box component="ul" sx={{ paddingLeft: 3 }}>
                {domToReact(domNode.children)}
              </Box>
            );
          case 'li':
            return (
              <Typography component="li" variant="body1">
                {domToReact(domNode.children)}
              </Typography>
            );
          case 'strong':
            // Replace <strong> tags with Typography component with fontWeight
            return (
              <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
                {domToReact(domNode.children)}
              </Typography>
            );
          case 'em':
            // Replace <em> tags with Typography component with fontStyle
            return (
              <Typography component="span" variant="body1" sx={{ fontStyle: 'italic' }}>
                {domToReact(domNode.children)}
              </Typography>
            );
          case 'img':
            // Replace <img> tags with MUI Box component containing an img
            return (
              <Box component="img" src={domNode.attribs.src} alt={domNode.attribs.alt} sx={{ maxWidth: '100%', height: 'auto', marginBottom: 2 }} />
            );
          // Add more cases for other tags as needed
          default:
            return undefined; // Use default parsing for other tags
        }

      }
    },
  });

  return <Box>{parsedDescription}</Box>;
};

export default ProjectDescription;
