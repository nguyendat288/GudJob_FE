import { BASE_URL } from '.'
import axiosClient from '../utils/axiosClient'

const reportApi = {
    getReportCategoryByUser: async () => {
        try {
            const response = await axiosClient.get(`${BASE_URL}/api/Reports/Categories?type=user`)
            return response;
        } catch (error) {
            throw error
        }
    },

    createReport: async (reportData) => {
        const formData = new FormData();
        formData.append('ReportToUrl', reportData.ReportToUrl || '');
        formData.append('ProjectId', reportData.ProjectId || '');
        formData.append('BidId', reportData.BidId || '');
        formData.append('CreatedBy', reportData.CreatedBy || '');
        formData.append('ReportCategoryId', reportData.ReportCategoryId);
        formData.append('Description', reportData.Description);
        formData.append('ReportType', reportData.ReportType || '');
        formData.append('ReportName', reportData.ReportName || '');
        try {
            const response = await axiosClient.post(`${BASE_URL}/api/Reports/Create`, formData, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("response", response);
            return response;
        } catch (error) {
            throw error
        }
    }
}

export default reportApi
