import axios from 'axios'
import { toast } from 'react-toastify'
import { loginFailed, loginStart, loginSuccess } from '../redux/authSlice'
import { BASE_URL } from '.'

const biddingApi = {
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
    }
}

export default biddingApi
