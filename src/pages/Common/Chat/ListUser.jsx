import React from 'react';
import {
  Avatar,
  Box,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import CustomAvatar from '../../../components/CustomAvatar';
import { truncateText } from '../../../utils/truncateText';

const UserListContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const UserListItem = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
}));

const MessagePreview = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9em',
}));

const Timestamp = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: '0.8em',
  marginLeft: 'auto',
}));

const getMessageColor = (isRead, senderId, currentUser) => {
  if (senderId === currentUser?.userId) {
    return '#FFFFFF';
  } else {
    return isRead === 1 ? '#FFFFFF' : '#F0F0F0';
  }
};

const ListUser = ({ listUser, currentUser, hanldeSelectChat }) => {
  return (
    <UserListContainer>
      {listUser.length === 0 ? (
        <Typography fontWeight="bold">Chưa kết nối ai </Typography>
      ) : (
        listUser.map((item, index) => (
          <UserListItem
            key={index}
            sx={{
              backgroundColor: getMessageColor(
                item?.isRead,
                item?.senderId,
                currentUser
              ),
            }}
            onClick={() =>
              hanldeSelectChat(
                item?.conversationId,
                item?.userId,
                item?.senderId,
                item?.isRead
              )
            }
          >
            {item?.avatar === null ? (
              <CustomAvatar name={item?.userName} marginRight={2} />
            ) : (
              <Avatar src={item?.avatar} alt={item?.userName} sx={{ mr: 2 }} />
            )}
            <ListItemText
              primary={
                <>
                  <UserName>{item?.userName}</UserName>
                  <MessagePreview>
                    {item?.senderId === currentUser?.userId
                      ? `Bạn: ${truncateText(item?.messageText, 12)}`
                      : truncateText(item?.messageText, 12)}
                  </MessagePreview>
                </>
              }
            />
            <Timestamp>{new Date(item?.sendDate).toLocaleString()}</Timestamp>
          </UserListItem>
        ))
      )}
    </UserListContainer>
  );
};

export default ListUser;
