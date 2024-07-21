import axios from 'axios';
import { BASE_URL } from '.';
import axiosClient from '../utils/axiosClient';

const skillApi = {
  GetAllSkill: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/Skill/GetAll`);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
  AddSkill: async (data) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Skill/AddSkill`,
        data
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
  GetSkillPagination: async ({ page, pageSize, SkillName, CategoryId }) => {
    try {
      const params = {
        PageIndex: page,
        PageSize: pageSize,
        ...(SkillName && { SkillName }),
        ...(CategoryId && { CategoryId }),
      };
      console.log('params', params);
      const response = await axiosClient.get(`${BASE_URL}/api/Skill/Gets`, {
        params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  UpdateSkill: async (data) => {
    try {
      console.log('data', data);
      const response = await axiosClient.put(
        `${BASE_URL}/api/Skill/Update`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  DeleteSkill: async (id) => {
    try {
      const response = await axiosClient.delete(
        `${BASE_URL}/api/Skill/Delete`,
        {
          data: id,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default skillApi;
