import { Avatar, Box, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react'

const ListUser = ({ listUser, currentUser, hanldeSelectChat }) => {

    const getMessageColor = (isRead, senderId) => {
        if (senderId === currentUser?.userId) {
            return "FFFFFF";
        } else {
            return isRead === 1 ? '#FFFFFF' : '#EEEEEE';
        }
    }

    return (
        <Box m={3}>
            {listUser.length === 0 && (<>
                <Typography fontWeight='bold'>Chưa kết nối ai </Typography>
            </>)}
            {listUser.length !== 0 && listUser.map((item, index) => (
                <ListItemButton
                    key={index}
                    sx={{ backgroundColor: getMessageColor(item?.isRead, item?.senderId) }}
                >
                    <Avatar src={item?.avatar} alt={item?.userName} sx={{ mr: 2 }} />
                    <ListItemText
                        onClick={() => hanldeSelectChat(item?.conversationId, item?.userId,item?.senderId,item?.isRead)}
                        primary={
                            <React.Fragment>
                                <span>{item?.userName}</span>
                                <br />
                                {item?.senderId === currentUser?.userId && (
                                    <>
                                        <span>Bạn : {item?.messageText}</span>
                                    </>
                                )}
                                {item?.senderId !== currentUser?.userId && (
                                    <>
                                        <span> {item?.messageText}</span>
                                    </>
                                )}
                                <br />
                                <span style={{ color: 'gray', fontSize: '0.8em' }}>
                                    {new Date(item?.sendDate).toLocaleString()}
                                </span>
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
            ))}

        </Box>
    )
}

export default ListUser
