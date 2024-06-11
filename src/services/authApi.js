import axios from 'axios'
import { toast } from 'react-toastify'
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice'
import { BASE_URL } from '.'
import { ROLES } from '../constaints/role'

const authApi = {
    loginUser: async (data, dispatch, navigate) => {
        dispatch(loginStart())
        try {
            const response = await axios.post(`${BASE_URL}/api/Identity/Login`, data)
            dispatch(loginSuccess(response.data))
            localStorage.setItem('token', response.data.accessToken)
            toast.success("Login success");
            console.log(response.data);
            if (response.data.role === ROLES.ADMIN) {
                navigate('/admin')
            } else if (response.data.role === ROLES.RECRUITER) {
                navigate('/recruiter')
            } else if (response.data.role === ROLES.FREELANCER) {
                navigate('/home')
            }
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
            if (error.response.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },

}

export default authApi
