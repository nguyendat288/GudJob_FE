import axios from 'axios';
import { BASE_URL } from '.';
import axiosClient from '../utils/axiosClient';

const chatApi = {
  GetMessageByConversation: async (conversationId, cursor) => {
    if (cursor === '0') {
      try {
        const response = await axiosClient.get(
          `${BASE_URL}/api/Chat/messages/${conversationId}?limit=15`
        );
        return response;
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const response = await axiosClient.get(
          `${BASE_URL}/api/Chat/messages/${conversationId}?cursor=${cursor}&limit=10`
        );
        return response;
      } catch (error) {
        throw error;
      }
    }
  },
  CreateNewConversation: async (user1, user2) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Chat/AddConversation/${user1}/${user2}`
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
  GetInfo: async (userId) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Chat/Info/${userId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  SendMessage: async (data) => {
    try {
      await axios.post(`${BASE_URL}/api/Chat/SendMessage`, data);
    } catch (error) {
      throw error;
    }
  },
  markToRead: async (conversationId) => {
    try {
      await axios.put(`${BASE_URL}/api/Chat/markToRead/${conversationId}`);
    } catch (error) {
      throw error;
    }
  },

  GetUserConnect: async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Chat/GetUserConnect/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  GetNumberMessage: async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Chat/GetNumberMessage/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default chatApi;
