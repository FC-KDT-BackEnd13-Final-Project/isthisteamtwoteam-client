import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectChecklist } from '../utils/api/checklist/checklistApi';
import { getProjectPosts } from '../utils/api/post/postApi';
import { getProjectDetail } from '../utils/api/project/projectApi';
import { getProjectMembers } from '../utils/api/project/projectMemberApi';
import ProjectHeader from '../components/project/ProjectHeader';
import ChecklistSection from '../components/project/ChecklistSection';
import PostSection from '../components/project/PostSection';
import ProjectSidebar from '../components/project/ProjectSidebar';
import { getProjectApprovalRequests } from '../utils/api/post/approvalApi';
import ApprovalSection from '../components/post/ApprovalSection';

export default function ProjectMainPage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [checklists, setChecklists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [projectDetail, setProjectDetail] = useState(null);
  const [postsData, setPostsData] = useState(null); // 전체 response 데이터 저장
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [members, setMembers] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState(null);  
  const [isApprovalLoading, setIsApprovalLoading] = useState(false); 

  useEffect(() => {
    fetchChecklists();
    fetchPosts();
    fetchProjectDetail(); 
    fetchProjectMembers();
    fetchApprovalRequests();  

  }, [projectId]);

  const fetchApprovalRequests = async () => {
    setIsApprovalLoading(true);
    try {
      const data = await getProjectApprovalRequests(projectId);
      setApprovalRequests(data.response);
      console.log('승인 요청:', data.response);
    } catch (error) {
      console.error('승인 요청 조회 실패:', error);
    } finally {
      setIsApprovalLoading(false);
    }
  };


  const fetchProjectMembers = async () => {
    try {
      const response = await getProjectMembers(projectId);
      setMembers(response);
      console.log('프로젝트 멤버:', response);
    } catch (error) {
      console.error('프로젝트 멤버 조회 실패:', error);
    }
  };

  const fetchChecklists = async () => {
    try {
      const data = await getProjectChecklist(projectId);
      setChecklists(data.response);    
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    setIsPostsLoading(true);
    try {
      const data = await getProjectPosts(projectId, 'all');
      setPostsData(data.response);
      console.log(data.response);
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsPostsLoading(false);
    }
  };

  const fetchProjectDetail = async () => {
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
          <ProjectSidebar 
            projectDetail={projectDetail}
            members={members}
          />
        </div>
      </div>
    </div>
  );
}

