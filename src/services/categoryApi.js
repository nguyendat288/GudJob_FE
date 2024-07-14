import axios from 'axios'
import axiosClient from '../utils/axiosClient'
import { toast } from 'react-toastify'
import { BASE_URL } from '.'

const categoryApi = {
    GetAllCategory: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Categories/GetAll`)
            return response?.data
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
    GetAllCategoryWithPagination: async ({page, pageSize}) => {
        try {
            const params = {
                pageIndex: page,
                pageSize: pageSize
            };

            const response = await axiosClient.get(`${BASE_URL}/api/Categories/GetByStatus`, { params })
            return response;
        } catch (error) {
            throw error
        }
    },
    GetByCategoryId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Skill/GetByCategoryId?CategoryId=${id}`)
            return response?.data
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
    AddCategory: async (params) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Categories/AddCategory`, params)
            return response
        } catch (error) {
            throw error
        }
    },
    UpdateCategory: async (params) => {
        try {
            const response = await axiosClient.put(`${BASE_URL}/api/Categories/UpdateCategory`, params)
            return response
        } catch (error) {
            throw error
        }
    },
    DeleteCategory: async (id) => {
        try {
            const response = await axiosClient.delete(`${BASE_URL}/api/Categories/DeleteCategory?categoryId=${id}`)
            return response
        } catch (error) {
            throw error
        }
    },
    RestoreDeleted: async (id) => {
        try {
            const response = await axiosClient.put(`${BASE_URL}/api/Categories/RestoreDeleted?id=${id}`)
            return response
        } catch (error) {
            throw error
        }
    }
}

export default categoryApi
