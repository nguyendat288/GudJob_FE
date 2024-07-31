import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import parse, { domToReact } from 'html-react-parser';
import { useLocation } from 'react-router-dom';

const ProjectDescription = ({ description }) => {
  const validDescription = typeof description === 'string' ? description : '';
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);
  const location = useLocation();

  const isDetailPage = location.pathname.includes('detail/');

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  useEffect(() => {
    if (descriptionRef.current && !isDetailPage) {
      const height = descriptionRef.current.scrollHeight;
      const lineHeight = parseFloat(
        getComputedStyle(descriptionRef.current).lineHeight
      );
      const maxHeight = lineHeight * 3;
      setIsOverflowing(height > maxHeight);
    }
  }, [validDescription, isDetailPage]);

  const parsedDescription = parse(validDescription, {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'p':
            return (
              <Box component="div" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  {domToReact(domNode.children)}
                </Typography>
              </Box>
            );
          case 'a':
            return (
              <Link
                href={domNode.attribs.href}
                sx={{ textDecoration: 'block' }}
                target={domNode.attribs.target}
                rel={domNode.attribs.rel}
              >
                {domToReact(domNode.children)}
              </Link>
            );
          case 'div':
            return (
              <Box sx={{ marginBottom: 2 }}>{domToReact(domNode.children)}</Box>
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
            return (
              <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: 'bold' }}
              >
                {domToReact(domNode.children)}
              </Typography>
            );
          case 'em':
            return (
              <Typography
                component="span"
                variant="body1"
                sx={{ fontStyle: 'italic' }}
              >
                {domToReact(domNode.children)}
              </Typography>
            );
          case 'img':
            return (
              <Box
                component="img"
                src={domNode.attribs.src}
                alt={domNode.attribs.alt}
                sx={{ maxWidth: '100%', height: 'auto', marginBottom: 2 }}
              />
            );
          default:
            return undefined;
        }
      }
    },
  });

  return (
    <Box>
      <Box
        ref={descriptionRef}
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: showFullDescription ? 'none' : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {parsedDescription}
      </Box>
      {isOverflowing && (
        <Link
          component="button"
          variant="body2"
          onClick={toggleDescription}
          sx={{ mt: 2 }}
        >
          {showFullDescription ? 'Ẩn bớt' : '...xem thêm'}
        </Link>
      )}
    </Box>
  );
};

export default ProjectDescription;
