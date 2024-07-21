import axios from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from '.'
import axiosClient from '../utils/axiosClient'

const projectApi = {
    AddProject: async (data, navigate) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Projects/AddProject`, data)
            toast.success('Tạo dự án thành công')
            navigate("/recruiter")
            return response
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Thông tin điền không hợp lệ")
            }
        }
    },
    UpdateProject: async (data, navigate) => {
        try {
            const response = await axiosClient.put(`${BASE_URL}/api/Projects/UpdateProject`, data)
            toast.success('Chỉnh sửa thành công')
            navigate("/detail/" + data?.id)
            return response
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Not null")
            }
            if (error.response.status === 404) {
                toast.error("Not found")
            }
        }
    },
    DeleteProject: async (projectId, navigate) => {
        try {
            await axiosClient.delete(`${BASE_URL}/api/Projects/DeleteProject?projectId=${projectId}`)
            toast.success('Xoá dự án thành công')
            navigate("/recruiter");
        } catch (error) {
            console.log("error", error);
            if (error.response.status === 400) {
                toast.error("Not null")
            }
            if (error.response.status === 404) {
                toast.error("Not found")
            }
        }
    },
    GetProjectDetailsById: async (id,navigate) => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Projects/GetProjectDetailsById?id=${id}`)
            return response;
        } catch (error) {
            navigate("/*")
        }
    },
    GetAllProject: async (index, size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/GetAll?pageIndex=${index}&pageSize=${size}`)
            return response?.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
    GetAllProjectByUserId: async (id, index, size) => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Projects/GetProjectsByUserId?UserId=${id}&PageIndex=${index}&PageSize=${size}`)
            return response;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
    SearchHomePage: async (params,listSkillSelected) => {
        try {
            const searchParams = new URLSearchParams();
              for (const key in params) {
                if (params[key] !== null && params[key] !== undefined) {
                    searchParams.append(key, params[key]);
                }
            }
            if (listSkillSelected.length > 0) {
                listSkillSelected.forEach(value => searchParams.append('Skill', value));
            }
            const response = await axios.get(`${BASE_URL}/api/Projects/SearchHomePage`,{params : searchParams})
            return response?.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
    changeProjectStatus: async (data) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Projects/UpdateStatus?statusId=2&projectId=${data.projectId}`)
            return response;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something wrong ")
            }
            throw error;
        }
    },
}

export default projectApi
