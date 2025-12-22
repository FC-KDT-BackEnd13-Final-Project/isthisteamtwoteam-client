// utils/api/post/postApi.js 에 추가

import api from "../axios";

/**
 * 댓글 작성
 * @param {number} postId - 게시글 ID
 * @param {Object} data - 댓글 데이터
 * @returns {Promise}
 */
export const createComment = async (postId, data) => {
  try {
    const response = await api.post(
      `/users/projects/posts/${postId}/comment`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('댓글 작성 실패:', error);
    throw error;
  }
};


/**
 * 댓글 목록 조회
 * @param {number} postId - 게시글 ID
 * @returns {Promise}
 */
export const getComments = async (postId) => {
  try {
    const response = await api.get(
      `/users/projects/posts/${postId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error);
    throw error;
  }
};

export const updateComment = async (commentId, request) => {
  try {
    const response = await api.patch(`/users/projects/posts/comment/${commentId}`, request);
    return response.data;
  } catch (error) {
    console.error('댓글 수정 실패:', error);
    throw error;
  }
};