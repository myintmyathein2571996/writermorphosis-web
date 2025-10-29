import { Folder } from "lucide-react";
import { BlogPost, Category } from "../types/blog";
import { PostCard } from "./PostCard";
import { Badge } from "./ui/badge";

interface CategoryPageProps {
  category?: Category;
  posts: BlogPost[];
  allCategories: Category[];
  onPostClick: (postId: string) => void;
  onCategoryClick: (categorySlug: string) => void;
}

export function CategoryPage({
  category,
  posts,
  allCategories,
  onPostClick,
  onCategoryClick,
}: CategoryPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Folder className="h-8 w-8" />
          <h1>
            {category ? category.name : "All Categories"}
          </h1>
        </div>
        <p className="text-gray-600">
          {category
            ? `Browse ${category.count} posts in ${category.name}`
            : "Explore posts organized by category"}
        </p>
      </div>

      {/* All Categories Grid */}
      {!category && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {allCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategoryClick(cat.slug)}
              className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3>{cat.name}</h3>
                <Folder className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-600">{cat.count} posts</p>
            </div>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {category && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {category && posts.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="mb-2">No posts found</h3>
          <p className="text-gray-600">
            There are no posts in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
