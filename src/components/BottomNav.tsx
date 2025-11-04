import { Home, Folder, BookmarkCheck, Calendar, Menu } from "lucide-react";

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { name: "Home", path: "home", icon: Home },
    { name: "Categories", path: "categories", icon: Folder },
    { name: "Tags", path: "tags", icon: BookmarkCheck },
    { name: "History", path: "history", icon: Calendar },
    { name: "More", path: "more", icon: Menu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t safe-area-inset-bottom z-50" style={{ backgroundColor: 'var(--footer-bg)', borderColor: 'var(--tundora)' }}>
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.path || 
            (item.path === "categories" && currentPage === "category") ||
            (item.path === "tags" && currentPage === "tag") ||
            (item.path === "more" && (currentPage === "more" || currentPage === "profile" || currentPage === "settings" || currentPage === "saved" || currentPage === "reading-history" || currentPage === "quiz" || currentPage === "about"));
          
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-white"
                  : "text-[var(--cotton-seed)]"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
