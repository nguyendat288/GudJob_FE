import axios from 'axios'
import { toast } from 'react-toastify'
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice'
import { BASE_URL } from '.'

const authApi = {
    loginUser: async (data, dispatch, navigate) => {
        dispatch(loginStart())
        try {
            const response = await axios.post(`${BASE_URL}/api/Identity/Login`, data)
                dispatch(loginSuccess(response.data))
                localStorage.setItem('token', response.data.accessToken)
                toast.success("Login success");
                navigate('/home')
            return response?.data?.id;
        } catch (error) {
            if (error.response.status === 400) {
                toast.error('Password wrong, please try again!')
                dispatch(loginFailed())
            }
        }
    },
    register: async (data, navigate) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/Identity/Register`, data)
            toast.success('register success')
            navigate("/login")
            return response
        } catch (error) {
            // if (error.response.status === 400) {
            //   toast.error('Something wrong')
            // }
            if (error.response.data.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.data.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
    GetAllCategory: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Categories/GetAll`)
            return response?.data
        } catch (error) {
            if (error.response.data.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.data.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
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
    AddBidding: async (data,navigate) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/Bid/Bidding`, data)
            toast.success('bidding success')
            navigate(`/detail/${data?.projectId}`)
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
    GetBiddingListByProjectId: async (id,index,size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Bid/GetBiddingListByProjectId?ProjectId=${id}&PageIndex=${index}&PageSize=${size}`)
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

}

export default authApi
