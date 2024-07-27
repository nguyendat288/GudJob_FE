import { BASE_URL } from '.';
import axiosClient from '../utils/axiosClient';

const paymentApi = {
  createPayment: async (data) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Payment/Create`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentApi;
