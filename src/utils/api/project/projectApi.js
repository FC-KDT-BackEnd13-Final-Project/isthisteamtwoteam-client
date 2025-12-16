import api from "../axios"

export const getProjects = async (page = 0, size = 10) =>{
    try {
        const response = await api.get('/admin/projects')
        return response.data.response    
    } catch (error) {
        console.log('프로젝트 조회 실패 : ', error)
        throw error
    }
}

export const getProjectDetail = async (projectId) => {
    try {
        const response = await api.get(`/admin/projects/${projectId}`);
        return response.data.response;
    } catch (error) {
        console.error('프로젝트 조회 실패:', error);
        throw error;
    }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/admin/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 삭제 실패:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
    try {
        const {
            projectName,
            startDate,
            endDate,
            stage,
            memo,
            members,
            selectedChecklistIds,
            companyId,
            projectImage
        } = projectData;

        const formData = new FormData();
        
        // JSON 데이터를 Blob으로 변환하여 'data' 파트로 추가
        const jsonData = {
            projectName,
            startDate,
            endDate,
            stage,
            memo: memo || '',
            members,
            selectedChecklistIds,
            companyId: companyId || null
        };
        
        formData.append('data', new Blob([JSON.stringify(jsonData)], {
            type: 'application/json'
        }));
        
        // 이미지 파일을 'image' 파트로 추가
        if (projectImage) {
            formData.append('image', projectImage);
        }

        const response = await api.post('/admin/projects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('프로젝트 생성 실패:', error);
        throw error;
    }
};

// 👇 프로젝트 수정 API 추가
export const updateProject = async (projectId, projectData) => {
    try {
        const {
            projectName,
            startDate,
            endDate,
            stage,
            memo,
            members,
            selectedChecklistIds,
            companyId,
            projectImage
        } = projectData;

        const formData = new FormData();
        
        // JSON 데이터를 Blob으로 변환하여 'data' 파트로 추가
        const jsonData = {
            projectName,
            startDate,
            endDate,
            stage,
            memo: memo || '',
            members,
            selectedChecklistIds,
            companyId: companyId || null
        };
        
        formData.append('data', new Blob([JSON.stringify(jsonData)], {
            type: 'application/json'
        }));
        
        // 이미지 파일을 'image' 파트로 추가 (새 이미지가 있을 때만)
        if (projectImage instanceof File) {
            formData.append('image', projectImage);
        }

        const response = await api.put(`/admin/projects/${projectId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('프로젝트 수정 실패:', error);
        throw error;
    }
};

// 👇 프로젝트 참여자 조회 API 추가
export const getProjectUsers = async (projectId, role) => {
    try {
        const response = await api.get(`/admin/projects/${projectId}/users?role=${role}`);
        return response.data.response;
    } catch (error) {
        console.error('프로젝트 참여자 조회 실패:', error);
        throw error;
    }
};

export const createChecklist = async (content) => {
    try {
        const response = await api.post('/admin/checklists', { content });
        return response.data;
    } catch (error) {
        console.error('체크리스트 생성 실패:', error);
        throw error;
    }
};

/**
 * 삭제된 프로젝트 목록 조회
 */
export const getDeletedProjects = async () => {
  try {
    const response = await api.get('/admin/projects', {
      params: {
        isDeleted: true  // 삭제된 프로젝트만 조회
      }
    });
    return response.data;
  } catch (error) {
    console.error('삭제된 프로젝트 조회 실패:', error);
    throw error;
  }
};