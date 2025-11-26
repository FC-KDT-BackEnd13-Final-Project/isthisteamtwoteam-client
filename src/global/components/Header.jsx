import Icon from "./Icon";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          개별 프로젝트 게시판
        </h1>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Dashboard</span>
          <span>/</span>
          <span>개별 프로젝트 게시판</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-500"
          type="button"
        >
          <Icon name="search" size={18} />
        </button>
        <button
          className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-500"
          type="button"
        >
          <Icon name="bell" size={18} />
        </button>
        <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
            <Icon name="user" size={14} />
          </div>
          <span>Guy Hawkins</span>
        </div>
      </div>
    </header>
  );
}
