import api from "../axios"

export const getChecklists = async (page = 0, size = 10) =>{
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


export const createChecklist = async() => {
 
    try {
        const response = await api.post('/admin/checklists')
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