import {
  Avatar,
  Box,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { formatDateTime } from '../../../utils/formatDate';
import CustomAvatar from '../../../components/CustomAvatar';

const ListMessages = ({ user, messages, currentUser, loadMoreMessages }) => {
  const height = window.innerHeight - 200;

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const [isFetching, setIsFetching] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScroll = async () => {
    console.log(messagesContainerRef.current.scrollTop);
    if (messagesContainerRef.current.scrollTop === 0) {
      console.log('aaaaa');
      setIsFetching(true);
      await loadMoreMessages();
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isFetching]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <Box ref={messagesContainerRef} sx={{ height: height, overflowY: 'auto' }}>
      {isFetching && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: 2,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {messages.map((message, index) =>
        message.senderId === currentUser.userId ? (
          <Box mt={2} key={index}>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Tooltip title={formatDateTime(new Date(message?.sendDate))}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box bgcolor="#EEEEEE" borderRadius="10px" p={1}>
                    <Typography>{message.messageText}</Typography>
                  </Box>
                  {currentUser?.avatar === null ? (
                    <CustomAvatar name={currentUser?.name} />
                  ) : (
                    <Avatar alt="Avatar" src={currentUser?.avatar} />
                  )}
                </Box>
              </Tooltip>
            </Box>
          </Box>
        ) : (
          <Box mt={2} key={index}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Tooltip title={formatDateTime(new Date(message?.sendDate))}>
                <Box display="flex" alignItems="center" gap={2}>
                  {user?.avatar === null ? (
                    <CustomAvatar name={user?.name} />
                  ) : (
                    <Avatar alt="Avatar" src={user?.avatar} />
                  )}
                  <Box bgcolor="#EEEEEE" borderRadius="10px" p={1}>
                    <Typography>{message.messageText}</Typography>
                  </Box>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        )
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ListMessages;
