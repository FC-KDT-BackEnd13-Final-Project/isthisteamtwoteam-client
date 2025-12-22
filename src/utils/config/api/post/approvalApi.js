import api from "../axios";

export const getProjectApprovalRequests = async (projectId) => {
  try {
    const response = await api.get(`/admin/dashboard/projects/${projectId}/approval-requests`,{
           skipRolePath: true   // ⭐ 경로 변환 무시

    });
    return response.data;
  } catch (error) {
    console.error('승인 요청 조회 실패:', error);
    throw error;
  }
};


export const approvePost = async (postId) => {
  const response = await api.patch(`/users/projects/posts/${postId}/approval`);
  console.log('승인/거절 응답:', response.data);
  return response.data;
};