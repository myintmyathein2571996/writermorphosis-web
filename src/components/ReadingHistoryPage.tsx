import { Eye, Clock } from "lucide-react";
import { BlogPost } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";
import { Card, CardContent } from "./ui/card";

interface ReadingHistoryPageProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

export function ReadingHistoryPage({
  posts,
  onPostClick,
  onAuthorClick,
}: ReadingHistoryPageProps) {
  // Group posts by date (for demo, we'll just show recent)
  const recentlyRead = posts.slice(0, 5);
  const olderPosts = posts.slice(5);

  return (
    <div className="pb-16" style={{ backgroundColor: 'var(--content-bg)' }}>
      {/* Header */}
      <div 
        className="p-6"
        style={{ 
          background: 'linear-gradient(135deg, rgba(139, 111, 61, 0.3), rgba(210, 136, 74, 0.3))',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="p-3 rounded-xl"
            style={{ backgroundColor: 'var(--accent-leaf)' }}
          >
            <Eye className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 style={{ color: 'var(--text-primary)' }}>Reading History</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} read
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      {posts.length > 0 && (
        <div className="p-4">
          <Card 
            className="border-0"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                    Total Reading Time
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" style={{ color: 'var(--accent-orange-warm)' }} />
                    <span className="text-xl" style={{ color: 'var(--text-primary)' }}>
                      {posts.length * 6} min
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                    Articles Read
                  </p>
                  <span className="text-xl" style={{ color: 'var(--accent-orange-warm)' }}>
                    {posts.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-6">
          {/* Recently Read */}
          {recentlyRead.length > 0 && (
            <div>
              <div className="px-4 mb-3">
                <h3 style={{ color: 'var(--text-primary)' }}>Recently Read</h3>
              </div>
              <div className="px-4 space-y-4">
                {recentlyRead.map((post) => (
                  <MobilePostCard
                    key={post.id}
                    post={post}
                    onClick={() => onPostClick(post.id)}
                    onAuthorClick={onAuthorClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Older Posts */}
          {olderPosts.length > 0 && (
            <div>
              <div className="px-4 mb-3">
                <h3 style={{ color: 'var(--text-primary)' }}>Earlier</h3>
              </div>
              <div className="px-4 space-y-4">
                {olderPosts.map((post) => (
                  <MobilePostCard
                    key={post.id}
                    post={post}
                    onClick={() => onPostClick(post.id)}
                    onAuthorClick={onAuthorClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Eye className="h-16 w-16 mb-4" style={{ color: 'var(--border-soft)' }} />
          <h3 className="mb-2" style={{ color: 'var(--text-primary)' }}>No reading history</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Your reading history will appear here
          </p>
        </div>
      )}
    </div>
  );
}
