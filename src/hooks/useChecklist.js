import { useState } from 'react';
import api from '../utils/config/api/axios';

const useChecklist = () => {
    const [checklistItems, setChecklistItems] = useState([{
        id: `temp-${Date.now()}`,
        text: '',
        checked: false,
        isNew: true
    }]);
    
    const [predefinedChecklists, setPredefinedChecklists] = useState([]);
    const [selectedPredefinedItems, setSelectedPredefinedItems] = useState([]);

    // 체크리스트 항목 추가
    const addChecklistItem = () => {
        const newItem = {
            id: `temp-${Date.now()}`,
            text: '',
            checked: false,
            isNew: true
        };
        setChecklistItems([...checklistItems, newItem]);
    };

    // 체크리스트 항목 삭제
    const deleteChecklistItem = (id) => {
        if (checklistItems.length === 1) {
            alert('최소 1개의 항목은 유지되어야 합니다.');
            return;
        }
        setChecklistItems(checklistItems.filter(item => item.id !== id));
    };

    // 체크리스트 텍스트 변경
    const updateChecklistText = (id, text) => {
        setChecklistItems(checklistItems.map(item => 
            item.id === id ? { ...item, text } : item
        ));
    };

    // 체크박스 토글
    const toggleChecklistCheck = (id) => {
        setChecklistItems(checklistItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    // 미리 정의된 체크리스트 로딩
    const loadPredefinedChecklists = async () => {
        try {
            const response = await api.get('/admin/checklists?page=0&size=100',{
                 skipRolePath: true
            });
            if (response.data.success && Array.isArray(response.data.response.content)) {
                setPredefinedChecklists(response.data.response.content);
            }
        } catch (error) {
            console.error('체크리스트 로딩 실패:', error);
            setPredefinedChecklists([]);
        }
    };

    //선택된 체크리스트 토글
    const togglePredefinedChecklistItem = (item) => {
        if (selectedPredefinedItems.some(i => i.checkListId === item.checkListId)) {
            setSelectedPredefinedItems(selectedPredefinedItems.filter(i => i.checkListId !== item.checkListId));
        } else {
            setSelectedPredefinedItems([...selectedPredefinedItems, item]);
        }
    };

    // 선택한 항목들을 체크리스트에 추가
    const addSelectedChecklists = () => {
        if (selectedPredefinedItems.length === 0) {
            alert('체크리스트 항목을 선택해주세요.');
            return false;
        }

        const existingTexts = new Set(
            checklistItems.map(item => item.text.trim())
        );

        const newItems = selectedPredefinedItems
            .filter(item => !existingTexts.has(item.content))
            .map(item => ({
                id: item.checkListId, //
                text: item.content,
                checked: false,
                isNew: false
            }));

        if (newItems.length === 0) {
            alert('선택한 항목이 모두 이미 추가되어 있습니다.');
            return false;
        }

        const filteredItems = checklistItems.filter(
            item => item.text.trim() !== ''
        );

        setChecklistItems([...filteredItems, ...newItems]);
        setSelectedPredefinedItems([]);

        return true; // ✅ 성공 시에만 true
    };


    return {
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
    };
};

export default useChecklist;