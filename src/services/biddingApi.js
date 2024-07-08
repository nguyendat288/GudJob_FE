import axios from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from '.'
import axiosClient from '../utils/axiosClient'

const biddingApi = {
    AddBidding: async (data,navigate) => {
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Bid/Bidding`, data)
            toast.success('bidding success')
            navigate(`/detail/${data?.projectId}`)
            return response
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                toast.error("Bạn đã đấu thầu dự án này rồi")
            }
            if (error.response.status === 500) {
                toast.error("Sai ở đâu đấy r")
            }
            if (error.response.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },

    AcceptBidding: async (data,navigate) => {
        try {
            const response = await axiosClient.put(`${BASE_URL}/api/Bid/AcceptBidding`, data)
            toast.success('accept success')
            navigate(`/recruiter`)
            return response
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Không tìm thấy")
            }
        }
    },

    GetBiddingListByProjectId: async (id,index,size) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Bid/GetBiddingListByProjectId?ProjectId=${id}&PageIndex=${index}&PageSize=${size}`)
            return response.data;
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    }
}

export default biddingApi
