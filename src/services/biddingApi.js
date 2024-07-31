import axios from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from '.'
import axiosClient from '../utils/axiosClient'

const biddingApi = {
    AddBidding: async (data, navigate) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Bid/Bidding`, data)
            toast.success('Đấu thầu thành công')
            navigate(`/detail/${data?.projectId}`)
            return response
        } catch (error) {
            if (error.response.status === 400) {
                toast.error("Bạn đã đấu thầu dự án này rồi")
            }
            if (error.response.status === 500) {
                toast.error("Đấu thầu thất bại")
            }
        }
    },
    UpdateBidding: async (data) => {
        try {
             await axiosClient.put(`${BASE_URL}/api/Bid/UpdateBidding`, data)
            toast.success('Chỉnh sửa thành công')
        } catch (error) {
            console.log(error);
            if (error.response.status === 500) {
                toast.error("Chỉnh sửa đấu thầu thất bại")
            }
            if (error.response.status === 400) {
                toast.error("Chỉnh sửa đấu thầu thất bại")
            }
        }
    },

    AcceptBidding: async (bidid, navigate) => {
        try {
            const response = await axiosClient.put(`${BASE_URL}/api/Projects/AcceptBid?bidid=${bidid}`)
            navigate(`/recruiter`)
            return response
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Không tìm thấy")
            }
        }
    },
    GetBidByProjectLoggedUser: async (projectId) => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Bid/GetBidByProjectLoggedUser?projectId=${projectId}`)
            return response?.data;
        } catch (error) {
            throw error
        }
    },

    GetBiddingListByProjectId: async (id, index, size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Bid/GetBiddingListByProjectId?ProjectId=${id}&PageIndex=${index}&PageSize=${size}`)
            return response.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Server có vấn đề  ")
            }
        }
    }
}

export default biddingApi
