import axios from "axios";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import messageSound from "../assets/sound/message.mp3";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useSelector } from "react-redux";
import notificationApi from "../services/notificationApi";
import { BASE_URL } from "../services";
import { SettingsInputComponentRounded } from "@mui/icons-material";
import chatApi from "../services/chatApi";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);

    const [listNotification, setListNotification] = useState([])
    const [connection, setConnection] = useState(null)
    const [isConnect, setIsConnect] = useState(false);
    const [numberOfNotification, setNumberOfNotification] = useState(0);

    const [chatSelect, setChatSelect] = useState(0);
    const chatSelectRef = useRef(chatSelect);

    const [listMessages, setListMessage] = useState([])
    const [userConnection, setUserConnection] = useState([])
    const [numberOfMessage, setNumberOfMessage] = useState(0);
    const [haveMess, setHaveMessage] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                if (!isConnect && currentUser != null) {
                    const connection = new HubConnectionBuilder()
                        .withUrl(`${BASE_URL}/chat`)
                        .configureLogging(LogLevel.Information)
                        .build();
                    console.log(connection);
                    
                    connection.onclose(e => {
                        setConnection(null);
                        setIsConnect(false)
                        setListNotification([])
                    });
                    await connection.start();
                    await connection.invoke("SaveUserConnection", currentUser?.userId)
                    setConnection(connection);
                    setIsConnect(true)
                }
            } catch (e) {
            }
        }
        getData()
    }, [currentUser,isConnect])

    useEffect(() => {
        if (isConnect == true && connection != null) {
            connection.on("ReceivedNotification", (data) => {
                const sound = new Audio(messageSound);
                sound.play();
                setListNotification((prevNotifications) => [data, ...prevNotifications]);
                setNumberOfNotification((prevNumber) => prevNumber + 1);
            });
            connection.on("ReceivedMessage", (data) => {
                const sound = new Audio(messageSound);
                sound.play();
                if (chatSelectRef?.current == data?.conversationId) {
                    setListMessage(msg => [...msg, data])
                }
                setNumberOfMessage((prevNumber) => prevNumber + 1);
                setHaveMessage((prevNumber) => prevNumber + 1);
            })
            connection.on("HaveMessage", (data) => {
                setHaveMessage(data);
            })
        }
    }, [isConnect])

    useEffect(() => {
        chatSelectRef.current = chatSelect; // Update the ref whenever chatSelect changes
    }, [chatSelect]);

    console.log("connectionnnnn " + connection);

    useEffect(() => {
        const getNotification = async () => {
            if (currentUser != null) {
                let res = await notificationApi.GetAllNotification(currentUser?.userId)
                setListNotification(res)
            }
        }
        getNotification()
    }, [currentUser])

    useEffect(() => {
        const GetNumberMessage = async () => {
            if (currentUser != null) {
                let res = await chatApi.GetNumberMessage(currentUser?.userId)
                setNumberOfMessage(res)
            }
        }
        GetNumberMessage()
    }, [currentUser, haveMess])

    useEffect(() => {
        const getNotification = async () => {
            if (currentUser != null) {
                let res = await notificationApi.NumberNotification(currentUser?.userId)
                setNumberOfNotification(res)
            }
        }
        getNotification()
    }, [])

    useEffect(() => {
        const getUserConnect = async () => {
            if (currentUser != null) {
                let res = await chatApi.GetUserConnect(currentUser?.userId)
                setUserConnection(res)
            }
        }
        getUserConnect()
    }, [currentUser, haveMess])

    useEffect(() => {
        const getListMessages = async () => {
            if (currentUser != null) {
                let res = await chatApi.GetMessageByConversation(chatSelect)
                setListMessage(res)
            }
        }
        getListMessages()
    }, [chatSelect])

    return (
        <ChatContext.Provider
            value={{
                listNotification,
                setListNotification,
                connection,
                setConnection,
                isConnect,
                setIsConnect,
                numberOfNotification,
                setNumberOfNotification,
                chatSelect,
                setChatSelect,
                listMessages,
                setListMessage,
                userConnection,
                setUserConnection,
                numberOfMessage,
                setNumberOfMessage
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const UseChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;