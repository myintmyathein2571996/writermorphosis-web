import { PostCard } from "./PostCard";
import { Sidebar } from "./Sidebar";
import { BlogPost, Category, Tag } from "../types/blog";

interface HomePageProps {
  latestPosts: BlogPost[];
  popularPosts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  onPostClick: (postId: string) => void;
  onCategoryClick: (categorySlug: string) => void;
  onTagClick: (tagSlug: string) => void;
}

export function HomePage({
  latestPosts,
  popularPosts,
  categories,
  tags,
  onPostClick,
  onCategoryClick,
  onTagClick,
}: HomePageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="mb-4">Latest Posts</h1>
        <p className="text-gray-600">
          Discover insights, tips, and inspiration for your writing journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post.id)}
                featured={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Sidebar
            popularPosts={popularPosts}
            categories={categories}
            tags={tags}
            onPostClick={onPostClick}
            onCategoryClick={onCategoryClick}
            onTagClick={onTagClick}
          />
        </div>
      </div>
    </div>
  );
}
