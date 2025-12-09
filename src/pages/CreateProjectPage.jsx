import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../utils/api/axios.js";
import ChecklistModal from '../components/projectCreate/ChecklistModal';
import ChecklistItem from '../components/projectCreate/ChecklistItem';
import UserSelectionDropdown from '../components/projectCreate/UserSelectionDropdown';

import useChecklist from '../hooks/useChecklist';
import useUsers from '../hooks/useUsers';

const CreateProjectPage = () => {
    const navigate = useNavigate();
    
    // 커스텀 훅 사용
    const {
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
    } = useUsers();

    const {
        checklistItems,
        predefinedChecklists,
        selectedPredefinedItems,
        setSelectedPredefinedItems,
        addChecklistItem,
        deleteChecklistItem,
        updateChecklistText,
        toggleChecklistCheck,
        loadPredefinedChecklists,
        togglePredefinedChecklistItem,
        addSelectedChecklists
    } = useChecklist();
    
    // 기본 상태
    const [projectName, setProjectName] = useState('');
    const [stage, setStage] = useState('진행전');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [memo, setMemo] = useState('');
    const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
    const [checklistSearchTerm, setChecklistSearchTerm] = useState('');

    // 모달 열기
    const openChecklistModal = () => {
        setIsChecklistModalOpen(true);
        loadPredefinedChecklists();
    };

    // 모달 닫기
    const closeChecklistModal = () => {
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
                companyId: selectedClients[0]?.companyId || null,
                memo: memo,
                stage: stage
            };

            console.log('프로젝트 생성 요청:', projectData);

            const response = await api.post('/admin/projects', projectData);
            
            if (response.data.success) {
                alert('프로젝트가 생성되었습니다.');
                navigate('/');
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
            navigate(-1);
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
                    <UserSelectionDropdown
                        label="개발사 선택"
                        required={true}
                        users={developers}
                        selectedUsers={selectedDevelopers}
                        setSelectedUsers={setSelectedDevelopers}
                        searchTerm={developerSearchTerm}
                        setSearchTerm={setDeveloperSearchTerm}
                        isOpen={isDeveloperDropdownOpen}
                        setIsOpen={setIsDeveloperDropdownOpen}
                        placeholder="개발사를 검색하세요"
                        color="blue"
                    />

                    <UserSelectionDropdown
                        label="고객사 선택"
                        required={true}
                        users={clients}
                        selectedUsers={selectedClients}
                        setSelectedUsers={setSelectedClients}
                        searchTerm={clientSearchTerm}
                        setSearchTerm={setClientSearchTerm}
                        isOpen={isClientDropdownOpen}
                        setIsOpen={setIsClientDropdownOpen}
                        placeholder="고객사를 검색하세요"
                        color="green"
                    />
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
                            <ChecklistItem
                                key={item.id}
                                item={item}
                                onTextChange={updateChecklistText}
                                onCheckToggle={toggleChecklistCheck}
                                onDelete={deleteChecklistItem}
                                canDelete={checklistItems.length > 1}
                            />
                        ))}
                    </div>
                </div>

                {/* 체크리스트 모달 */}
                <ChecklistModal
                    isOpen={isChecklistModalOpen}
                    onClose={closeChecklistModal}
                    checklists={predefinedChecklists}
                    selectedItems={selectedPredefinedItems}
                    onToggleItem={togglePredefinedChecklistItem}
                    onSave={addSelectedChecklists}
                    searchTerm={checklistSearchTerm}
                    setSearchTerm={setChecklistSearchTerm}
                />

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