import { useState } from "react";
import { Search, X, TrendingUp, Clock, Filter } from "lucide-react";
import { BlogPost } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface SearchPageProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

type SortOption = "relevance" | "recent" | "popular";

export function SearchPage({ posts, onPostClick, onAuthorClick }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from posts
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  // Search and filter logic
  const searchResults = posts.filter((post) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return false;

    // Search in title, excerpt, content, author, category, and tags
    const matchesTitle = post.title.toLowerCase().includes(query);
    const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
    const matchesAuthor = post.author.name.toLowerCase().includes(query);
    const matchesCategory = post.category.toLowerCase().includes(query);
    const matchesTags = post.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesSearch = matchesTitle || matchesExcerpt || matchesAuthor || matchesCategory || matchesTags;

    // Filter by category if selected
    const matchesCategory2 = !selectedCategory || post.category === selectedCategory;

    return matchesSearch && matchesCategory2;
  });

  // Sort results
  const sortedResults = [...searchResults].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    } else if (sortBy === "popular") {
      return b.views - a.views;
    }
    // Default: relevance (by title match first, then others)
    const aTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const bTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (aTitle && !bTitle) return -1;
    if (!aTitle && bTitle) return 1;
    return 0;
  });

  // Popular searches (mock data - could be from user search history)
  const popularSearches = ["Character Development", "Plot Structure", "Poetry", "Narrative", "Creative Writing"];

  // Recent searches (mock - could be stored in localStorage)
  const recentSearches = ["Writing Tips", "Story Arc", "Dialogue"];

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchClick = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="pb-16">
      {/* Search Input - Sticky */}
      <div className="sticky top-14 z-30 border-b p-4" style={{ backgroundColor: 'var(--content-bg)', borderColor: 'var(--tundora)' }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--cotton-seed)' }} />
          <Input
            type="text"
            placeholder="Search articles, authors, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-11"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-80 rounded-full transition-opacity"
            >
              <X className="h-4 w-4" style={{ color: 'var(--cotton-seed)' }} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        {searchQuery && (
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-2 -mb-2">
            <div className="flex items-center gap-2 text-sm whitespace-nowrap" style={{ color: 'var(--cotton-seed)' }}>
              <Filter className="h-4 w-4" />
              Sort:
            </div>
            <Button
              variant={sortBy === "relevance" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("relevance")}
              className="whitespace-nowrap"
            >
              Relevance
            </Button>
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("recent")}
              className="whitespace-nowrap"
            >
              <Clock className="h-3.5 w-3.5 mr-1" />
              Recent
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("popular")}
              className="whitespace-nowrap"
            >
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              Popular
            </Button>
          </div>
        )}
      </div>

      {/* Search Results or Suggestions */}
      <div className="p-4">
        {!searchQuery ? (
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4" style={{ color: 'var(--cotton-seed)' }} />
                  <h3 className="text-sm" style={{ color: 'var(--pampas)' }}>Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => handleSearchClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4" style={{ color: 'var(--cotton-seed)' }} />
                <h3 className="text-sm" style={{ color: 'var(--pampas)' }}>Popular Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => handleSearchClick(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-4 w-4" style={{ color: 'var(--cotton-seed)' }} />
                <h3 className="text-sm" style={{ color: 'var(--pampas)' }}>Browse by Category</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-500"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearchQuery(category);
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {sortedResults.length === 0 ? (
                  <span>No results found for "{searchQuery}"</span>
                ) : (
                  <span>
                    Found {sortedResults.length} result{sortedResults.length !== 1 ? "s" : ""} for "{searchQuery}"
                  </span>
                )}
              </p>
            </div>

            {/* Category Filter Pills */}
            {selectedCategory && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">Filtered by:</span>
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  {selectedCategory}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </div>
            )}

            {/* Results List */}
            {sortedResults.length > 0 ? (
              <div className="space-y-4">
                {sortedResults.map((post) => (
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
                <Search className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="mb-2">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Try adjusting your search terms or browse popular topics
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularSearches.slice(0, 3).map((search, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleSearchClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
