import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
const SendMessage = ({ handleSendMessage, message, setMessage }) => {

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents the default form submission behavior
            handleSendMessage(message);
        }
    };

    return (
        <Box display='flex' >
            <TextField
                fullWidth
                placeholder='Nhập tin nhắn....'
                value={message}
                size='small'
                onKeyDown={handleKeyPress}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant='contained'
                onClick={(e) => handleSendMessage(message)}
            >Send <SendIcon /></Button>
        </Box>
    )
}

export default SendMessage
