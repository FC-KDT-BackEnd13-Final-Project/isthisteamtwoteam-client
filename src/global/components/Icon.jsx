const ICON_MAP = {
  "layout-dashboard": "📊",
  "file-text": "📄",
  users: "👥",
  "folder-open": "📂",
  settings: "⚙️",
  "log-out": "⏻",
  user: "👤",
  search: "🔍",
  bell: "🔔",
  clock: "⏲️",
  "check-square": "☑️",
  history: "🕘",
  plus: "＋",
  send: "➤",
  inbox: "📥",
  download: "⬇️",
  eye: "👁️",
  calendar: "📅",
};

export default function Icon({ name, size = 20 }) {
  const symbol = ICON_MAP[name] || "⬜";
  return (
    <span
      className="inline-flex items-center justify-center leading-none"
      style={{ fontSize: size }}
      aria-hidden
    >
      {symbol}
    </span>
  );
}
