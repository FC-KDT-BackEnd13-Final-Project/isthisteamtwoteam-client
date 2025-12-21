import api from "../axios";

export const getProjectApprovalRequests = async (projectId) => {
  try {
    const response = await api.get(`/admin/dashboard/projects/${projectId}/approval-requests`);
    return response.data;
  } catch (error) {
    console.error('승인 요청 조회 실패:', error);
    throw error;
  }
};