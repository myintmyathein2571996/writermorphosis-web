import { Bell, Heart, MessageCircle, UserPlus, FileText } from "lucide-react";
import { Notification } from "../types/blog";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NotificationsPageProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

export function NotificationsPage({
  notifications,
  onNotificationClick,
}: NotificationsPageProps) {
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-5 w-5 text-green-500" />;
      case "post":
        return <FileText className="h-5 w-5 text-purple-500" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="pb-16">
      {/* Header Stats */}
      <div className="sticky top-14 z-30 border-b p-4" style={{ backgroundColor: 'var(--content-bg)', borderColor: 'var(--tundora)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" style={{ color: 'var(--pampas)' }} />
            <h2 style={{ color: 'var(--pampas)' }}>Notifications</h2>
          </div>
          {unreadCount > 0 && (
            <Badge variant="default" className="rounded-full">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y" style={{ borderColor: 'var(--tundora)' }}>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Bell className="h-16 w-16 mb-4" style={{ color: 'var(--tundora)' }} />
            <h3 className="mb-2" style={{ color: 'var(--pampas)' }}>No notifications yet</h3>
            <p className="text-sm" style={{ color: 'var(--cotton-seed)' }}>
              We'll notify you when something interesting happens
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => onNotificationClick(notification)}
              className="flex gap-3 p-4 cursor-pointer transition-colors"
              style={{
                backgroundColor: !notification.read ? 'rgba(99, 102, 241, 0.1)' : 'var(--thunder)'
              }}
            >
              <div className="flex-shrink-0">
                {notification.image ? (
                  <div className="relative">
                    <ImageWithFallback
                      src={notification.image}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 rounded-full p-1" style={{ backgroundColor: 'var(--thunder)' }}>
                      {getIcon(notification.type)}
                    </div>
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--tundora)' }}>
                    {getIcon(notification.type)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm mb-1" style={{ color: 'var(--pampas)' }}>
                  {notification.message}
                </p>
                <p className="text-xs" style={{ color: 'var(--cotton-seed)' }}>
                  {formatTime(notification.timestamp)}
                </p>
              </div>

              {!notification.read && (
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--header-bg)' }}></div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Mark all as read */}
      {unreadCount > 0 && (
        <div className="p-4">
          <button className="w-full py-3 text-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}
