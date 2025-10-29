import { BookMarked } from "lucide-react";
import { BlogPost } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";
import { Button } from "./ui/button";

interface SavedArticlesPageProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

export function SavedArticlesPage({
  posts,
  onPostClick,
  onAuthorClick,
}: SavedArticlesPageProps) {
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
            style={{ backgroundColor: 'var(--accent-orange-warm)' }}
          >
            <BookMarked className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 style={{ color: 'var(--text-primary)' }}>Saved Articles</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} saved
            </p>
          </div>
        </div>
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="p-4 space-y-4">
          {posts.map((post) => (
            <MobilePostCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.id)}
              onAuthorClick={onAuthorClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <BookMarked className="h-16 w-16 mb-4" style={{ color: 'var(--border-soft)' }} />
          <h3 className="mb-2" style={{ color: 'var(--text-primary)' }}>No saved articles</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Save articles to read them later
          </p>
          <Button 
            variant="outline"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'var(--border-soft)',
              color: 'var(--text-primary)'
            }}
          >
            Browse Articles
          </Button>
        </div>
      )}
    </div>
  );
}
