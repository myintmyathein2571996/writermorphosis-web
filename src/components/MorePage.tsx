import { 
  User, 
  Settings, 
  BookmarkCheck, 
  History, 
  Trophy, 
  Info, 
  LogIn, 
  UserPlus,
  Calendar,
  ChevronRight
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MorePageProps {
  isLoggedIn: boolean;
  currentUser?: {
    name: string;
    email: string;
    avatar: string;
  };
  onNavigate: (page: string) => void;
}

export function MorePage({ isLoggedIn, currentUser, onNavigate }: MorePageProps) {
  const loggedInMenuItems = [
    {
      icon: User,
      label: "Profile",
      page: "profile",
      description: "View and edit your profile",
    },
    {
      icon: BookmarkCheck,
      label: "Saved Articles",
      page: "saved",
      description: "Your bookmarked content",
    },
    {
      icon: History,
      label: "Reading History",
      page: "reading-history",
      description: "Articles you've read",
    },
    {
      icon: Trophy,
      label: "Quiz",
      page: "quiz",
      description: "Test your knowledge",
    },
    {
      icon: Settings,
      label: "Settings",
      page: "settings",
      description: "App preferences",
    },
  ];

  const publicMenuItems = [
    {
      icon: Calendar,
      label: "This Day in History",
      page: "history",
      description: "Historical events",
    },
    {
      icon: Info,
      label: "About",
      page: "about",
      description: "Learn more about us",
    },
  ];

  const authMenuItems = [
    {
      icon: LogIn,
      label: "Login",
      page: "login",
      description: "Sign in to your account",
    },
    {
      icon: UserPlus,
      label: "Register",
      page: "register",
      description: "Create a new account",
    },
  ];

  return (
    <div className="pb-20" style={{ backgroundColor: 'var(--content-bg)', minHeight: '100vh' }}>
      {/* User Section */}
      {isLoggedIn && currentUser ? (
        <div 
          className="p-6 border-b"
          style={{ 
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-soft)'
          }}
        >
          <button
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-4 w-full"
          >
            <ImageWithFallback
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-16 w-16 rounded-full border-2"
              style={{ borderColor: 'var(--accent-orange-warm)' }}
            />
            <div className="flex-1 text-left">
              <h2 className="mb-1" style={{ color: 'var(--text-primary)' }}>
                {currentUser.name}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {currentUser.email}
              </p>
            </div>
            <ChevronRight className="h-5 w-5" style={{ color: 'var(--cotton-seed)' }} />
          </button>
        </div>
      ) : (
        <div 
          className="p-6 border-b text-center"
          style={{ 
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-soft)'
          }}
        >
          <User className="h-16 w-16 mx-auto mb-3" style={{ color: 'var(--cotton-seed)' }} />
          <h2 className="mb-2" style={{ color: 'var(--text-primary)' }}>
            Welcome to WriteMorphosis
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Sign in to access all features
          </p>
        </div>
      )}

      {/* Menu Items */}
      <div className="p-4">
        {/* Logged In User Menu */}
        {isLoggedIn && (
          <div className="mb-6">
            <h3 className="px-4 py-2 text-sm" style={{ color: 'var(--cotton-seed)' }}>
              MY ACCOUNT
            </h3>
            <div 
              className="rounded-lg overflow-hidden border"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-soft)'
              }}
            >
              {loggedInMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className="w-full flex items-center gap-4 p-4 transition-colors border-b last:border-b-0 hover:opacity-80"
                    style={{ borderColor: 'var(--border-soft)' }}
                  >
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(210, 136, 74, 0.1)' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: 'var(--accent-orange-warm)' }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {item.label}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5" style={{ color: 'var(--cotton-seed)' }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Public Menu Items */}
        <div className="mb-6">
          <h3 className="px-4 py-2 text-sm" style={{ color: 'var(--cotton-seed)' }}>
            EXPLORE
          </h3>
          <div 
            className="rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-soft)'
            }}
          >
            {publicMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="w-full flex items-center gap-4 p-4 transition-colors border-b last:border-b-0 hover:opacity-80"
                  style={{ borderColor: 'var(--border-soft)' }}
                >
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'rgba(210, 136, 74, 0.1)' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: 'var(--accent-orange-warm)' }} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="mb-0.5" style={{ color: 'var(--text-primary)' }}>
                      {item.label}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5" style={{ color: 'var(--cotton-seed)' }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Auth Menu Items (only if not logged in) */}
        {!isLoggedIn && (
          <div className="mb-6">
            <h3 className="px-4 py-2 text-sm" style={{ color: 'var(--cotton-seed)' }}>
              GET STARTED
            </h3>
            <div 
              className="rounded-lg overflow-hidden border"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-soft)'
              }}
            >
              {authMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className="w-full flex items-center gap-4 p-4 transition-colors border-b last:border-b-0 hover:opacity-80"
                    style={{ borderColor: 'var(--border-soft)' }}
                  >
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: 'rgba(210, 136, 74, 0.1)' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: 'var(--accent-orange-warm)' }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="mb-0.5" style={{ color: 'var(--text-primary)' }}>
                        {item.label}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5" style={{ color: 'var(--cotton-seed)' }} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* App Info */}
        <div className="px-4 py-6 text-center">
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
            WriteMorphosis v1.0.0
          </p>
          <p className="text-xs" style={{ color: 'var(--cotton-seed)' }}>
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
