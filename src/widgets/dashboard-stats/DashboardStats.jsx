import StatCard from "../../components/dashboard/StatCard";
import {
  CheckSquareIcon,
  ClockIcon,
  WrenchIcon,
  XCircleIcon,
} from "../../components/dashboard/Icons";

export default function DashboardStats({ activeFilter, onFilterChange }) {
  const stats = [
    {
      id: "pending",
      icon: <ClockIcon />,
      iconColorClass: "bg-[#fff3e6] text-[#ff9500]",
      label: "승인 대기",
      value: "8",
      change: "+2 오늘",
      changeType: "up",
    },
    {
      id: "rejected",
      icon: <XCircleIcon />,
      iconColorClass: "bg-[#ffe6e6] text-[#ff3b30]",
      label: "반려",
      value: "3",
      change: "+1 오늘",
      changeType: "up",
    },
    {
      id: "progress",
      icon: <CheckSquareIcon />,
      iconColorClass: "bg-[#e8f4ff] text-[#007bff]",
      label: "진행중",
      value: "18",
      change: "+3 이번 주",
      changeType: "up",
    },
    {
      id: "maintenance",
      icon: <WrenchIcon />,
      iconColorClass: "bg-[#e6f7f1] text-[#00c48c]",
      label: "유지보수 단계",
      value: "15",
      change: "-2 이번 달",
      changeType: "down",
    },
  ];

  return (
    <div className="mb-5 grid grid-cols-4 gap-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          icon={stat.icon}
          iconColorClass={stat.iconColorClass}
          label={stat.label}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          isActive={activeFilter === stat.id}
          onClick={() => onFilterChange(stat.id, stat.label)}
        />
      ))}
    </div>
  );
}
