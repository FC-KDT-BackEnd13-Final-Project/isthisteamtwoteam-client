import api from "../axios";

export const getProjectApprovalRequests = async (projectId) => {
  try {
    const response = await api.get(`/admin/dashboard/projects/${projectId}/approval-requests`,{
           skipRolePath: true   

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

export const rejectPost = async (postId, requestBody) => {
  const response = await api.patch(`/users/projects/posts/${postId}/reject`, requestBody);
  console.log('거절 응답:', response.data);
  return response.data;
};