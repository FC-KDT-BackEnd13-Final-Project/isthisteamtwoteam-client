import api from "../axios";

/**
 * 게시글 상세 조회
 */
export const getPostDetail = async (postId) => {
  const response = await api.get(`/users/projects/posts/${postId}`);
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

// postApi.js 파일에 추가

/**
 * 게시글 수정
 * @param {number} projectId - 프로젝트 ID
 * @param {number} postId - 게시글 ID
 * @param {Object} data - 수정할 데이터
 * @returns {Promise}
 */
export const updatePost = async (projectId, postId, data) => {
  try {
    const response = await api.patch(
      `/users/projects/posts/${postId}`,
      data
    );
        console.log('게시글 업데이트 결과' , response.response)

    return response.data;
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
};

