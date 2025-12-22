import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectChecklist } from '../utils/config/api/checklist/checklistApi';
import { getProjectPosts } from '../utils/config/api/post/postApi';
import { getProjectDetail } from '../utils/config/api/project/projectApi';
import { getProjectMembers } from '../utils/config/api/project/projectMemberApi';
import ProjectHeader from '../components/project/ProjectHeader';
import ChecklistSection from '../components/project/ChecklistSection';
import PostSection from '../components/project/PostSection';
import ProjectSidebar from '../components/project/ProjectSidebar';
import { getProjectApprovalRequests } from '../utils/config/api/post/approvalApi';
import ApprovalSection from '../components/post/ApprovalSection';

export default function ProjectMainPage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [checklists, setChecklists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [projectDetail, setProjectDetail] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [members, setMembers] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState(null);  
  const [isApprovalLoading, setIsApprovalLoading] = useState(false); 

  useEffect(() => {
    if (!projectId) {
      console.log('projectId가 아직 없습니다');
      return;
    }

    console.log('프로젝트 데이터 로딩 시작:', projectId);
    
    // 모든 데이터 fetch
    fetchChecklists();
    fetchPosts();
    fetchProjectDetail(); 
    fetchProjectMembers();
    fetchApprovalRequests();  

  }, [projectId]);

  const fetchApprovalRequests = async () => {
    if (!projectId) return; // 추가 안전장치
    
    setIsApprovalLoading(true);
    try {
      const data = await getProjectApprovalRequests(projectId);
      setApprovalRequests(data.response);
      console.log('승인 요청:', data.response);
    } catch (error) {
      console.error('승인 요청 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsApprovalLoading(false);
    }
  };

  const fetchProjectMembers = async () => {
    if (!projectId) return; // 추가 안전장치
    
    try {
      const response = await getProjectMembers(projectId);
      setMembers(response);
      console.log('프로젝트 멤버:', response);
    } catch (error) {
      console.error('프로젝트 멤버 조회 실패:', error);
      setError(error.message);
    }
  };

  const fetchChecklists = async () => {
    if (!projectId) return; // 추가 안전장치
    
    setIsLoading(true);
    try {
      const data = await getProjectChecklist(projectId);
      setChecklists(data.response);    
    } catch (error) {
      console.error('체크리스트 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    if (!projectId) return; // 추가 안전장치
    
    setIsPostsLoading(true);
    try {
      const data = await getProjectPosts(projectId, 'all');
      setPostsData(data.response);
      console.log('게시글:', data.response);
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsPostsLoading(false);
    }
  };

  const fetchProjectDetail = async () => {
    if (!projectId) return; // 추가 안전장치
    
    try {
      const data = await getProjectDetail(projectId);
      setProjectDetail(data);
      console.log('프로젝트 상세:', data);
    } catch (error) {
      console.error('프로젝트 상세 조회 실패:', error);
      setError(error.message);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // ⭐ 로딩 중이거나 projectId가 없을 때 처리
  if (!projectId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">프로젝트 ID를 불러오는 중...</div>
      </div>
    );
  }

  // ⭐ 에러 처리
  if (error && !projectDetail) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500">
          <p>프로젝트를 불러오는데 실패했습니다.</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="mx-auto max-w-[1500px] px-4 py-5">
        {/* 페이지 제목 */}
        <div className="mb-5">
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">
            프로젝트
          </h1>
        </div>

        <div className="flex gap-6">
          {/* 메인 콘텐츠 */}
          <main className="flex-1">
            <ProjectHeader projectDetail={projectDetail} />
            <ChecklistSection 
              checklists={checklists} 
              setChecklists={setChecklists} 
            />

            <ApprovalSection 
              approvalRequests={approvalRequests}
              isLoading={isApprovalLoading}
              projectId={projectId}
            />

            <PostSection 
              postsData={postsData}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isPostsLoading={isPostsLoading}
            />
          </main>

          {/* 우측 사이드바 */}
          <aside className="sticky top-5 self-start">
            <ProjectSidebar 
              projectDetail={projectDetail}
              members={members}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}