import api from './axios'

// 유저 목록 조회
export const getUsers = async() => {
    try {
        const response = await api.get('admin/users')
        return response.data.response
    } catch (error) {
        console.log('유저 불러오기 실패')
        throw error
    }
}

// 유저 생성 - 추가!
export const createUser = async(userData, userType) => {
    try {
        // userType에 따라 다른 엔드포인트 호출
        const endpoints = {
            developer: 'admin/developers',
            customer: 'admin/customers', 
            company: 'admin/companies'
        };
        
        const response = await api.post(endpoints[userType], userData);
        return response.data.response;
    } catch (error) {
        console.error('유저 생성 실패:', error);
        throw error;
    }
}