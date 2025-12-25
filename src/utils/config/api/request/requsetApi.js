import api from "../axios";

export const getProjectApprovalRequests = async (projectId) => {
  try {
    const response = await api.get(`/admin/projects/${projectId}/approval-requests`);
    return response.data.response;
  } catch (error) {
    console.error('프로젝트 승인 요청 조회 실패:', error);
    throw error;
  }
};