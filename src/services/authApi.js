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
            navigate("/login")
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
    sendCode: async (email) => {
        try {
          const response = await axios.post(`${BASE_URL}/api/Identity/ResetPassword?email=${encodeURIComponent(email)}`);
          return response;
        } catch (error) {
          if (error.response.status === 404) {
            toast.error('User not found');
          } else {
            toast.error('Failed to reset password');
          }
          throw error;
        }
    },
    resetPassword: async (email, code) => {
        try {
            const secureToken = await axios.post(`${BASE_URL}/api/Identity/ResetPasswordInputCode`, { email, code });
            return secureToken.data.secureToken;
        } catch (error) {
            toast.error('Verify code is expried or not correct');
          throw error;
        }
      },
    resetNewPassword: async (email, newPassword, newPasswordConfirm, secureToken, navigate) => {
        try {
            await axios.post(`${BASE_URL}/api/Identity/ResetNewPassword`, { email, newPassword, newPasswordConfirm, secureToken });
            toast.success('Password reset successful');
            navigate("/login");
        } catch (error) {
            toast.error('Change password failed');
          throw error;
        }
    }
   
}

export default authApi
