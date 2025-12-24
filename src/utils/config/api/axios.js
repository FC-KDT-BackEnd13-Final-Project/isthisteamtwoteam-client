import axios from 'axios';
// import { getApiPath } from './apiPath'; // 더 이상 사용하지 않으므로 주석 처리

// 전역 user 정보 저장 (AuthContext에서 업데이트)
let currentUserRole = null;

/**
 * 현재 사용자 권한 설정 (AuthContext에서 호출)
 */
export const setCurrentUserRole = (role) => {
  currentUserRole = role;
};

/**
 * 현재 사용자 권한 가져오기
 */
export const getCurrentUserRole = () => {
  return currentUserRole;
};

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true
});

// 요청 인터셉터: 권한별 경로 자동 변경 기능 제거
api.interceptors.request.use(
  (config) => {
    // 역할별 경로 자동 변환 기능을 완전히 제거했습니다.
    // 이제 각 API 함수에서 명시적으로 올바른 경로를 사용해야 합니다.
    
    // 예: 
    // - 개발사: api.get('/developer/dashboard')
    // - 고객사: api.get('/customer/dashboard')
    // - 관리자: api.get('/admin/dashboard')
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 로그인 페이지로 리다이렉트
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuthRedirect) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;