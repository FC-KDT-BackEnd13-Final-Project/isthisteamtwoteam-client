import api from "../axios"

export const getChecklists = async (page, size) =>{
    try {
        const response = await api.get(`/admin/checklists?page=${page}&size=${size}`)
        return response.data.response    
    } catch (error) {
        console.log('체크리스트 조회 실패 : ', error)
        throw error
    }
    

}

export const updateChecklist = async (checklistId, content) =>{
    try {
        
        const response = await api.patch(`/admin/checklists/${checklistId}`,{content: content});
        return response.data.response
    } catch (error) {
        console.error('체크리스트 수정 실패:', error);        
    }

}


export const createChecklist = async(content) => {
 
    try {
        const response = await api.post('/admin/checklists',{
            content:content
        })
        return response.data.response
    } catch (error) {
        console.log("체크리스트 저장에 실패했습니다.")
        throw error
    }
    
}

export const deleteChecklist = async(checklistId)=>{
    try {
        const response = await api.delete(`/admin/checklists/${checklistId}`)
        return response.data.response
    } catch (error) {
        console.log("체크리스 삭제를 실패하였습니다.")
        throw error
    }
}

export const getProjectChecklist = async (projectId)=>{
    try {
        const response = await api.get(`http://localhost:8080/api/v1/admin/projects/${projectId}/checklists`);
        console.log('체크리스트 조회 메서드 실행 : ', response.data)
        return response.data;
        
    } catch (error) {
        console.log('체크리스트 조회 실패')
        throw error;
    }
}