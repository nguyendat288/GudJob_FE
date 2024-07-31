import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import messageSound from '../assets/sound/message.mp3';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import notificationApi from '../services/notificationApi';
import { BASE_URL } from '../services';
import chatApi from '../services/chatApi';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);

  const [listNotification, setListNotification] = useState([]);
  const [connection, setConnection] = useState(null);
  const [isConnect, setIsConnect] = useState(false);
  const [numberOfNotification, setNumberOfNotification] = useState(0);

  const [chatSelect, setChatSelect] = useState(-1);
  const chatSelectRef = useRef(chatSelect);

  const [listMessages, setListMessage] = useState([]);
  const [userConnection, setUserConnection] = useState([]);
  const [numberOfMessage, setNumberOfMessage] = useState(0);
  const [haveMess, setHaveMessage] = useState(0);
  const [lastDate, setLastDate] = useState('0');
  const lastDateRef = useRef(lastDate);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!isConnect && currentUser != null) {
          const connection = new HubConnectionBuilder()
            .withUrl(`${BASE_URL}/chat`)
            .configureLogging(LogLevel.Information)
            .build();

          connection.onclose((e) => {
            setConnection(null);
            setIsConnect(false);
            setListNotification([]);
          });
          await connection.start();
          await connection.invoke('SaveUserConnection', currentUser?.userId);
          setConnection(connection);
          setIsConnect(true);
        }
      } catch (e) {}
    };
    getData();
  }, [currentUser, isConnect]);

  useEffect(() => {
    if (isConnect === true && connection != null) {
      connection.on('ReceivedNotification', (data) => {
        const sound = new Audio(messageSound);
        sound.play();
        setListNotification((prevNotifications) => [
          data,
          ...prevNotifications,
        ]);
        setNumberOfNotification((prevNumber) => prevNumber + 1);
      });
      connection.on('ReceivedMessage', (data) => {
        const sound = new Audio(messageSound);
        sound.play();
        if (chatSelectRef?.current === data?.conversationId) {
          setListMessage((msg) => [...msg, data]);
        }
        setNumberOfMessage((prevNumber) => prevNumber + 1);
        setHaveMessage((prevNumber) => prevNumber + 1);
      });
      connection.on('HaveMessage', (data) => {
        setHaveMessage(data);
      });
    }
  }, [isConnect]);

  useEffect(() => {
    chatSelectRef.current = chatSelect; // Update the ref whenever chatSelect changes
  }, [chatSelect]);

  useEffect(() => {
    lastDateRef.current = lastDate; // Update the ref whenever chatSelect changes
  }, [lastDate]);

  useEffect(() => {
    const getNotification = async () => {
      if (currentUser != null) {
        let res = await notificationApi.GetAllNotification(currentUser?.userId);
        setListNotification(res);
      }
    };
    getNotification();
  }, [currentUser]);

  useEffect(() => {
    const GetNumberMessage = async () => {
      if (currentUser != null) {
        let res = await chatApi.GetNumberMessage(currentUser?.userId);
        setNumberOfMessage(res);
      }
    };
    GetNumberMessage();
  }, [currentUser, haveMess]);

  useEffect(() => {
    const getNotification = async () => {
      if (currentUser != null) {
        let res = await notificationApi.NumberNotification(currentUser?.userId);
        setNumberOfNotification(res);
      }
    };
    getNotification();
  }, []);

  useEffect(() => {
    const getUserConnect = async () => {
      if (currentUser != null) {
        let res = await chatApi.GetUserConnect(currentUser?.userId);
        setUserConnection(res);
      }
    };
    getUserConnect();
  }, [currentUser, haveMess]);

  useEffect(() => {
    const getListMessages = async () => {
      if (currentUser != null && chatSelect != -1) {
        setLastDate('0');
        try {
          let res = await chatApi.GetMessageByConversation(chatSelect, '0');
          setLastDate(res?.nextCursor);
          setListMessage(res?.items?.reverse());
        } catch (err) {}
      }
    };
    getListMessages();
  }, [chatSelect]);

  const loadMoreMessages = async () => {
    console.log('chatSelectRef ', chatSelectRef);
    console.log('chatSelect ', chatSelect);
    console.log('lastDate ', lastDateRef);

    if (
      currentUser != null &&
      chatSelectRef != -1 &&
      chatSelectRef?.current == chatSelect &&
      lastDateRef != '0'
    ) {
      try {
        let res = await chatApi.GetMessageByConversation(chatSelect, lastDate);
        setLastDate(res?.nextCursor);
        res?.items.map((item) => setListMessage((msg) => [item, ...msg]));
        console.log('bbbbbb');
      } catch (err) {}
    }
  };

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
        setNumberOfMessage,
        loadMoreMessages,
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
