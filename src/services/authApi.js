import axios from 'axios';
import { toast } from 'react-toastify';
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice';
import { BASE_URL } from '.';
import { ROLES } from '../constaints/role';
import axiosClient from '../utils/axiosClient';

const authApi = {
  loginUser: async (data, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(`${BASE_URL}/api/Identity/Login`, data);
      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.accessToken);
      toast.success('Login success');
      if (response.data.role === ROLES.ADMIN) {
        navigate('/admin');
      } else if (response.data.role === ROLES.RECRUITER) {
        navigate('/recruiter');
      } else if (response.data.role === ROLES.FREELANCER) {
        var url = localStorage.getItem('currentUrl');
        if (url) {
          window.location.href = url;
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      dispatch(loginFailed());
      throw error;
    }
  },
  register: async (data, navigate) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/Identity/Register`,
        data
      );
      navigate('/login');
      return response;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.message);
      }
      if (error.response.status === 409) {
        toast.error(error.response.message);
      }
      toast.error(error.response.data.message);
    }
  },
  sendCode: async (email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/Identity/ResetPassword?email=${encodeURIComponent(
          email
        )}`
      );
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
      const secureToken = await axios.post(
        `${BASE_URL}/api/Identity/ResetPasswordInputCode`,
        { email, code }
      );
      return secureToken.data.secureToken;
    } catch (error) {
      toast.error('Verify code is expried or not correct');
      throw error;
    }
  },
  resetNewPassword: async (
    email,
    newPassword,
    newPasswordConfirm,
    secureToken,
    navigate
  ) => {
    try {
      await axios.post(`${BASE_URL}/api/Identity/ResetNewPassword`, {
        email,
        newPassword,
        newPasswordConfirm,
        secureToken,
      });
      toast.success('Password reset successful');
    } catch (error) {
      toast.error('Change password failed');
      throw error;
    }
  },
  loginWithGoogle: async (accessToken, dispatch, navigate) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/Identity/External`,
        accessToken,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(loginSuccess(response.data));
      localStorage.setItem('token', response.data.accessToken);
      toast.success('Login successfully');

      if (response.data.role === ROLES.ADMIN) {
        navigate('/admin');
      } else if (response.data.role === ROLES.RECRUITER) {
        navigate('/recruiter');
      } else if (response.data.role === ROLES.FREELANCER) {
        navigate('/home');
      }

      return response;
    } catch (error) {
      if (error.response && error.response.status === 415) {
        toast.error('Unsupported Media Type');
      } else {
        console.error('Login with Google failed:', error);
      }
      throw error;
    }
  },
  verifyPhone: async (phoneNumber) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Identity/VerifyPhone`,
        phoneNumber,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  verifyPhoneCode: async (phoneCode) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Identity/VerifyPhoneCode`,
        phoneCode,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default authApi;
