import { useState } from "react";
import { TrendingUp, Sparkles, Quote, CalendarDays, X } from "lucide-react";
import { BlogPost, Category, Tag, DailyQuote } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

interface MobileHomePageProps {
  latestPosts: BlogPost[];
  popularPosts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  dailyQuote: DailyQuote;
  onPostClick: (postId: string) => void;
  onCategoryClick: (categorySlug: string) => void;
  onTagClick: (tagSlug: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

export function MobileHomePage({
  latestPosts,
  popularPosts,
  categories,
  tags,
  dailyQuote,
  onPostClick,
  onCategoryClick,
  onTagClick,
  onAuthorClick,
}: MobileHomePageProps) {
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter posts by date if date filter is active
  const filterPostsByDate = (posts: BlogPost[]) => {
    if (!dateFilter) return posts;
    
    return posts.filter((post) => {
      const postDate = new Date(post.publishedDate);
      const filterDate = new Date(dateFilter);
      
      return (
        postDate.getFullYear() === filterDate.getFullYear() &&
        postDate.getMonth() === filterDate.getMonth() &&
        postDate.getDate() === filterDate.getDate()
      );
    });
  };

  const filteredLatestPosts = filterPostsByDate(latestPosts);
  const filteredPopularPosts = filterPostsByDate(popularPosts);

  const handleClearDateFilter = () => {
    setDateFilter(undefined);
  };

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    onCategoryClick(categorySlug);
  };

  return (
    <div className="pb-16">
      {/* Daily Quote */}
      <div className="p-4" style={{ background: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.1), rgba(99, 102, 241, 0.1))' }}>
        <Card style={{ borderColor: 'rgba(147, 51, 234, 0.3)', backgroundColor: 'var(--thunder)' }}>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Quote className="h-8 w-8 flex-shrink-0" style={{ color: 'var(--header-bg)' }} />
              <div>
                <p className="text-sm italic mb-2" style={{ color: 'var(--pampas)' }}>
                  "{dailyQuote.text}"
                </p>
                <p className="text-xs" style={{ color: 'var(--header-bg)' }}>
                  — {dailyQuote.author}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Filter & Categories */}
      <div className="sticky top-14 z-30 border-b" style={{ backgroundColor: 'var(--content-bg)', borderColor: 'var(--tundora)' }}>
        {/* Date Filter Row */}
        <div className="px-4 py-2 flex items-center gap-2 border-b" style={{ borderColor: 'var(--tundora)' }}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                style={{ 
                  borderColor: dateFilter ? 'var(--header-bg)' : 'var(--tundora)',
                  color: dateFilter ? 'var(--header-bg)' : 'var(--pampas)',
                  backgroundColor: 'transparent'
                }}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                {dateFilter ? dateFilter.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {dateFilter && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleClearDateFilter}
              style={{ color: 'var(--header-bg)' }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {dateFilter && (
            <span className="text-sm ml-auto" style={{ color: 'var(--cotton-seed)' }}>
              {filteredLatestPosts.length + filteredPopularPosts.length} posts
            </span>
          )}
        </div>

        {/* Categories Scroll */}
        <div className="py-3 px-4">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-1">
              <Badge variant="default" className="whitespace-nowrap">
                All
              </Badge>
              {categories.slice(0, 6).map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="whitespace-nowrap cursor-pointer"
                  onClick={() => handleCategorySelect(category.slug)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Tabs for Latest/Popular */}
      <Tabs defaultValue="latest" className="w-full">
        <div className="sticky top-[11.5rem] z-30 border-b" style={{ backgroundColor: 'var(--content-bg)', borderColor: 'var(--tundora)' }}>
          <TabsList className="w-full grid grid-cols-2 rounded-none h-12">
            <TabsTrigger value="latest" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Latest {dateFilter && `(${filteredLatestPosts.length})`}
            </TabsTrigger>
            <TabsTrigger value="popular" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Popular {dateFilter && `(${filteredPopularPosts.length})`}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="latest" className="m-0">
          {filteredLatestPosts.length > 0 ? (
            <div className="divide-y" style={{ borderColor: 'var(--tundora)' }}>
              {filteredLatestPosts.map((post, index) => (
                <MobilePostCard
                  key={post.id}
                  post={post}
                  onClick={() => onPostClick(post.id)}
                  onAuthorClick={onAuthorClick}
                  featured={index === 0 && !dateFilter}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <CalendarDays className="h-16 w-16 mb-4" style={{ color: 'var(--tundora)' }} />
              <h3 className="mb-2" style={{ color: 'var(--pampas)' }}>No posts found</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--cotton-seed)' }}>
                No posts were published on this date
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearDateFilter}
                style={{ 
                  borderColor: 'var(--header-bg)', 
                  color: 'var(--header-bg)'
                }}
              >
                Clear filter
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular" className="m-0">
          {filteredPopularPosts.length > 0 ? (
            <div className="divide-y" style={{ borderColor: 'var(--tundora)' }}>
              {filteredPopularPosts.map((post) => (
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
              <CalendarDays className="h-16 w-16 mb-4" style={{ color: 'var(--tundora)' }} />
              <h3 className="mb-2" style={{ color: 'var(--pampas)' }}>No posts found</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--cotton-seed)' }}>
                No posts were published on this date
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearDateFilter}
                style={{ 
                  borderColor: 'var(--header-bg)', 
                  color: 'var(--header-bg)'
                }}
              >
                Clear filter
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Popular Tags */}
      <div className="p-4" style={{ backgroundColor: 'var(--tundora)' }}>
        <h3 className="mb-3" style={{ color: 'var(--pampas)' }}>Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 8).map((tag) => (
            <Badge
              key={tag.id}
              variant="outline"
              className="cursor-pointer hover:bg-white"
              onClick={() => onTagClick(tag.slug)}
            >
              #{tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
