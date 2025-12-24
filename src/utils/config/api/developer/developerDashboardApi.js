// src/utils/config/developer/developerDashboardApi.js

import api from "../axios";

export const getDeveloperDashboardData = async () => {
    try{
        const response = await api.get('/customer/dashboard');
        return response.data.response;
    }catch(error){
        console.error('대시보드 데이터 조회 실패:', error);
        throw error;    
    }
};

export const getDeveloperDashboardAllProjects = async () => {
    try {
        const response = await api.get('/customer/dashboard/projects')
        return response.data.response
    } catch (error) {
        console.error('대시보드 데이터 조회 실패:', error);
        throw error; 
    }
}