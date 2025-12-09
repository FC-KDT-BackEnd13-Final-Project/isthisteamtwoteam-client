import React, { useRef, useEffect } from 'react';

const UserSelectionDropdown = ({
    label,
    required = false,
    users,
    selectedUsers,
    setSelectedUsers,
    searchTerm,
    setSearchTerm,
    isOpen,
    setIsOpen,
    placeholder,
    color = 'blue' // 'blue' 또는 'green'
}) => {
    const dropdownRef = useRef(null);
    
    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    const toggleUser = (user) => {
        if (selectedUsers.find(u => u.userId === user.userId)) {
            setSelectedUsers(selectedUsers.filter(u => u.userId !== user.userId));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const removeUser = (userId, e) => {
        e?.stopPropagation();
        setSelectedUsers(selectedUsers.filter(u => u.userId !== userId));
    };

    const filteredUsers = users.filter(user => 
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const colorClasses = {
        blue: {
            selected: 'bg-blue-500 text-white hover:text-blue-200',
            tag: 'bg-blue-100 text-blue-800',
            tagButton: 'text-blue-600 hover:text-blue-800',
            hover: 'hover:bg-blue-50',
            checkbox: 'text-blue-600',
            selectedBg: 'bg-blue-50 border-blue-200'
        },
        green: {
            selected: 'bg-green-500 text-white hover:text-green-200',
            tag: 'bg-green-100 text-green-800',
            tagButton: 'text-green-600 hover:text-green-800',
            hover: 'hover:bg-green-50',
            checkbox: 'text-green-600',
            selectedBg: 'bg-green-50 border-green-200'
        }
    };

    const colors = colorClasses[color];

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                />
                
                {/* 드롭다운 목록 */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                        {/* 선택된 항목 표시 */}
                        {selectedUsers.length > 0 && (
                            <div className={`p-3 ${colors.selectedBg} border-b sticky top-0`}>
                                <div className="flex flex-wrap gap-2">
                                    {selectedUsers.map(user => (
                                        <span
                                            key={user.userId}
                                            className={`inline-flex items-center px-2 py-1 ${colors.selected} rounded-full text-xs`}
                                        >
                                            {user.userName}
                                            <button
                                                onClick={(e) => removeUser(user.userId, e)}
                                                className="ml-1 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* 사용자 목록 */}
                        {filteredUsers.map(user => (
                            <div
                                key={user.userId}
                                onClick={() => toggleUser(user)}
                                className={`px-4 py-3 ${colors.hover} cursor-pointer flex items-start justify-between border-b border-gray-100 last:border-b-0`}
                            >
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">
                                        {user.userName}
                                        {user.companyName && (
                                            <span className='text-gray-500'> ({user.companyName})</span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.some(u => u.userId === user.userId)}
                                    onChange={() => {}}
                                    className={`mt-1 w-5 h-5 ${colors.checkbox}`}
                                />
                            </div>
                        ))}
                        
                        {filteredUsers.length === 0 && (
                            <div className="px-4 py-3 text-gray-500 text-center">
                                검색 결과가 없습니다
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* 드롭다운 닫혔을 때 선택된 태그 */}
            {!isOpen && selectedUsers.length > 0 && (
                <div className="mt-3">
                    <div className="flex flex-wrap gap-2">
                        {selectedUsers.map(user => (
                            <span
                                key={user.userId}
                                className={`inline-flex items-center px-3 py-1 ${colors.tag} rounded-full text-sm`}
                            >
                                {user.userName}
                                <button
                                    onClick={(e) => removeUser(user.userId, e)}
                                    className={`ml-2 ${colors.tagButton} font-bold`}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSelectionDropdown;