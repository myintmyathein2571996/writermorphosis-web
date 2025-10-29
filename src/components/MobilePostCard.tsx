import { Calendar, Clock, Eye, Bookmark, Tag as TagIcon } from "lucide-react";
import { BlogPost } from "../types/blog";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MobilePostCardProps {
  post: BlogPost;
  onClick: () => void;
  onAuthorClick?: (authorName: string) => void;
  featured?: boolean;
  variant?: "default" | "category" | "tag" | "author";
}

export function MobilePostCard({ 
  post, 
  onClick, 
  onAuthorClick, 
  featured = false,
  variant = "default"
}: MobilePostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Category Page Card Design
  if (variant === "category") {
    return (
      <div className="rounded-xl overflow-hidden shadow-sm border-l-4" style={{ backgroundColor: 'var(--thunder)', borderColor: '#9333ea' }}>
        <div className="flex gap-3 p-3">
          {/* Thumbnail */}
          <div
            className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer active:opacity-90 transition-opacity"
            onClick={onClick}
          >
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1.5 right-1.5">
              <button className="p-1.5 rounded-full" style={{ backgroundColor: 'rgba(46, 42, 43, 0.9)' }}>
                <Bookmark className="h-3 w-3" style={{ color: 'var(--pampas)' }} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="cursor-pointer flex-1" onClick={onClick}>
              <h3 className="text-base mb-1 line-clamp-2" style={{ color: 'var(--pampas)' }}>
                {post.title}
              </h3>
              <p className="text-xs mb-2 line-clamp-2" style={{ color: 'var(--cotton-seed)' }}>{post.excerpt}</p>
            </div>

            <div className="flex items-center justify-between text-xs mt-auto" style={{ color: 'var(--cotton-seed)' }}>
              <div className="flex items-center gap-2">
                {onAuthorClick ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAuthorClick(post.author.name);
                    }}
                    className="flex items-center gap-1 transition-colors hover:opacity-80"
                  >
                    <ImageWithFallback
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-4 w-4 rounded-full"
                    />
                    <span className="text-xs">{post.author.name}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    <ImageWithFallback
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-4 w-4 rounded-full"
                    />
                    <span className="text-xs">{post.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tag Page Card Design
  if (variant === "tag") {
    return (
      <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))' }}>
        <div
          className="relative h-40 overflow-hidden cursor-pointer active:opacity-90 transition-opacity"
          onClick={onClick}
        >
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="bg-blue-600 p-1 rounded">
                <TagIcon className="h-3 w-3 text-white" />
              </div>
              <Badge className="bg-blue-600 text-white hover:bg-blue-600 text-xs">
                {post.category}
              </Badge>
            </div>
          </div>
          <button className="absolute top-2 right-2 p-1.5 rounded-full" style={{ backgroundColor: 'rgba(46, 42, 43, 0.9)' }}>
            <Bookmark className="h-3.5 w-3.5" style={{ color: 'var(--pampas)' }} />
          </button>
        </div>

        <div className="p-3" style={{ backgroundColor: 'var(--thunder)' }}>
          <div className="cursor-pointer" onClick={onClick}>
            <h3 className="text-base mb-2 line-clamp-2" style={{ color: 'var(--pampas)' }}>
              {post.title}
            </h3>
          </div>

          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--cotton-seed)' }}>
            <div className="flex items-center gap-2">
              {onAuthorClick ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAuthorClick(post.author.name);
                  }}
                  className="flex items-center gap-1 transition-colors hover:opacity-80"
                >
                  <ImageWithFallback
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-4 w-4 rounded-full"
                  />
                  <span>{post.author.name}</span>
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <ImageWithFallback
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-4 w-4 rounded-full"
                  />
                  <span>{post.author.name}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Author Page Card Design
  if (variant === "author") {
    return (
      <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ backgroundColor: 'var(--thunder)' }}>
        <div className="flex gap-4 p-4">
          {/* Thumbnail */}
          <div
            className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer active:opacity-90 transition-opacity"
            onClick={onClick}
          >
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="cursor-pointer flex-1" onClick={onClick}>
              <div className="flex items-start justify-between mb-2">
                <Badge className="text-xs" style={{ backgroundColor: 'rgba(147, 51, 234, 0.2)', color: '#c084fc' }}>
                  {post.category}
                </Badge>
                <button className="p-1">
                  <Bookmark className="h-4 w-4" style={{ color: 'var(--cotton-seed)' }} />
                </button>
              </div>
              <h3 className="text-base mb-2 line-clamp-2" style={{ color: 'var(--pampas)' }}>
                {post.title}
              </h3>
              <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--cotton-seed)' }}>{post.excerpt}</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ color: 'var(--cotton-seed)', borderColor: 'var(--tundora)' }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.publishedDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Card Design (for latest/popular posts)
  return (
    <div className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: 'var(--thunder)' }}>
      <div
        className={`relative ${featured ? "h-56" : "h-48"} overflow-hidden cursor-pointer active:opacity-90 transition-opacity`}
        onClick={onClick}
      >
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="shadow-sm" style={{ backgroundColor: 'var(--header-bg)', color: 'white' }}>
            {post.category}
          </Badge>
        </div>
        <button className="absolute top-3 right-3 p-2 rounded-full" style={{ backgroundColor: 'rgba(46, 42, 43, 0.9)' }}>
          <Bookmark className="h-4 w-4" style={{ color: 'var(--pampas)' }} />
        </button>
      </div>

      <div className="p-4">
        <div className="cursor-pointer" onClick={onClick}>
          <h3 className={`mb-2 line-clamp-2 ${featured ? "" : ""}`} style={{ color: 'var(--pampas)' }}>
            {post.title}
          </h3>
          <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--cotton-seed)' }}>{post.excerpt}</p>
        </div>

        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--cotton-seed)' }}>
          <div className="flex items-center gap-3">
            {onAuthorClick ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAuthorClick(post.author.name);
                }}
                className="flex items-center gap-1.5 transition-colors hover:opacity-80"
              >
                <ImageWithFallback
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-5 w-5 rounded-full"
                />
                <span>{post.author.name}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <ImageWithFallback
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-5 w-5 rounded-full"
                />
                <span>{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
