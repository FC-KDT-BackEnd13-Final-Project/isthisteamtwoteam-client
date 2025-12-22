import api from "../axios"

export const getProjectMembers = async (projectId) => {
    try {
        const response = await api.get(`/admin/projects/${projectId}/members`,{
              skipRolePath: true
        });
        console.log('프로젝트 멤버:', response.data.response);
        return response.data.response    
    } catch (error) {
        console.log("프로젝트 멤버 조회 실패:", error);
        return []; 
    }
}