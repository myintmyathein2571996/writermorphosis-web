import { Settings, BookMarked, Eye, Calendar, Edit, LogOut, Brain, ChevronRight, User, Shield, Bell, HelpCircle } from "lucide-react";
import { User as UserType, BlogPost } from "../types/blog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProfilePageProps {
  user: UserType;
  savedPosts: BlogPost[];
  readingHistory: BlogPost[];
  onPostClick: (postId: string) => void;
  onLogout: () => void;
  onEditProfile: () => void;
  onSettingsClick?: () => void;
  onHistoryClick?: () => void;
  onQuizClick?: () => void;
  onNotificationsClick?: () => void;
  onSavedClick?: () => void;
  onReadingHistoryClick?: () => void;
  onAuthorClick?: (authorName: string) => void;
}

export function ProfilePage({
  user,
  savedPosts,
  readingHistory,
  onPostClick,
  onLogout,
  onEditProfile,
  onSettingsClick,
  onHistoryClick,
  onQuizClick,
  onNotificationsClick,
  onSavedClick,
  onReadingHistoryClick,
  onAuthorClick,
}: ProfilePageProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const menuItems = [
    {
      icon: BookMarked,
      label: "Saved Articles",
      description: `${savedPosts.length} saved`,
      onClick: onSavedClick,
      color: "var(--accent-orange-warm)",
    },
    {
      icon: Eye,
      label: "Reading History",
      description: `${readingHistory.length} articles read`,
      onClick: onReadingHistoryClick,
      color: "var(--accent-leaf)",
    },
    {
      icon: Brain,
      label: "Writing Quizzes",
      description: "Test your knowledge",
      onClick: onQuizClick,
      color: "var(--accent-orange-warm)",
    },
    {
      icon: Calendar,
      label: "This Day in History",
      description: "Historical events",
      onClick: onHistoryClick,
      color: "var(--accent-leaf)",
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage your alerts",
      onClick: onNotificationsClick,
      color: "var(--accent-orange-warm)",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Preferences & privacy",
      onClick: onSettingsClick,
      color: "var(--accent-leaf)",
    },
  ];

  return (
    <div className="pb-16" style={{ backgroundColor: 'var(--content-bg)' }}>
      {/* Profile Header with Image and About */}
      <div 
        className="p-6 pb-8" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(139, 111, 61, 0.3), rgba(210, 136, 74, 0.3))',
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full border-4 object-cover"
                style={{ borderColor: 'var(--accent-orange-warm)' }}
              />
              <div 
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-4 flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--accent-orange-warm)',
                  borderColor: 'var(--content-bg)'
                }}
              >
                <User className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="mb-1" style={{ color: 'var(--text-primary)' }}>
                {user.name}
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {user.email}
              </p>
              <div className="flex items-center gap-2 text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                <Calendar className="h-3 w-3" />
                <span>Joined {formatDate(user.joinedDate)}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onEditProfile} 
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <Edit className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
          </button>
        </div>

        {/* About Section */}
        {user.bio && (
          <Card 
            className="mb-4 border-0"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <CardContent className="p-4">
              <h3 className="mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <User className="h-4 w-4" style={{ color: 'var(--accent-orange-warm)' }} />
                About
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {user.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card 
            className="border-0"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1" style={{ color: 'var(--accent-orange-warm)' }}>
                {user.postsRead}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Read
              </p>
            </CardContent>
          </Card>
          <Card 
            className="border-0"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1" style={{ color: 'var(--accent-orange-warm)' }}>
                {user.savedPosts.length}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Saved
              </p>
            </CardContent>
          </Card>
          <Card 
            className="border-0"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1" style={{ color: 'var(--accent-orange-warm)' }}>
                {user.following.length}
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Following
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Menu Section */}
      <div className="p-4 space-y-2">
        <h2 className="mb-4 px-2" style={{ color: 'var(--text-primary)' }}>
          Quick Access
        </h2>
        
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] border-0"
              style={{ backgroundColor: 'var(--bg-card)' }}
              onClick={item.onClick}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ 
                        backgroundColor: `${item.color}20`,
                      }}
                    >
                      <Icon 
                        className="h-5 w-5" 
                        style={{ color: item.color }}
                      />
                    </div>
                    <div>
                      <h3 
                        className="mb-0.5"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.label}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight 
                    className="h-5 w-5" 
                    style={{ color: 'var(--text-muted)' }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Separator className="my-4" style={{ backgroundColor: 'var(--border-soft)' }} />

        {/* Help & Support */}
        <Card
          className="cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] border-0"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-xl"
                  style={{ 
                    backgroundColor: 'rgba(139, 111, 61, 0.2)',
                  }}
                >
                  <HelpCircle 
                    className="h-5 w-5" 
                    style={{ color: 'var(--accent-leaf)' }}
                  />
                </div>
                <div>
                  <h3 
                    className="mb-0.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Help & Support
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Get assistance
                  </p>
                </div>
              </div>
              <ChevronRight 
                className="h-5 w-5" 
                style={{ color: 'var(--text-muted)' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card
          className="cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] border-0 mt-4"
          style={{ 
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            borderColor: 'rgba(220, 38, 38, 0.2)'
          }}
          onClick={onLogout}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-xl"
                  style={{ 
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                  }}
                >
                  <LogOut 
                    className="h-5 w-5" 
                    style={{ color: '#dc2626' }}
                  />
                </div>
                <div>
                  <h3 
                    className="mb-0"
                    style={{ color: '#dc2626' }}
                  >
                    Logout
                  </h3>
                </div>
              </div>
              <ChevronRight 
                className="h-5 w-5" 
                style={{ color: '#dc2626' }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
