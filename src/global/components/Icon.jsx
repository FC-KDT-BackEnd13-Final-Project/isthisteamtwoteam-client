// Icon.jsx
import {
  LayoutDashboard,
  FileText,
  Paperclip,
  Users,
  FolderOpen,
  Settings,
  LogOut,
  User,
  Search,
  Bell,
  Clock,
  CheckSquare,
  History,
  Plus,
  Send,
  Inbox,
  Download,
  Eye,
  Calendar,
} from "lucide-react";

const ICON_MAP = {
  "layout-dashboard": LayoutDashboard,
  "file-text": FileText,
  paperclip: Paperclip,
  "paper-clip": Paperclip,
  users: Users,
  "folder-open": FolderOpen,
  settings: Settings,
  "log-out": LogOut,
  user: User,
  search: Search,
  bell: Bell,
  clock: Clock,
  "check-square": CheckSquare,
  history: History,
  plus: Plus,
  send: Send,
  inbox: Inbox,
  download: Download,
  eye: Eye,
  calendar: Calendar,
};

export default function Icon({ name, size = 20, className = "" }) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return <span style={{ fontSize: size }}>⬜</span>;
  }

  return <IconComponent size={size} className={className} />;
}
