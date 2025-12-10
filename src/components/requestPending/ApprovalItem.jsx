import { ChevronRightIcon } from "../common/icons/RequestPendingIcon";

const STATUS_CONFIG = {
  pending: {
    text: "승인 대기",
    className: "bg-[#fff3e6] text-[#ff9500] border border-[#ffd699]",
  },
  approved: {
    text: "승인 완료",
    className: "bg-[#e6f7f1] text-[#16a34a] border border-[#a3e6c8]",
  },
  rejected: {
    text: "승인 거절",
    className: "bg-[#ffe6e6] text-[#dc2626] border border-[#ffb3b3]",
  },
};

const ApprovalItem = ({ item, onViewDetail }) => {
  const statusMap = {
    'STATUS_PENDING': 'pending',
    'STATUS_APPROVED': 'approved',
    'STATUS_REJECTED': 'rejected',
  };
  
  const statusKey = statusMap[item.requestStatus] || 'pending';
  const status = STATUS_CONFIG[statusKey];

  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center p-4 border border-[#e5e7eb] rounded-[10px] transition-all duration-200 bg-white hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.08)] max-[768px]:grid-cols-1 max-[768px]:gap-3">
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="text-[14px] font-medium text-[#1a1a1a]">
          {item.postTitle}
        </div>

        <div className="flex items-center gap-3 text-[12px] text-[#999]">
          <span>{item.projectName}</span>
          <span className="w-[3px] h-[3px] bg-[#d0d0d0] rounded-full"></span>
          <span>{item.companyName}</span>
        </div>
      </div>

      <span className={`py-1.5 px-3 rounded-[6px] text-[12px] font-semibold whitespace-nowrap ${status.className}`}>
        {status.text}
      </span>

      <button
        onClick={() => onViewDetail(item.postId)}
        className="flex items-center gap-1.5 py-2 px-4 bg-white text-[#555] border border-[#e5e7eb] rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#007bff] hover:text-white hover:border-[#007bff] max-[768px]:w-full max-[768px]:justify-center"
      >
        게시글 이동
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default ApprovalItem;