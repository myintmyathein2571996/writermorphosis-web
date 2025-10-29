import { useState } from "react";
import { Tag as TagIcon, Hash, Search, TrendingUp, Sparkles } from "lucide-react";
import { BlogPost, Tag } from "../types/blog";
import { PostCard } from "./PostCard";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

interface TagPageProps {
  tag?: Tag;
  posts: BlogPost[];
  allTags: Tag[];
  onPostClick: (postId: string) => void;
  onTagClick: (tagSlug: string) => void;
}

export function TagPage({
  tag,
  posts,
  allTags,
  onPostClick,
  onTagClick,
}: TagPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tags by search query
  const filteredTags = allTags.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort tags - popular first
  const sortedTags = [...filteredTags].sort((a, b) => b.count - a.count);

  // Get popular tags (top 6 for desktop)
  const popularTags = sortedTags.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* All Tags View */}
      {!tag && (
        <>
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Hash className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1>Explore Tags</h1>
                <p className="text-gray-600">
                  Discover articles by topic
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Popular Tags Section */}
          {!searchQuery && popularTags.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-purple-600" />
                <h2>Trending Topics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularTags.map((t, index) => (
                  <Card
                    key={t.id}
                    className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
                    onClick={() => onTagClick(t.slug)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                              index === 0 
                                ? 'bg-purple-100'
                                : index === 1
                                ? 'bg-blue-100'
                                : 'bg-gray-100'
                            }`}
                          >
                            <span 
                              className={`font-bold text-lg ${
                                index === 0 
                                  ? 'text-purple-600'
                                  : index === 1
                                  ? 'text-blue-600'
                                  : 'text-gray-600'
                              }`}
                            >
                              #{index + 1}
                            </span>
                          </div>
                          <div>
                            <h3 className="mb-1">{t.name}</h3>
                            <p className="text-sm text-gray-600">
                              {t.count} {t.count === 1 ? 'article' : 'articles'}
                            </p>
                          </div>
                        </div>
                        {index === 0 && (
                          <Sparkles className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Tags Cloud */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TagIcon className="h-6 w-6 text-gray-600" />
              <h2>
                {searchQuery ? 'Search Results' : 'All Tags'}
              </h2>
              <span className="text-sm text-gray-500">
                ({filteredTags.length})
              </span>
            </div>

            {filteredTags.length > 0 ? (
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex flex-wrap gap-3">
                  {sortedTags.map((t) => {
                    // Calculate tag size based on count
                    const maxCount = Math.max(...allTags.map(tag => tag.count));
                    const minCount = Math.min(...allTags.map(tag => tag.count));
                    const scale = (t.count - minCount) / (maxCount - minCount);
                    const fontSize = 14 + scale * 8; // 14px to 22px

                    return (
                      <Badge
                        key={t.id}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100 transition-all px-4 py-2"
                        style={{ fontSize: `${fontSize}px` }}
                        onClick={() => onTagClick(t.slug)}
                      >
                        #{t.name} <span className="ml-2 text-sm text-gray-500">
                          {t.count}
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <TagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No tags found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Single Tag View */}
      {tag && (
        <>
          {/* Tag Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Hash className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1>#{tag.name}</h1>
                <p className="text-gray-600">
                  {tag.count} {tag.count === 1 ? 'article' : 'articles'}
                </p>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => onPostClick(post.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <TagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="mb-2">No posts found</h3>
              <p className="text-gray-600">
                There are no posts with this tag yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
