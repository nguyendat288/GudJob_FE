import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AppBarChat from './AppBarChat'
import ListMessages from './ListMessages'
import SendMessage from './SendMessage'

const BoxChat = ({messages,currentUser,user,handleSendMessage,setMessage,message}) => {

    return (
        <Box>
            <AppBarChat user ={user}/>
            <ListMessages user={user} messages={messages} currentUser={currentUser} />
            <Box mt={1}>
                <SendMessage
                    setMessage ={setMessage}
                    message={message}
                handleSendMessage={handleSendMessage}/>
            </Box>
        </Box>
    )
}

export default BoxChat
