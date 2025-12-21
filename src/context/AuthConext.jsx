import { createContext, useContext, useEffect, useState } from "react";
import api, { setCurrentUserRole } from '../utils/config/api/axios';

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            console.log("=== 세션 체크 시작 ===");
            const response = await api.get('/auth/session', {
                skipAuthRedirect: true, // 이 요청에서는 401 시 리다이렉트 안 함
                skipRolePath: true // 권한별 경로 변경 안 함
            });
            
            if (response.data.success) {
                console.log("세션 응답:", response.data.response);
                const userData = response.data.response;
                setUser(userData);
                // 전역 user 권한 설정 (API 경로 변경용)
                if (userData?.role) {
                    setCurrentUserRole(userData.role);
                }
            } else {
                console.log("세션 응답 실패");
                setUser(null);
                setCurrentUserRole(null);
            }
        } catch (error) {
            // 404 또는 인증 에러는 정상적인 "로그인하지 않은 상태"
            console.log('세션 없음 또는 만료됨');
            setUser(null);
            setCurrentUserRole(null);
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    const login = async (credentials) => {
        try {
            const response = await api.post('/login', credentials, {
                skipRolePath: true // 로그인 API는 권한별 경로 변경 안 함
            });
            await checkAuth(); // 로그인 후 세션 정보 새로 가져오기
            return response.data;
        } catch (error) {
            console.error("로그인 실패:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout', {}, {
                skipRolePath: true // 로그아웃 API는 권한별 경로 변경 안 함
            });
        } catch (error) {
            console.error("로그아웃 에러:", error);
        } finally {
            setUser(null);
            setCurrentUserRole(null);
            // 로그아웃 후 로그인 페이지로 리다이렉트
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);