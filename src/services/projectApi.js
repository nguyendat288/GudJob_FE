import axios from 'axios'
import { toast } from 'react-toastify'
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice'
import { BASE_URL } from '.'

const projectApi = {
    AddProject: async (data, navigate) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/Projects/AddProject`, data)
            toast.success('create success')
            navigate("/home")
            return response
        } catch (error) {
            if (error.response.data.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.data.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
    GetProjectDetailsById: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/GetProjectDetailsById?id=${id}`)
            return response.data;
            
        } catch (error) {
            if (error.response.data.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.data.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
    GetAllProject: async (index,size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/GetAll?pageIndex=${index}&pageSize=${size}`)
            return response.data;
        } catch (error) {
            if (error.response.data.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
    GetAllProjectByUserId: async (id, index,size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Projects/GetProjectsByUserId?UserId=${id}&PageIndex=${index}&PageSize=${size}`)
            return response.data;
        } catch (error) {
            if (error.response.data.status === 500) {
                toast.error("Something wrong ")
            }
        }
    },
}

export default projectApi
