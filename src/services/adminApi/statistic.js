import { BASE_URL } from '../';
import axiosClient from '../../utils/axiosClient';

const Statistic = {
  CategoriesPieChartData: async () => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Statistic/CategoriesPieChartData`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  ProjectsPieChartData: async () => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Statistic/ProjectsPieChartData`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  RecruiterDashboard: async () => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Dashboard/RecruiterDashboard`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  UsersPieChartData: async () => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Statistic/UsersPieChartData`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  NewUserData: async () => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Statistic/NewUserData`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  ExportStatistic: async (isChatGpt) => {
    try {
      const response = await axiosClient.get(
        `https://app-doan.azurewebsites.net/api/Export/ExportStatistic?isChat=${isChatGpt}`,
        {
          responseType: 'blob',
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  StatisticUsers: async (pageIndex, pageSize) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Statistic/StatisticUsers?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  StatisticSkills: async (pageIndex, pageSize) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Statistic/StatisticSkills?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  StatisticProjects: async (pageIndex, pageSize) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Statistic/StatisticProjects?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default Statistic;
