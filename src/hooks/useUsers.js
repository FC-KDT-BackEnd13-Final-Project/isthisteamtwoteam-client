import { useState, useEffect } from 'react';
import api from '../utils/api/axios';

const useUsers = () => {
    const [developers, setDevelopers] = useState([]);
    const [clients, setClients] = useState([]);
    
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    
    const [isDeveloperDropdownOpen, setIsDeveloperDropdownOpen] = useState(false);
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    
    const [developerSearchTerm, setDeveloperSearchTerm] = useState('');
    const [clientSearchTerm, setClientSearchTerm] = useState('');

    useEffect(() => {
        loadDevelopers();
        loadClients();
    }, []);

    // 개발사 목록 로딩
    const loadDevelopers = async () => {
        try {
            const response = await api.get('/admin/projects/users?role=DEVELOPER');
            if (response.data.success && Array.isArray(response.data.response)) {
                setDevelopers(response.data.response);
            }

        } catch (error) {
            console.error('개발사 로딩 실패:', error);
            setDevelopers([]);
        }
    };

    // 고객사 목록 로딩
    const loadClients = async () => {
        try {
            const response = await api.get('/admin/projects/users?role=CUSTOMER');
            if (response.data.success && Array.isArray(response.data.response)) {
                setClients(response.data.response);
            }
        } catch (error) {
            console.error('고객사 로딩 실패:', error);
            setClients([]);
        }
    };

    return {
        developers,
        clients,
        selectedDevelopers,
        setSelectedDevelopers,
        selectedClients,
        setSelectedClients,
        isDeveloperDropdownOpen,
        setIsDeveloperDropdownOpen,
        isClientDropdownOpen,
        setIsClientDropdownOpen,
        developerSearchTerm,
        setDeveloperSearchTerm,
        clientSearchTerm,
        setClientSearchTerm
    };
};

export default useUsers;