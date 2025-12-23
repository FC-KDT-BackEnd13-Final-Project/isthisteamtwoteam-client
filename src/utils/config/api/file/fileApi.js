import api from "../axios.js";

/**
 * 임시 파일 업로드
 * @param {File} file - 업로드할 파일
 * @param {number} projectId 
 * @returns {Promise} - 업로드된 파일 정보
 */
export const uploadTempFile = async (file, projectId) => {
  try {
    const formData = new FormData();
    formData.append('files', file);

    const response = await api.post(
      `/users/projects/${projectId}/posts/files/temp`, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('임시 파일 업로드 실패:', error);
    throw error;
  }
};

/**
 * 임시 파일 삭제
 * @param {number} projectId - 프로젝트 ID
 * @param {Array<string>} fileIds - 삭제할 파일 ID 배열
 * @returns {Promise}
 */
export const deleteTempFile = async (projectId, fileIds) => {
  try {
    const response = await api.delete(
      `/users/projects/${projectId}/files/temp`,
      {
        data: {
          fileIds: fileIds
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('임시 파일 삭제 실패:', error);
    throw error;
  }
};


export const deleteTempFiles = async (projectId, fileIds) => {
  try {
    const response = await api.delete(`/users/projects/${projectId}/files/temp`, {
      data: { fileIds }
    });
    return response.data;
  } catch (error) {
    console.error('임시 파일 삭제 실패:', error);
    throw error;
  }
};

export const attachFilesToChecklist = async (projectId, checklistId, fileIds, linkUrls) => {
  try {
    console.log('체크리스트 파일 첨부 호출:', { projectId, checklistId, fileIds, linkUrls });
    const response = await api.post(
      `/customer/checklists/${projectId}/${checklistId}/file`,
      {
        fileIds: fileIds,
        linkUrls: linkUrls
      }
    );
    return response.data;
  } catch (error) {
    console.error('체크리스트 파일 첨부 실패:', error);
    throw error;
  }
};