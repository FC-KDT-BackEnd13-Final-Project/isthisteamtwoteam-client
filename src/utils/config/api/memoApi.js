import api from "./axios";

// 개인 메모 수정
export const updateUserMemo = async (projectId, content) => {
  try {
    const response = await api.patch(
      `/users/projects/${projectId}/user/memos`,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('개인 메모 수정 실패:', error);
    throw error;
  }
};

// 공용 메모 수정
export const updateProjectMemo = async (projectId, content) => {
  try {
    const response = await api.patch(
      `/users/projects/${projectId}/main/memos`,
      { content },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('공용 메모 수정 실패:', error);
    throw error;
  }
};