import { Calendar, Clock, Eye, Share2, Bookmark, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { BlogPost, Comment } from "../types/blog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CommentsSection } from "./CommentsSection";
import { useState } from "react";

interface MobilePostDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  comments: Comment[];
  onPostClick: (postId: string) => void;
  onCategoryClick: (categorySlug: string) => void;
  onTagClick: (tagSlug: string) => void;
  onAuthorClick?: (authorName: string) => void;
  currentUserAvatar?: string;
}

export function MobilePostDetail({
  post,
  relatedPosts,
  comments,
  onPostClick,
  onCategoryClick,
  onTagClick,
  onAuthorClick,
  currentUserAvatar,
}: MobilePostDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="pb-16">
      {/* Featured Image */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(30, 26, 24, 0.3) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <Badge
          className="mb-3 cursor-pointer border-0"
          style={{ backgroundColor: 'var(--accent-orange-warm)', color: 'white' }}
          onClick={() => onCategoryClick(post.category.toLowerCase().replace(/\s+/g, "-"))}
        >
          {post.category}
        </Badge>

        {/* Title */}
        <h1 className="mb-4" style={{ color: 'var(--text-primary)' }}>{post.title}</h1>

        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onAuthorClick?.(post.author.name)}
            className="flex-shrink-0"
          >
            <ImageWithFallback
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full hover:ring-2 transition-all"
              style={{ borderColor: 'var(--accent-orange-warm)' }}
            />
          </button>
          <div className="flex-1">
            <button
              onClick={() => onAuthorClick?.(post.author.name)}
              className="text-sm hover:opacity-80 transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.author.name}
            </button>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>{formatDate(post.publishedDate)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.commentsCount}</span>
          </div>
        </div>

        <Separator className="my-4" style={{ backgroundColor: 'var(--border-soft)' }} />

        {/* Excerpt */}
        <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setIsLiked(!isLiked)}
            style={{
              backgroundColor: isLiked ? 'rgba(210, 136, 74, 0.1)' : 'transparent',
              borderColor: 'var(--border-soft)',
              color: isLiked ? 'var(--accent-orange-warm)' : 'var(--text-primary)'
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            Like
          </Button>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setIsSaved(!isSaved)}
            style={{
              backgroundColor: isSaved ? 'rgba(210, 136, 74, 0.1)' : 'transparent',
              borderColor: 'var(--border-soft)',
              color: isSaved ? 'var(--accent-orange-warm)' : 'var(--text-primary)'
            }}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            Save
          </Button>
        </div>
      </div>

      {/* Web Content Section */}
      {post.url ? (
        <div className="mx-4 mb-6">
          <div 
            className="rounded-lg overflow-hidden border"
            style={{ 
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-soft)'
            }}
          >
            <div className="p-3 flex items-center justify-between border-b" style={{ borderColor: 'var(--border-soft)' }}>
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" style={{ color: 'var(--accent-orange-warm)' }} />
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Article Content</span>
              </div>
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs hover:opacity-80"
                style={{ color: 'var(--accent-orange-warm)' }}
              >
                Open in new tab
              </a>
            </div>
            <div className="relative" style={{ height: '60vh', minHeight: '400px' }}>
              <iframe
                src={post.url}
                className="w-full h-full"
                style={{ border: 'none' }}
                title={post.title}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
          </div>
        </div>
      ) : (
        // Fallback to text content if no URL provided
        <div className="px-4">
          <div 
            className="prose prose-sm max-w-none mb-6 leading-relaxed space-y-4"
            style={{ color: 'var(--text-muted)' }}
          >
            <p>{post.content}</p>
            <p>
              Writing is a journey of discovery, both for the writer and the
              reader. Every word we choose, every sentence we craft, contributes
              to a larger narrative that has the power to inform, inspire, and
              transform.
            </p>
            <p>
              Whether you're working on your first short story or your tenth
              novel, the principles remain the same: stay true to your voice,
              serve your readers, and never stop learning. The craft of writing
              is one that rewards dedication and persistence.
            </p>
            <p>
              Remember that every great writer started somewhere, and every
              published piece began as a blank page. Your unique perspective and
              experiences are valuable contributions to the literary world.
            </p>
          </div>
        </div>
      )}

      <div className="px-4">
        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-soft)',
                  color: 'var(--text-primary)'
                }}
                onClick={() => onTagClick(tag.toLowerCase().replace(/\s+/g, "-"))}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" style={{ backgroundColor: 'var(--border-soft)' }} />

        <Button 
          variant="default" 
          className="w-full gap-2 border-0"
          style={{ backgroundColor: 'var(--accent-orange-warm)', color: 'white' }}
        >
          <Share2 className="h-4 w-4" />
          Share Article
        </Button>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <>
          <Separator className="my-6" style={{ backgroundColor: 'var(--border-soft)' }} />
          <div className="p-4">
            <h2 className="mb-4" style={{ color: 'var(--text-primary)' }}>Related Articles</h2>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost.id}
                  className="flex gap-3 cursor-pointer active:opacity-80 p-2 -m-2 rounded-lg transition-all"
                  style={{ backgroundColor: 'transparent' }}
                  onClick={() => onPostClick(relatedPost.id)}
                >
                  <ImageWithFallback
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-24 h-24 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Badge 
                      variant="secondary" 
                      className="mb-2 text-xs border-0"
                      style={{ backgroundColor: 'var(--accent-coffee)', color: 'var(--text-primary)' }}
                    >
                      {relatedPost.category}
                    </Badge>
                    <h4 className="line-clamp-2 mb-1 text-sm" style={{ color: 'var(--text-primary)' }}>
                      {relatedPost.title}
                    </h4>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{relatedPost.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Comments Section */}
      <Separator style={{ backgroundColor: 'var(--border-soft)' }} />
      <CommentsSection
        comments={comments}
        currentUserAvatar={currentUserAvatar}
      />
    </div>
  );
}
