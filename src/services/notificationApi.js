import axios from 'axios';
import { BASE_URL } from '.';
import { toast } from 'react-toastify';

const notificationApi = {
    GetAllNotification: async  (userId)  => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Notification/GetNotificationByUserId/${userId}`)
            return response?.data;
        } catch (error) {
            throw error
        }
    },
    NumberNotification: async  (userId)  => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Notification/numberNotification/${userId}`)
            return response?.data;
        } catch (error) {
            throw error
        }
    },
    MarkToRead: async (notificationId) => {
        try {
            await axios.put(`${BASE_URL}/api/Notification/update/${notificationId}`)
        } catch (error) {
                toast.error('Some thing wrong')
        }
    },
    DeleteNotification: async (notificationId) => {
        try {
            let res = await axios.delete(`${BASE_URL}/api/Notification/delete/${notificationId}`)
             return res?.data;
        } catch (error) {
            toast.error('Some thing wrong')
        }
    },
    MarkToReadAll: async (userId) => {
        try {
             await axios.put(`${BASE_URL}/api/Notification/markToReadAll/${userId}`)
        } catch (error) {
            toast.error('Some thing wrong')

        }
    },
    DeleteAllNotification: async (userId) => {
        try {
             await axios.delete(`${BASE_URL}/api/Notification/deleteAll/${userId}`)
        } catch (error) {
            toast.error('Some thing wrong')
        }
    },
}

export default notificationApi
