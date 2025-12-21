/**
 * 권한별 API 경로를 반환하는 유틸리티 함수
 * 
 * 화면은 공유하되, 권한별로 다른 API를 사용하도록 자동으로 경로를 변경합니다.
 * 
 * 사용 방법:
 * - API 함수에서 '/admin/projects' 같은 경로를 사용하면,
 * - 자동으로 사용자 권한에 따라 '/developer/projects' 또는 '/customer/projects'로 변경됩니다.
 * 
 * @param {string} userRole - 사용자 권한 (ADMIN, DEVELOPER, CUSTOMER)
 * @param {string} basePath - 기본 API 경로 (예: 'projects', 'dashboard')
 * @returns {string} 권한별 API 경로
 * 
 * 예시:
 * - getApiPath('ADMIN', 'projects') => '/admin/projects'
 * - getApiPath('DEVELOPER', 'projects') => '/developer/projects' (추후 입력 필요)
 * - getApiPath('CUSTOMER', 'projects') => '/customer/projects' (추후 입력 필요)
 */
export const getApiPath = (userRole, basePath) => {
  // basePath가 이미 /로 시작하면 그대로 사용
  if (basePath.startsWith('/')) {
    basePath = basePath.substring(1);
  }

  switch (userRole) {
    case 'ADMIN':
      // 관리자는 /admin/ 경로 사용
      return `/admin/${basePath}`;
    case 'DEVELOPER':
      // 개발사는 /developer/ 경로 사용
      // TODO: 추후 개발사 전용 API 경로로 수정 필요
      return `/developer/${basePath}`;
    case 'CUSTOMER':
      // 고객사는 /customer/ 경로 사용
      // TODO: 추후 고객사 전용 API 경로로 수정 필요
      return `/customer/${basePath}`;
    default:
      // 기본값은 /admin/ 경로
      return `/admin/${basePath}`;
  }
};

/**
 * 현재 사용자의 권한을 가져오는 함수
 * localStorage나 sessionStorage에서 가져오거나, 전역 상태에서 가져올 수 있음
 * 
 * @returns {string|null} 사용자 권한 (ADMIN, DEVELOPER, CUSTOMER) 또는 null
 */
export const getCurrentUserRole = () => {
  // 세션 스토리지에서 사용자 정보 확인
  try {
    // AuthContext에서 user 정보를 가져오는 대신, 
    // API 호출 시점에 user 정보를 전달받도록 함
    // 또는 전역 상태 관리 라이브러리를 사용할 수 있음
    
    // 임시로 localStorage에서 확인 (실제 구현은 프로젝트 구조에 따라 다를 수 있음)
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.role;
    }
  } catch (error) {
    console.error('사용자 권한 확인 실패:', error);
  }
  
  return null;
};

