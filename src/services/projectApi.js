import axios from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from '.'
import axiosClient from '../utils/axiosClient'

const projectApi = {
    AddProject: async (data, navigate) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Projects/AddProject`, data)
            toast.success('create success')
            navigate("/recruiter")
            return response
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something was wrong")
            }
            if (error.response.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
    UpdateProject: async (data, navigate) => {
        try {
            const response = await axiosClient.put(`${BASE_URL}/api/Projects/UpdateProject`, data)
            toast.success('update success')
            navigate("/recruiter")
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
            const response = await axiosClient.delete(`${BASE_URL}/api/Projects/DeleteProject?projectId=${projectId}`)
            toast.success('delete success')
            navigate("/recruiter")
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
    GetProjectDetailsById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/GetProjectDetailsById?id=${id}`)
            return response?.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Some thing was wrong ")
            }
            if (error.response.status === 501) {
                toast.error("Some thing was wrong")
            }
        }
    },
    GetAllProject: async (index,size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/GetAll?pageIndex=${index}&pageSize=${size}`)
            return response?.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
    GetAllProjectByUserId: async (id, index,size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/GetProjectsByUserId?UserId=${id}&PageIndex=${index}&PageSize=${size}`)
            return response?.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
    SearchProjectByName: async (Keyword, index,size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/Search?Keyword=${Keyword}&PageIndex=${index}&PageSize=${size}`)
            return response?.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
    filterProject: async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/Projects/Filter`,data)
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
