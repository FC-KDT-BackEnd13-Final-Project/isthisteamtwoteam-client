import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api/axios.js";

const CreateProjectPage = () => {
    const navigate = useNavigate();
    
    // 기본 상태
    const [projectName, setProjectName] = useState('');
    const [stage, setStage] = useState('진행전');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [memo, setMemo] = useState('');

    const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
    const [predefinedChecklists, setPredefinedChecklists] = useState([]);
    const [selectedPredefinedItems, setSelectedPredefinedItems] = useState([]);
    const [checklistSearchTerm, setChecklistSearchTerm] = useState('');

    // 체크리스트 상태 (isNew 플래그 추가)
    const [checklistItems, setChecklistItems] = useState([]);
    
    // 개발사/고객사 데이터
    const [developers, setDevelopers] = useState([]);
    const [clients, setClients] = useState([]);
    
    // 선택된 사용자들
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);
    
    // 드롭다운 상태
    const [isDeveloperDropdownOpen, setIsDeveloperDropdownOpen] = useState(false);
    const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
    
    // 검색어
    const [developerSearchTerm, setDeveloperSearchTerm] = useState('');
    const [clientSearchTerm, setClientSearchTerm] = useState('');
    
    // Ref
    const developerDropdownRef = useRef(null);
    const clientDropdownRef = useRef(null);
    
    // 데이터 로딩
    useEffect(() => {
        const initialize = async () => {
            loadDevelopers();
            loadClients();
            
            // 초기 빈 항목 1개 추가 (DB 저장 안 함)
            if (checklistItems.length === 0) {
                setChecklistItems([{
                    id: `temp-${Date.now()}`, // 임시 ID
                    text: '',
                    checked: false,
                    isNew: true // 새로 만든 항목 플래그
                }]);
            }
        };
        
        initialize();
    }, []);
    
    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (developerDropdownRef.current && !developerDropdownRef.current.contains(event.target)) {
                setIsDeveloperDropdownOpen(false);
            }
            if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target)) {
                setIsClientDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // 개발사 목록 로딩
    const loadDevelopers = async () => {
        try {
            const response = await api.get('/admin/projects/users?type=developers');
            console.log('개발사 응답:', response.data);
            
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
            const response = await api.get('/admin/projects/users?type=clients');
            console.log('고객사 응답:', response.data);
            
            if (response.data.success && Array.isArray(response.data.response)) {
                setClients(response.data.response);
            }
        } catch (error) {
            console.error('고객사 로딩 실패:', error);
            setClients([]);
        }
    };

    // 체크리스트 항목 추가 (DB 저장 안 함, 프론트에서만 관리)
    const addChecklistItem = () => {
        const newItem = {
            id: `temp-${Date.now()}`, // 임시 ID
            text: '',
            checked: false,
            isNew: true // 새로 만든 항목
        };
        setChecklistItems([...checklistItems, newItem]);
    };

    // 체크리스트 항목 삭제 (프론트에서만 제거)
    const deleteChecklistItem = (id) => {
        if (checklistItems.length === 1) {
            alert('최소 1개의 항목은 유지되어야 합니다.');
            return;
        }
        
        setChecklistItems(checklistItems.filter(item => item.id !== id));
        console.log('프론트에서 항목 제거:', id);
    };

    // 체크리스트 텍스트 변경 (프론트에서만 업데이트, DB 저장 안 함)
    const updateChecklistText = (id, text) => {
        setChecklistItems(checklistItems.map(item => 
            item.id === id ? { ...item, text } : item
        ));
    };

    // 체크박스 토글 (프론트에서만)
    const toggleChecklistCheck = (id) => {
        setChecklistItems(checklistItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    // 미리 정의된 체크리스트 목록 로딩
    const loadPredefinedChecklists = async () => {
        try {
            const response = await api.get('/admin/checklists?page=0&size=100');
            console.log('체크리스트 응답:', response.data);
            
            if (response.data.success && Array.isArray(response.data.response.content)) {
                setPredefinedChecklists(response.data.response.content);
            }
        } catch (error) {
            console.error('체크리스트 로딩 실패:', error);
            setPredefinedChecklists([]);
        }
    };

    // 모달 열 때 데이터 로딩
    const openChecklistModal = () => {
        setIsChecklistModalOpen(true);
        loadPredefinedChecklists();
    };

    // 선택된 체크리스트 토글
    const togglePredefinedChecklistItem = (item) => {
        if (selectedPredefinedItems.find(i => i.id === item.id)) {
            setSelectedPredefinedItems(selectedPredefinedItems.filter(i => i.id !== item.id));
        } else {
            setSelectedPredefinedItems([...selectedPredefinedItems, item]);
        }
    };

    // 불러오기로 선택한 항목들을 체크리스트에 추가
    const addSelectedChecklists = () => {
        if (selectedPredefinedItems.length === 0) {
            alert('체크리스트 항목을 선택해주세요.');
            return;
        }
    
        // 기존 텍스트와 중복 체크
        const existingTexts = new Set(checklistItems.map(item => item.text.trim()));
        
        // 중복되지 않은 항목만 추가 (기존 체크리스트는 isNew: false)
        const newItems = selectedPredefinedItems
            .filter(item => !existingTexts.has(item.content))
            .map(item => ({
                id: item.id, // 기존 체크리스트 ID 사용
                text: item.content,
                checked: false,
                isNew: false // 기존 체크리스트
            }));
        
        if (newItems.length === 0) {
            alert('선택한 항목이 모두 이미 추가되어 있습니다.');
            return;
        }
        
        // 빈 항목 제거하고 새 항목 추가
        const filteredItems = checklistItems.filter(item => item.text.trim() !== '');
        setChecklistItems([...filteredItems, ...newItems]);
        
        // 모달 닫고 상태 초기화
        setIsChecklistModalOpen(false);
        setSelectedPredefinedItems([]);
        setChecklistSearchTerm('');
    };

    // 프로젝트 생성
    const handleCreateProject = async () => {
        // 유효성 검사
        if (!projectName.trim()) {
            alert('프로젝트 이름을 입력해주세요.');
            return;
        }
        if (selectedDevelopers.length === 0) {
            alert('개발사를 선택해주세요.');
            return;
        }
        if (selectedClients.length === 0) {
            alert('고객사를 선택해주세요.');
            return;
        }
        if (!startDate) {
            alert('시작일을 선택해주세요.');
            return;
        }
        if (!endDate) {
            alert('종료일을 선택해주세요.');
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert('종료일은 시작일보다 이후여야 합니다.');
            return;
        }

        try {
            // 1. 새로 작성한 체크리스트를 DB에 저장
            const newChecklistsToSave = checklistItems.filter(item => 
                item.isNew && item.text.trim() !== ''
            );
            
            const savedNewChecklists = [];
            for (const item of newChecklistsToSave) {
                try {
                    const response = await api.post('/admin/checklists', {
                        content: item.text
                    });
                    if (response.data.success && response.data.response) {
                        savedNewChecklists.push(response.data.response.id);
                    }
                } catch (error) {
                    console.error('체크리스트 저장 실패:', error);
                }
            }

            // 2. 기존 체크리스트 ID 수집
            const existingChecklistIds = checklistItems
                .filter(item => !item.isNew)
                .map(item => item.id);

            // 3. 모든 체크리스트 ID 합치기
            const selectedChecklistIds = [...existingChecklistIds, ...savedNewChecklists];

            // 4. 프로젝트 생성 요청
            const projectData = {
                projectName: projectName,
                startDate: startDate,
                endDate: endDate,
                members: selectedDevelopers.map(dev => dev.userId),
                selectedChecklistIds: selectedChecklistIds,
                companyId: selectedClients[0]?.companyId || null, // 첫 번째 고객사의 companyId
                memo: memo,
                stage: stage
            };

            console.log('프로젝트 생성 요청:', projectData);

            const response = await api.post('/admin/projects', projectData);
            
            if (response.data.success) {
                alert('프로젝트가 생성되었습니다.');
                navigate('/'); // 프로젝트 목록으로 이동
            }
        } catch (error) {
            console.error('프로젝트 생성 실패:', error);
            console.error('에러 상세:', error.response?.data);
            alert('프로젝트 생성에 실패했습니다.');
        }
    };

    // 취소 버튼
    const handleCancel = () => {
        if (confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
            navigate(-1); // 이전 페이지로
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">프로젝트 생성</h1>

                {/* 프로젝트 이름 */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        프로젝트 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="프로젝트 이름을 입력하세요"
                    />
                </div>

                {/* 개발사 및 고객사 선택 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* 개발사 선택 */}
                    <div className="relative" ref={developerDropdownRef}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            개발사 선택 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={developerSearchTerm}
                                onChange={(e) => setDeveloperSearchTerm(e.target.value)}
                                onClick={() => setIsDeveloperDropdownOpen(!isDeveloperDropdownOpen)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="개발사를 검색하세요"
                            />
                            
                            {/* 드롭다운 목록 */}
                            {isDeveloperDropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                                    {/* 선택된 항목을 드롭다운 내부 상단에 표시 */}
                                    {selectedDevelopers.length > 0 && (
                                        <div className="p-3 bg-blue-50 border-b border-blue-200 sticky top-0">
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDevelopers.map(dev => (
                                                    <span
                                                        key={dev.userId}
                                                        className="inline-flex items-center px-2 py-1 bg-blue-500 text-white rounded-full text-xs"
                                                    >
                                                        {dev.userName}
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedDevelopers(selectedDevelopers.filter(d => d.userId !== dev.userId));
                                                            }}
                                                            className="ml-1 text-white hover:text-blue-200 font-bold"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* 전체 목록 */}
                                    {developers
                                        .filter(dev => 
                                            dev.userName?.toLowerCase().includes(developerSearchTerm.toLowerCase()) ||
                                            dev.email?.toLowerCase().includes(developerSearchTerm.toLowerCase())
                                        )
                                        .map(dev => (
                                            <div
                                                key={dev.userId}
                                                onClick={() => {
                                                    if (selectedDevelopers.find(d => d.userId === dev.userId)) {
                                                        setSelectedDevelopers(selectedDevelopers.filter(d => d.userId !== dev.userId));
                                                    } else {
                                                        setSelectedDevelopers([...selectedDevelopers, dev]);
                                                    }
                                                }}
                                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-start justify-between border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">{dev.userName}</div>
                                                    <div className="text-sm text-gray-500">{dev.email}</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedDevelopers.some(d => d.userId === dev.userId)}
                                                    onChange={() => {}}
                                                    className="mt-1 w-5 h-5 text-blue-600"
                                                />
                                            </div>
                                        ))
                                    }
                                    {developers.filter(dev => 
                                        dev.userName?.toLowerCase().includes(developerSearchTerm.toLowerCase()) ||
                                        dev.email?.toLowerCase().includes(developerSearchTerm.toLowerCase())
                                    ).length === 0 && (
                                        <div className="px-4 py-3 text-gray-500 text-center">
                                            검색 결과가 없습니다
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        {/* 선택된 개발사 태그 */}
                        {selectedDevelopers.length > 0 && (
                            <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {selectedDevelopers.map(dev => (
                                        <span
                                            key={dev.userId}
                                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                        >
                                            {dev.userName}
                                            <button
                                                onClick={() => setSelectedDevelopers(selectedDevelopers.filter(d => d.userId !== dev.userId))}
                                                className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 고객사 선택 */}
                    <div className="relative" ref={clientDropdownRef}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            고객사 선택 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={clientSearchTerm}
                                onChange={(e) => setClientSearchTerm(e.target.value)}
                                onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="고객사를 검색하세요"
                            />
                            
                            {/* 드롭다운이 열렸을 때만 선택된 항목 태그 표시 */}
                            {isClientDropdownOpen && selectedClients.length > 0 && (
                                <div className="absolute z-20 w-full mt-1 bg-green-50 border border-green-200 rounded-t-lg p-3 shadow-sm">
                                    <div className="flex flex-wrap gap-2">
                                        {selectedClients.map(client => (
                                            <span
                                                key={client.userId}
                                                className="inline-flex items-center px-2 py-1 bg-green-500 text-white rounded-full text-xs"
                                            >
                                                {client.userName}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedClients(selectedClients.filter(c => c.userId !== client.userId));
                                                    }}
                                                    className="ml-1 text-white hover:text-green-200 font-bold"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* 드롭다운 목록 */}
                            {isClientDropdownOpen && (
                                <div className={`absolute z-10 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto ${
                                    selectedClients.length > 0 ? 'rounded-b-lg' : 'rounded-lg mt-1'
                                }`}
                                style={selectedClients.length > 0 ? { marginTop: '0', borderTopLeftRadius: '0', borderTopRightRadius: '0' } : {}}>
                                    {clients
                                        .filter(client => 
                                            client.userName?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                                            client.companyName?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                                            client.email?.toLowerCase().includes(clientSearchTerm.toLowerCase())
                                        )
                                        .map(client => (
                                            <div
                                                key={client.userId}
                                                onClick={() => {
                                                    if (selectedClients.find(c => c.userId === client.userId)) {
                                                        setSelectedClients(selectedClients.filter(c => c.userId !== client.userId));
                                                    } else {
                                                        setSelectedClients([...selectedClients, client]);
                                                    }
                                                }}
                                                className="px-4 py-3 hover:bg-green-50 cursor-pointer flex items-start justify-between border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">
                                                        {client.userName} <span className='text-gray-500'>({client.companyName})</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600">{client.email}</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedClients.some(c => c.userId === client.userId)}
                                                    onChange={() => {}}
                                                    className="mt-1 w-5 h-5 text-green-600"
                                                />
                                            </div>
                                        ))
                                    }
                                    {clients.filter(client => 
                                        client.userName?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                                        client.companyName?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
                                        client.email?.toLowerCase().includes(clientSearchTerm.toLowerCase())
                                    ).length === 0 && (
                                        <div className="px-4 py-3 text-gray-500 text-center">
                                            검색 결과가 없습니다
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
    
                        {/* 드롭다운이 닫혔을 때만 아래에 태그 표시 */}
                        {!isClientDropdownOpen && selectedClients.length > 0 && (
                            <div className="mt-3">
                                <div className="flex flex-wrap gap-2">
                                    {selectedClients.map(client => (
                                        <span
                                            key={client.userId}
                                            className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                        >
                                            {client.userName}
                                            <button
                                                onClick={() => setSelectedClients(selectedClients.filter(c => c.userId !== client.userId))}
                                                className="ml-2 text-green-600 hover:text-green-800 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 프로젝트 기간 */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            시작일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            종료일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* 프로젝트 단계 */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        프로젝트 시작 단계
                    </label>
                    <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="진행 전">진행 전</option>
                        <option value="진행 중단">진행 중단</option>
                        <option value="요구사항 정의">요구사항 정의</option>
                        <option value="화면 설계">화면 설계</option>
                        <option value="디자인, 퍼블리싱">디자인, 퍼블리싱</option>
                        <option value="개발">개발</option>
                        <option value="검수">검수</option>
                        <option value="유지보수">유지보수</option>
                        <option value="완료">완료</option>
                    </select>
                </div>

                {/* 프로젝트 이미지 */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        프로젝트 이미지
                    </label>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                        >
                            파일 선택
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">최대 4MB까지 업로드 가능합니다.</p>
                </div>

                {/* 메모 */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        메모
                    </label>
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="프로젝트에 대한 메모를 입력하세요"
                    />
                </div>

                {/* 체크리스트 모달 */}
                {isChecklistModalOpen && (
                    <div className="fixed inset-0 bg-gray-500/60 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-xl">
                            {/* 모달 헤더 */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800">전체 체크리스트 조회 화면</h2>
                                <button
                                    onClick={() => {
                                        setIsChecklistModalOpen(false);
                                        setSelectedPredefinedItems([]);
                                        setChecklistSearchTerm('');
                                    }}
                                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                >
                                    ×
                                </button>
                            </div>
                            
                            {/* 검색 입력 */}
                            <div className="p-6 border-b border-gray-200">
                                <input
                                    type="text"
                                    value={checklistSearchTerm}
                                    onChange={(e) => setChecklistSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="체크리스트 검색"
                                />
                            </div>
                            
                            {/* 체크리스트 목록 */}
                            <div className="flex-1 overflow-y-auto p-6" style={{ minHeight: '400px' }}>
                                <div className="space-y-3">
                                    {predefinedChecklists
                                        .filter(item => 
                                            item.content?.toLowerCase().includes(checklistSearchTerm.toLowerCase())
                                        )
                                        .map(item => (
                                            <div
                                                key={item.id}
                                                onClick={() => togglePredefinedChecklistItem(item)}
                                                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPredefinedItems.some(i => i.id === item.id)}
                                                    onChange={() => {}}
                                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-0 cursor-pointer mr-4 flex-shrink-0"
                                                />
                                                <span className="flex-1 text-gray-800">{item.content}</span>
                                            </div>
                                        ))
                                    }
                                    {predefinedChecklists.filter(item => 
                                        item.content?.toLowerCase().includes(checklistSearchTerm.toLowerCase())
                                    ).length === 0 && (
                                        <div className="text-center text-gray-500 py-12">
                                            검색 결과가 없습니다
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* 모달 푸터 */}
                            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                                <button
                                    onClick={addSelectedChecklists}
                                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                                >
                                    저장 ({selectedPredefinedItems.length}개 선택됨)
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 체크리스트 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-semibold text-gray-700">
                            체크리스트
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={openChecklistModal}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                            >
                                불러오기
                            </button>
                            <button
                                type="button"
                                onClick={addChecklistItem}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                            >
                                + 항목 추가
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {checklistItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 group">
                                {/* 입력창 + 체크박스 */}
                                <div className="flex-1 relative">
                                    <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500">
                                        {/* 체크박스 */}
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => toggleChecklistCheck(item.id)}
                                            className="w-4 h-4 ml-5 text-blue-600 border-gray-300 rounded focus:ring-0 cursor-pointer flex-shrink-0"
                                        />
                                        
                                        {/* 텍스트 입력 */}
                                        <input
                                            type="text"
                                            value={item.text}
                                            onChange={(e) => updateChecklistText(item.id, e.target.value)}
                                            className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
                                            placeholder="체크리스트 항목을 입력하세요"
                                        />
                                    </div>
                                </div>
                                
                                {/* 삭제 버튼 */}
                                <button
                                    onClick={() => deleteChecklistItem(item.id)}
                                    className="text-gray-300 hover:text-red-500 font-bold text-2xl px-2 transition-colors flex-shrink-0"
                                    disabled={checklistItems.length === 1}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={handleCreateProject}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        프로젝트 생성
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;