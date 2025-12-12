import api from "../axios";

/**
 * 게시글 상세 조회
 */
export const getPostDetail = async (postId) => {
  const response = await api.get(`/users/projects/posts/${postId}`);
  return response.data;
};

/**
 * 게시글 수정
 */
export const updatePost = async (postId, postData) => {
  const response = await api.put(`/users/projects/posts/${postId}`, postData);
  return response.data;
};

/**
 * 게시글 삭제
 */
export const deletePost = async (postId) => {
  const response = await api.delete(`/users/projects/posts/${postId}`);
  return response.data;
};

/**
 * 게시글 완료 처리
 */
export const completePost = async (postId) => {
  const response = await api.patch(`/users/projects/posts/${postId}/complete`);
  return response.data;
};