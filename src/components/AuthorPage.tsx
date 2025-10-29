import { User, BookOpen } from "lucide-react";
import { BlogPost } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AuthorPageProps {
  authorName: string;
  authorAvatar: string;
  authorBio?: string;
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
}

export function AuthorPage({
  authorName,
  authorAvatar,
  authorBio,
  posts,
  onPostClick,
}: AuthorPageProps) {
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="pb-16">
      {/* Author Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 pb-8">
        <div className="flex items-start gap-4 mb-4">
          <ImageWithFallback
            src={authorAvatar}
            alt={authorName}
            className="h-20 w-20 rounded-full border-4 border-white/20"
          />
          <div className="flex-1">
            <h1 className="text-white mb-1">{authorName}</h1>
            <p className="text-sm text-purple-100">Author</p>
          </div>
        </div>

        {authorBio && (
          <p className="text-sm text-purple-100 mb-4">{authorBio}</p>
        )}

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl mb-1">{posts.length}</div>
            <p className="text-xs text-purple-100">Articles</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">
              {totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
            </div>
            <p className="text-xs text-purple-100">Total Views</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">
              {totalLikes >= 1000 ? `${(totalLikes / 1000).toFixed(1)}k` : totalLikes}
            </div>
            <p className="text-xs text-purple-100">Total Likes</p>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2>Articles by {authorName}</h2>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-3">
            {posts.map((post) => (
              <MobilePostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post.id)}
                variant="author"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <User className="h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="mb-2">No articles yet</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This author hasn't published any articles yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
