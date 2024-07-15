import { BASE_URL } from '../'
import axiosClient from '../../utils/axiosClient'

const Statistic = {
    CategoriesPieChartData: async () => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Statistic/CategoriesPieChartData`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    ProjectsPieChartData: async () => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Statistic/ProjectsPieChartData`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    UsersPieChartData: async () => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Statistic/UsersPieChartData`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    NewUserData: async () => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Statistic/NewUserData`);
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default Statistic
