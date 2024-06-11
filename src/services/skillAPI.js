import axios from 'axios'
import { BASE_URL } from '.'

const skillApi = {
    GetAllSkill: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/Skill/GetAll`);
            return response?.data
        } catch (error) {
            throw error;
        }
    }
}

export default skillApi
