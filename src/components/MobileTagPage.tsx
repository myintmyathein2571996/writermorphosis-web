import { useState } from "react";
import { Tag as TagIcon, Hash, Search, TrendingUp, Sparkles } from "lucide-react";
import { BlogPost, Tag } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

interface MobileTagPageProps {
  tag?: Tag;
  posts: BlogPost[];
  allTags: Tag[];
  onPostClick: (postId: string) => void;
  onTagClick: (tagSlug: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

export function MobileTagPage({
  tag,
  posts,
  allTags,
  onPostClick,
  onTagClick,
  onAuthorClick,
}: MobileTagPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tags by search query
  const filteredTags = allTags.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort tags - popular first
  const sortedTags = [...filteredTags].sort((a, b) => b.count - a.count);

  // Get popular tags (top 3)
  const popularTags = sortedTags.slice(0, 3);

  return (
    <div className="pb-16">
      {/* All Tags Cloud */}
      {!tag && (
        <>
          {/* Header Section */}
          <div 
            className="p-6 space-y-4"
            style={{ 
              background: 'linear-gradient(135deg, rgba(139, 111, 61, 0.3), rgba(210, 136, 74, 0.3))',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: 'var(--accent-orange-warm)' }}
              >
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 style={{ color: 'var(--text-primary)' }}>Explore Tags</h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Discover articles by topic
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                style={{ color: 'var(--text-muted)' }}
              />
              <Input
                type="text"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0"
                style={{ 
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          {/* Popular Tags Section */}
          {!searchQuery && popularTags.length > 0 && (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5" style={{ color: 'var(--accent-orange-warm)' }} />
                <h3 style={{ color: 'var(--text-primary)' }}>Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {popularTags.map((t, index) => (
                  <Card
                    key={t.id}
                    className="cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-soft)'
                    }}
                    onClick={() => onTagClick(t.slug)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="flex items-center justify-center w-10 h-10 rounded-lg"
                            style={{ 
                              backgroundColor: index === 0 
                                ? 'rgba(210, 136, 74, 0.2)'
                                : index === 1
                                ? 'rgba(139, 111, 61, 0.2)'
                                : 'rgba(74, 58, 50, 0.2)'
                            }}
                          >
                            <span 
                              className="font-semibold"
                              style={{ 
                                color: index === 0 
                                  ? 'var(--accent-orange-warm)'
                                  : 'var(--accent-leaf)'
                              }}
                            >
                              #{index + 1}
                            </span>
                          </div>
                          <div>
                            <h4 style={{ color: 'var(--text-primary)' }}>
                              {t.name}
                            </h4>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                              {t.count} {t.count === 1 ? 'article' : 'articles'}
                            </p>
                          </div>
                        </div>
                        {index === 0 && (
                          <Sparkles className="h-5 w-5" style={{ color: 'var(--accent-orange-warm)' }} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Tags Cloud */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <TagIcon className="h-5 w-5" style={{ color: 'var(--accent-leaf)' }} />
              <h3 style={{ color: 'var(--text-primary)' }}>
                {searchQuery ? 'Search Results' : 'All Tags'}
              </h3>
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                ({filteredTags.length})
              </span>
            </div>

            {filteredTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {sortedTags.map((t) => {
                  // Calculate tag size based on count
                  const maxCount = Math.max(...allTags.map(tag => tag.count));
                  const minCount = Math.min(...allTags.map(tag => tag.count));
                  const scale = (t.count - minCount) / (maxCount - minCount);
                  const fontSize = 14 + scale * 6; // 14px to 20px

                  return (
                    <Badge
                      key={t.id}
                      variant="outline"
                      className="cursor-pointer hover:scale-105 active:scale-95 transition-all px-3 py-2"
                      style={{ 
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-soft)',
                        color: 'var(--text-primary)',
                        fontSize: `${fontSize}px`,
                      }}
                      onClick={() => onTagClick(t.slug)}
                    >
                      #{t.name} <span className="ml-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {t.count}
                      </span>
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <TagIcon className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--border-soft)' }} />
                <p style={{ color: 'var(--text-muted)' }}>No tags found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Tag Posts */}
      {tag && posts.length > 0 && (
        <>
          {/* Tag Header */}
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
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 style={{ color: 'var(--text-primary)' }}>#{tag.name}</h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {tag.count} {tag.count === 1 ? 'article' : 'articles'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {posts.map((post) => (
              <MobilePostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post.id)}
                onAuthorClick={onAuthorClick}
                variant="tag"
              />
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {tag && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <TagIcon className="h-16 w-16 mb-4" style={{ color: 'var(--border-soft)' }} />
          <h3 className="mb-2" style={{ color: 'var(--text-primary)' }}>No articles found</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            There are no articles with this tag yet.
          </p>
        </div>
      )}
    </div>
  );
}
