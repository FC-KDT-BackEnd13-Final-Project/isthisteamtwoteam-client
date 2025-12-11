import api from './axios'

export const getDashboardData = async () => {
    try{
        const response = await api.get('/admin/dashboard');
        return response.data.response;

    }catch(error){
        console.error('대시보드 데이터 조회 실패:', error);
        throw error;    
    }
};

export const getDashboardAllProjects = async () => {
    try {
        const response = await api.get('/admin/dashboard/projects')
        return response.data.response
    } catch (error) {
        console.error('대시보드 데이터 조회 실패:', error);
        throw error; 
    }
}

export const getCompanies = async () => {
  const response = await api.get("/companies");
  return response.data.response;
};