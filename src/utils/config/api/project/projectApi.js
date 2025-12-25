import { ConstructionIcon } from "lucide-react"
import api from "../axios"

export const getProjects = async (page = 0, size = 10) =>{
    try {
        const response = await api.get('/admin/projects')
        console.log("프로젝트 조회" , response.data.response.content)
        return response.data.response.content    
    } catch (error) {
        console.log('프로젝트 조회 실패 : ', error)
        throw error
    }
}

export const getCustomerProjects = async (page = 0, size = 10) =>{
    try {
        const response = await api.get('/customers/projects/page')
        console.log("프로젝트 조회" , response.data.response.content)
        return response.data.response.content    
    } catch (error) {
        console.log('프로젝트 조회 실패 : ', error)
        throw error
    }
}

export const getProjectDetail = async (projectId) => {
    try {
        const response = await api.get(`/admin/projects/${projectId}`,{
          skipRolePath: true  
        });
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

export const createProject = async (projectData, imageFile) => {
    console.log("프로젝트 생성 요청 시작", projectData);
    console.log("이미지 파일:", imageFile);
    
    try {
        const formData = new FormData();
        
        // ✅ JSON 데이터를 'request' 키로 Blob 형태로 추가 (서버가 기대하는 이름)
        const jsonData = {
            projectName: projectData.projectName,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            stage: projectData.stage,
            memo: projectData.memo || '',
            members: projectData.members,
            selectedChecklistIds: projectData.selectedChecklistIds,
            companyId: projectData.companyId || null
        };
        
        formData.append(
            'request',  // ✅ 'data'에서 'request'로 변경
            new Blob([JSON.stringify(jsonData)], { type: 'application/json' })
        );
        
        // ✅ 이미지 파일을 'image' 파트로 추가 (선택사항)
        if (imageFile) {
            formData.append('image', imageFile);
        }

        // 디버깅: FormData 내용 확인
        console.log('=== FormData 전송 내용 ===');
        for (let [key, value] of formData.entries()) {
            if (value instanceof Blob) {
                console.log(key, '(Blob)');
            } else if (value instanceof File) {
                console.log(key, '(File):', value.name);
            } else {
                console.log(key, value);
            }
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


// 프로젝트 복원
export const restoreProjects = async (projectIds) => {
  try {
    const response = await api.patch('/admin/projects/trash/restore', {
      project_ids: projectIds
    });
    return response.data;
  } catch (error) {
    console.error('프로젝트 복원 실패:', error);
    throw error;
  }
};



// 프로젝트 영구 삭제
export const permanentDeleteProjects = async (projectIds) => {
  try {
    console.log("삭제하려는 프로젝트 id 들 , " , projectIds)
    const response = await api.delete('/admin/projects/trash', {
      data: {
        project_ids: projectIds
      }
    });
    return response.data;
  } catch (error) {
    console.error('프로젝트 영구 삭제 실패:', error);
    throw error;
  }
};