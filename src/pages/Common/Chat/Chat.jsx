import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { UseChatState } from '../../../providers/ConnectContext';
import chatApi from '../../../services/chatApi';
import ListUser from './ListUser';
import BoxChat from './BoxChat';

const Chat = () => {
    const { conversationId, userId } = useParams();
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const [user, setUser] = useState();
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const {
        chatSelect,
        setChatSelect,
        listMessages,
        userConnection
    } = UseChatState();

    useEffect(() => {
        const getUser = async () => {
            let res = await chatApi.GetInfo(userId)
            setUser(res)
        }
        getUser()
    }, [chatSelect, conversationId, userId])

    useEffect(() => {
        const MarkToRead = async () => {
            let res = await chatApi.GetInfo(userId)
            setUser(res)
        }
        MarkToRead()
    }, [chatSelect, conversationId, userId])

    useEffect(() => {
        setChatSelect(conversationId)
    }, [conversationId, setChatSelect])

    const hanldeSelectChat = async (conversationId, userId, senderId, isRead) => {
        setChatSelect(conversationId)
        if (senderId !== currentUser?.userId && isRead === 0) {
            await chatApi.markToRead(conversationId)
        }
        navigate(`/chat/${conversationId}/${userId}`)
    }

    const handleSendMessage = async (message) => {
        let data = {
            conversationId: chatSelect,
            senderId: currentUser?.userId,
            messageText: message
        }
        await chatApi.SendMessage(data)
        setMessage('')
    }

    return (
        <Box display='flex'>
            <Box flex='1'>
                <ListUser listUser={userConnection} currentUser={currentUser}
                    hanldeSelectChat={hanldeSelectChat} />
            </Box>
            <Box flex='4'>
                <BoxChat messages={listMessages}
                    currentUser={currentUser}
                    user={user}
                    handleSendMessage={handleSendMessage}
                    setMessage={setMessage}
                    message={message}
                />
            </Box>
        </Box>
    )
}

export default Chat
