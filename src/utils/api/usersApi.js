
// 유저 목록 조회
export const getUsers = async() => {
    try {
        const response = await api.get('/admin/users')
        return response.data.response
    } catch (error) {
        console.log('유저 불러오기 실패')
        throw error
    }
}

// 유저 생성 - 추가!
// export const createUser = async(userData, userType) => {
//     try {
        
        
//         const response = await api.post('/admin/user', userData);
//         return response.data.response;
//     } catch (error) {
//         console.error('유저 생성 실패:', error);
//         throw error;
//     }
// }
export const createUser = async (userData, userType) => {

  console.log('=== API 요청 정보 ===');
  console.log('유저 타입:', userType);
  console.log('전송 데이터:', userData);

  const response = await api.post('/admin/user', userData);
  return response.data;
};

export const createNewMember = async(formData) => {
    try {
        const response = await api.post('/admin/user', formData);
        return response.data;
    } catch (error) {
        console.error('회원 생성 실패:', error);
        throw error;
    }
}


// export const updateUser = async(userId, userData, userType) => {
//     try {
//         const endpoints = {
//             developer: `admin/developers/${userId}`,
//             customer: `admin/customers/${userId}`,
//             company: `admin/companies/${userId}`
//         };
        
//         const response = await api.put(endpoints[userType], userData);
//         return response.data;
//     } catch (error) {
//         console.error('유저 수정 실패:', error);
//         throw error;
//     }
// }

export const getUserDetail = async(userId) => {
    try {
        const response = await api.get(`admin/user/${userId}`);
        return response.data.response;
    } catch (error) {
        console.error('유저 상세 조회 실패:', error);
        throw error;
    }
}

export const updateUser = async (userId, userData, userType) => {


  // 수정 시 불필요한 필드 제거 및 필드명 정리
  const cleanData = { ...userData };
  
  // 불필요한 필드 제거
  delete cleanData.id;
  delete cleanData.userId;
  delete cleanData.type;
  delete cleanData.createdAt;
  delete cleanData.updatedAt;
  
  // 비밀번호가 비어있으면 제거 (수정 시 비밀번호 변경 안 함)
  if (!cleanData.password || cleanData.password.trim() === '') {
    delete cleanData.password;
  }

  console.log('=== API 요청 정보 ===');
  console.log('엔드포인트:', `/api/v1/admin/companies/${userId}`);
  console.log('전송 데이터:', cleanData);  
  const response = await api.put(`/admin/users/${userId}`, cleanData);
  return response.data;
};



export const deleteUser = async (userId, userType) => {
  // Company는 삭제 불가
  if (userType === 'company') {
    throw new Error('회사는 삭제할 수 없습니다.');
  }

  const endpoint = `/admin/users/${userId}`;

  console.log('=== 회원 삭제 API 호출 ===');
  console.log('유저 타입:', userType);
  console.log('유저 ID:', userId);
  console.log('엔드포인트:', endpoint);

  const response = await api.delete(endpoint);
  return response.data;
};

export const createCompany = async (data) => {
  try {
    console.log('=== 회사 생성 API 호출 ===');
    console.log('원본 데이터:', data);
    
    const requestData = {
      companyName: data.companyName,
      companyAddress: data.companyAddress || "",
      companyCeo: data.ceoName || "",                    // ✅ ceoName → companyCeo
      companyPhone: data.companyPhone || "",                                   // ✅ 빈 값
      companyContactPerson: data.managerName,            // ✅ managerName → companyContactPerson
      companyContactPhone: data.phoneNumber,             // ✅ phoneNumber → companyContactPhone
      businessRegistration: data.businessNumber || ""    // ✅ businessNumber → businessRegistration
    };
    
    console.log('전송할 데이터:', requestData);
    
    const response = await api.post('/companies', requestData);
    
    console.log('API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('회사 생성 API 실패:', error);
    console.error('에러 응답:', error.response?.data);
    throw error;
  }
};

// export const changePassword = async (passwordData) => {
//   try {
//     console.log("비밀번호 수정 메서드 호출됨 , " , passwordData)
//     const response = await api.put(
//       '/users/password',
//       {
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//         confirmPassword: passwordData.confirmPassword,
//       },
//       { skipAuthRedirect: true }
//     );
//     return response.data;
//   } catch (error) {
//     if (error.response?.data?.code === 'A005') {
//       throw new Error(error.response.data.message);
//     }
//     throw error;
//   }
// };


export const logout = async () => {
  return api.post("/logout", {}, {
    withCredentials: true, // 세션/쿠키 쓰는 경우 중요
  });
};