import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '.';
import axiosClient from '../utils/axiosClient';

const projectApi = {
  AddProject: async (data, navigate) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Projects/AddProject`,
        data
      );
      toast.success('Tạo dự án thành công');
      navigate('/recruiter');
      return response;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Thông tin điền không hợp lệ');
      }
    }
  },
  UpdateProject: async (data, navigate) => {
    try {
      const response = await axiosClient.put(
        `${BASE_URL}/api/Projects/UpdateProject`,
        data
      );
      toast.success('Chỉnh sửa thành công');
      navigate('/detail/' + data?.id);
      return response;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Not null');
      }
      if (error.response.status === 404) {
        toast.error('Not found');
      }
    }
  },
  DeleteProject: async (projectId, navigate) => {
    try {
      await axiosClient.delete(
        `${BASE_URL}/api/Projects/DeleteProject?projectId=${projectId}`
      );
      toast.success('Xoá dự án thành công');
      navigate('/recruiter');
    } catch (error) {
      console.log('error', error);
      if (error.response.status === 400) {
        toast.error('Not null');
      }
      if (error.response.status === 404) {
        toast.error('Not found');
      }
    }
  },
  GetProjectDetailsById: async (id, navigate) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Projects/GetProjectDetailsById?id=${id}`
      );
      return response;
    } catch (error) {
      navigate('/*');
    }
  },
  GetAllProject: async (index, size) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Projects/GetAll?pageIndex=${index}&pageSize=${size}`
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
    }
  },
  GetAllProjectPending: async (index, size) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Projects/Gets?statusId=1&pageIndex=${index}&pageSize=${size}`
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
    }
  },
  GetAllProjectByUserId: async (id, statusId, index, size) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Projects/GetProjectsByUserId?UserId=${id}&StatusId=${statusId}&PageIndex=${index}&PageSize=${size}`
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
    }
  },
  SearchHomePage: async (params, listSkillSelected, userId) => {
    try {
      const searchParams = new URLSearchParams();
      for (const key in params) {
        if (params[key] !== null && params[key] !== undefined) {
          searchParams.append(key, params[key]);
        }
      }
      if (listSkillSelected.length > 0) {
        listSkillSelected.forEach((value) =>
          searchParams.append('Skills', value)
        );
      }
      let response;
      if (userId) {
        response = await axiosClient.get(
          `${BASE_URL}/api/Projects/SearchHomePage?userId=${userId}`,
          { params: searchParams }
        );
        return response;
      } else {
        response = await axios.get(`${BASE_URL}/api/Projects/SearchHomePage`, {
          params: searchParams,
        });
        return response?.data;
      }
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
    }
  },
  SearchRecruiter: async (params) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Projects/SearchRecruiter`,
        { params }
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
    }
  },
  ApproveProject: async (data) => {
    try {
      let params = {
        statusId: 2,
        projectId: data.projectId,
      };
      const response = await axiosClient.put(
        `${BASE_URL}/api/Projects/UpdateStatus`,
        params
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
      throw error;
    }
  },
  RejectProject: async (data) => {
    try {
      let params = {
        statusId: 5,
        projectId: data.projectId,
        rejectReason: data.rejectReason,
      };
      const response = await axiosClient.put(
        `${BASE_URL}/api/Projects/UpdateStatus`,
        params
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
      throw error;
    }
  },
  MarkDoneProject: async (data) => {
    try {
      let params = {
        statusId: data.statusId,
        projectId: data.projectId,
        bidId: data.bidId,
      };
      const response = await axiosClient.put(
        `${BASE_URL}/api/Projects/UpdateStatus`,
        params
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
      throw error;
    }
  },
  GetFavoriteProjects: async (userId, pageIndex = 1, pageSize = 5) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/api/Projects/Favorite`,
        {
          params: { UserId: userId, PageIndex: pageIndex, PageSize: pageSize },
        }
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch favorite projects:', error);
      throw error;
    }
  },
  AddFavorite: async (data) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Projects/AddFavorite`,
        data
      );
      return response;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error('Something wrong ');
      }
      throw error;
    }
  },
  DeleteFavorite: async (data) => {
    try {
      const response = await axiosClient.delete(
        `${BASE_URL}/api/Projects/DeleteFavorite`,
        { data }
      );
      return response;
    } catch (error) {
      console.error('Failed to delete favorite project:', error);
      throw error;
    }
  },
  MakeDoneProject: async (data) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Projects/MakeDoneProject`,
        data
      );
      return response;
    } catch (error) {
      console.error('Failed to make done project:', error);
      throw error;
    }
  },
};

export default projectApi;
