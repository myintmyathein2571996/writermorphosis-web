import { ArrowLeft, Bell, Search, LogIn } from "lucide-react";
import logo from "figma:asset/38e13cb38fccbae993fc82c55e790581db92e95b.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onSearchClick?: () => void;
  onLoginClick?: () => void;
  userAvatar?: string;
  isLoggedIn?: boolean;
  notificationCount?: number;
}

export function MobileHeader({
  title,
  showBack = false,
  onBack,
  showLogo = false,
  onNotificationsClick,
  onProfileClick,
  onSearchClick,
  onLoginClick,
  userAvatar,
  isLoggedIn = false,
  notificationCount = 0,
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--tundora)' }}>
      <div className="flex items-center justify-between h-14 px-4 text-white">
        {/* Left side - Profile or Back button */}
        <div className="flex items-center gap-3 flex-1">
          {showBack && onBack ? (
            <button onClick={onBack} className="p-1">
              <ArrowLeft className="h-6 w-6" />
            </button>
          ) : isLoggedIn && onProfileClick && userAvatar ? (
            <button onClick={onProfileClick} className="p-1">
              <ImageWithFallback
                src={userAvatar}
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-white/30"
              />
            </button>
          ) : (
            <div className="w-8" /> // Spacer for alignment
          )}
        </div>

        {/* Center - Logo or Title */}
        <div className="flex items-center justify-center flex-1">
          {showLogo ? (
            <img src={logo} alt="WriteMorphosis" className="h-8 w-auto" />
          ) : title ? (
            <h2 className="truncate">{title}</h2>
          ) : null}
        </div>

        {/* Right side - Search, Notifications, Login */}
        <div className="flex items-center justify-end gap-2 flex-1">
          {onSearchClick && (
            <button onClick={onSearchClick} className="p-2">
              <Search className="h-5 w-5" />
            </button>
          )}
          {isLoggedIn && onNotificationsClick && (
            <button onClick={onNotificationsClick} className="p-2 relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          )}
          {!isLoggedIn && onLoginClick && (
            <button onClick={onLoginClick} className="p-2">
              <LogIn className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
