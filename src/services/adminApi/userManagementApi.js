import { BASE_URL } from '../'
import axiosClient from '../../utils/axiosClient'

const userManagementApi = {
    getAllUsers: () => {
        try {
            const response = axiosClient.get(`${BASE_URL}/api/Users/GetUsers?PageIndex=1&PageSize=10`)
            return response;
        } catch (error) {
            throw error
        }
    },

    lockUser: async (userId) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Users/Lock`, userId, {
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
