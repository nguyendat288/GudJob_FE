import { BASE_URL } from '../'
import axiosClient from '../../utils/axiosClient'

const userManagementApi = {
    getAllUsers: async (page, pageSize) => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Users/GetUsers`, {
                params: { PageIndex: page, PageSize: pageSize }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    lockUser: async (userIds) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Users/Lock`, userIds, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });
            return response;
        } catch (error) {
            throw error
        }
    },

    unlockUser: async (userId) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Users/Unlock`, userId, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });
            return response;
        } catch (error) {
            throw error
        }
    }
}

export default userManagementApi
