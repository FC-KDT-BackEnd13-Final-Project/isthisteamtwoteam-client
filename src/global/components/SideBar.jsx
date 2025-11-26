import Icon from "./Icon";

export default function SideBar() {
  return (
    <aside className="w-[260px] bg-white border-r border-slate-200 fixed inset-y-0 overflow-y-auto flex flex-col">
      <div className="px-5 py-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl">
            🏢
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Kanky Store
            </h2>
            <p className="text-xs text-slate-500">Company</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-5 space-y-6">
        <div>
          <p className="px-5 mb-2 text-[11px] font-semibold text-slate-400 tracking-[0.08em] uppercase">
            GENERAL
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-blue-50 text-blue-600 font-medium text-sm relative cursor-pointer">
              <span className="absolute left-0 top-0 h-full w-[3px] bg-blue-600" />
              <Icon name="layout-dashboard" />
              <span>대시보드</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="file-text" />
              <span>프로젝트 (119)</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="users" />
              <span>회원</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="users" />
              <span>회원</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="users" />
              <span>회원</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="users" />
              <span>회원</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="users" />
              <span>회원</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="users" />
              <span>회원</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="users" />
              <span>회원</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="folder-open" />
              <span>삭제한 프로젝트 관리</span>
            </div>
          </div>
        </div>

        <div>
          <p className="px-5 mb-2 text-[11px] font-semibold text-slate-400 tracking-[0.08em] uppercase">
            SETTINGS
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="settings" />
              <span>설정</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm cursor-pointer">
              <Icon name="log-out" />
              <span>로그아웃</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="px-5 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
            <Icon name="user" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              kimdong3021
            </h4>
            <p className="text-xs text-slate-500">관리자</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
