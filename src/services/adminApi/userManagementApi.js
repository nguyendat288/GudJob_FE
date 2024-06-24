import { BASE_URL } from '../'
import axiosClient from '../../utils/axiosClient'

const userManagementApi = {
    getAllUsers: () => {
        try {
            const response = axiosClient.get(`${BASE_URL}/api/Users/GetUsers?PageIndex=1&PageSize=10`)
            console.log("response", response);
            return response;
        } catch (error) {
            throw error
        }
    },

    lockUser: () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default userManagementApi
