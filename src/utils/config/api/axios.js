import axios from 'axios';
import { getApiPath } from './apiPath';

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

// 요청 인터셉터: 권한별로 API 경로 변경
api.interceptors.request.use(
  (config) => {
    // skipRolePath가 true면 권한별 경로 변경 안 함
    if (config.skipRolePath) {
      return config;
    }

    // /admin/, /developer/, /customer/로 시작하는 경로만 변경
    if (config.url && currentUserRole) {
      const originalUrl = config.url;
      
      // 관리자 경로를 다른 권한 경로로 변경
      if (originalUrl.startsWith('/admin/')) {
        const basePath = originalUrl.replace('/admin/', '');
        const newPath = getApiPath(currentUserRole, basePath);
        config.url = newPath;
      }
      // 개발사 경로를 다른 권한 경로로 변경
      else if (originalUrl.startsWith('/developer/')) {
        const basePath = originalUrl.replace('/developer/', '');
        const newPath = getApiPath(currentUserRole, basePath);
        config.url = newPath;
      }
      // 고객사 경로를 다른 권한 경로로 변경
      else if (originalUrl.startsWith('/customer/')) {
        const basePath = originalUrl.replace('/customer/', '');
        const newPath = getApiPath(currentUserRole, basePath);
        config.url = newPath;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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