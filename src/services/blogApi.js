import { toast } from 'react-toastify';
import { BASE_URL } from '.'
import axiosClient from '../utils/axiosClient'

const blogApi = {
    GetAllBlog:async (PageIndex,PageSize) => {
        try {
            const response =await axiosClient.get(`${BASE_URL}/api/Blogs/GetAll?PageIndex=${PageIndex}&PageSize=${PageSize}`)
            return response;
        } catch (error) {

            throw error
        }
    },
    CreateBlog: async (data) => {
        try {
            const response =await axiosClient.post(`${BASE_URL}/api/Blogs/Create`,data)
            toast.success("Tạo bài viết thành công")
            return response;
        } catch (error) {
            toast.error("Sai đâu đó rồi ")
            throw error
        }
    },
    UpdateBlog: async (data) => {
        try {
            const response =await axiosClient.put(`${BASE_URL}/api/Blogs/Update`,data)
            toast.success("Sửa bài viết thành công")

            return response;
        } catch (error) {
            toast.error("Sai đâu đó rồi ")

            throw error
        }
    },
    DeleteBlog: async (id) => {
        try {
            const response =await axiosClient.delete(`${BASE_URL}/api/Blogs/Delete?id=${id}`)
            toast.success("Xoá bài viết thành công")

            return response;
        } catch (error) {
            toast.error("Sai đâu đó rồi ")

            throw error
        }
    },
  
}

export default blogApi
