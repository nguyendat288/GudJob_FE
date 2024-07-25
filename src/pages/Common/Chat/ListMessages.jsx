import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { formatDateTime } from '../../../utils/formatDate';
import CustomAvatar from '../../../components/CustomAvatar';

const ListMessages = ({ user, messages, currentUser }) => {
  const height = window.innerHeight - 200;

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ height: height, overflowY: 'auto' }}>
      {messages.map((message, index) =>
        message.senderId === currentUser.userId ? (
          <>
            <Box mt={2}>
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
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
          </>
        ) : (
          <>
            <Box mt={2}>
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
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
          </>
        )
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ListMessages;
