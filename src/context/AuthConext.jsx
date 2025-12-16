import { Check } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import api from '../utils/api/axios';

const AuthContext = createContext();
export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(()=> {
    checkAuth();
  },[])

  const checkAuth = async() =>{
    try{
        console.log("checkAuth 실행")
        const response = await api.get("/auth/session")
        console.log(response.data.response)
        setUser(response.data.response)
        
    }catch(error){
        setUser(null)
    }finally{
        setLoading(false)
    }
  }

  const login = async (credential) => {
    const response = await api.post('/login', credential)
    await checkAuth()
    return response.data
  }


  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

    return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)