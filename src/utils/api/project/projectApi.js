import api from "../axios"

export const getProjects = async (page = 0, size = 10) =>{
    try {
        const response = await api.get('/admin/projects')
        return response.data.response    
    } catch (error) {
        console.log('체크리스트 조회 실패 : ', error)
        throw error
    }
    

}