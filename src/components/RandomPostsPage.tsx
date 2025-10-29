import { useState, useEffect } from "react";
import { Shuffle, RefreshCw } from "lucide-react";
import { BlogPost } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface RandomPostsPageProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

export function RandomPostsPage({
  posts,
  onPostClick,
  onAuthorClick,
}: RandomPostsPageProps) {
  const [randomPosts, setRandomPosts] = useState<BlogPost[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const shufflePosts = () => {
    setIsShuffling(true);
    // Create a copy of posts array and shuffle it
    const shuffled = [...posts]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10); // Show 10 random posts
    
    setTimeout(() => {
      setRandomPosts(shuffled);
      setIsShuffling(false);
    }, 300); // Small delay for animation effect
  };

  useEffect(() => {
    // Initialize with random posts on mount
    shufflePosts();
  }, []);

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="p-6" style={{ background: 'linear-gradient(to bottom right, rgba(253, 145, 81, 0.3), rgba(147, 51, 234, 0.3))', color: 'var(--pampas)' }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Shuffle className="h-8 w-8" />
            <h1 style={{ color: 'var(--pampas)' }}>Random Posts</h1>
          </div>
          <Button
            onClick={shufflePosts}
            variant="outline"
            size="sm"
            disabled={isShuffling}
            className="border-2"
            style={{ 
              borderColor: 'var(--header-bg)', 
              color: 'var(--header-bg)',
              backgroundColor: 'transparent'
            }}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isShuffling ? 'animate-spin' : ''}`} />
            Shuffle
          </Button>
        </div>
        <p style={{ color: 'var(--swirl)' }}>
          Discover something new! Tap shuffle to get a fresh set of random posts
        </p>
      </div>

      {/* Random Posts Counter */}
      <div className="p-4 flex items-center justify-between border-b" style={{ backgroundColor: 'var(--content-bg)', borderColor: 'var(--tundora)' }}>
        <div className="flex items-center gap-2">
          <Shuffle className="h-5 w-5" style={{ color: 'var(--header-bg)' }} />
          <span style={{ color: 'var(--pampas)' }}>Showing {randomPosts.length} random posts</span>
        </div>
        <Badge style={{ backgroundColor: 'var(--header-bg)', color: 'white' }}>
          {posts.length} Total
        </Badge>
      </div>

      {/* Posts List */}
      <div 
        className={`divide-y transition-opacity duration-300 ${isShuffling ? 'opacity-50' : 'opacity-100'}`} 
        style={{ borderColor: 'var(--tundora)' }}
      >
        {randomPosts.map((post) => (
          <MobilePostCard
            key={post.id}
            post={post}
            onClick={() => onPostClick(post.id)}
            onAuthorClick={onAuthorClick}
          />
        ))}
      </div>

      {/* Info Card */}
      <div className="p-4">
        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--thunder)', borderColor: 'var(--tundora)' }}>
          <h4 className="mb-2 flex items-center gap-2" style={{ color: 'var(--pampas)' }}>
            <Shuffle className="h-5 w-5" style={{ color: 'var(--header-bg)' }} />
            About Random Posts
          </h4>
          <p className="text-sm" style={{ color: 'var(--cotton-seed)' }}>
            Every time you shuffle, you'll get a completely random selection of posts from our entire collection. 
            It's a great way to discover articles you might have missed!
          </p>
        </div>
      </div>
    </div>
  );
}
