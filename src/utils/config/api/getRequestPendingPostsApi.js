import api from './axios'

export const getRequestPendingPosts = async () =>{
    try {
        const response = await api.get('/admin/projects/approval-requests')
        console.log(response.data.response)
        return response.data.response
    } catch (error) {
        console.error('승인대기 화면 데이터 조회 실패:', error);
        throw error; 
    }
}