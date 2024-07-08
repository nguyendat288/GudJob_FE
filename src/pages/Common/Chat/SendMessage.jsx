import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
const SendMessage = ({ handleSendMessage, message, setMessage }) => {
    return (
        <Box display='flex'>
            <TextField
                fullWidth
                placeholder='Nhập tin nhắn....'
                value={message}
                size='small'
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant='contained'
                onClick={(e) => handleSendMessage(message)}
            >Send <SendIcon /></Button>
        </Box>
    )
}

export default SendMessage
