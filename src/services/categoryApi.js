import axios from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from '.'

const categoryApi = {
    GetAllCategory: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Categories/GetAll`)
            return response?.data
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Phone or Email not match format ")
            }
            if (error.response.status === 501) {
                toast.error("Username or Phone or Email exist")
            }
        }
    },
    GetByCategoryId: async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Skill/GetByCategoryId?CategoryId=${id}`)
            return response?.data
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

export default categoryApi
