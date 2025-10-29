import { Folder } from "lucide-react";
import { BlogPost, Category } from "../types/blog";
import { MobilePostCard } from "./MobilePostCard";

interface MobileCategoryPageProps {
  category?: Category;
  posts: BlogPost[];
  allCategories: Category[];
  onPostClick: (postId: string) => void;
  onCategoryClick: (categorySlug: string) => void;
  onAuthorClick?: (authorName: string) => void;
}

export function MobileCategoryPage({
  category,
  posts,
  allCategories,
  onPostClick,
  onCategoryClick,
  onAuthorClick,
}: MobileCategoryPageProps) {
  return (
    <div className="pb-16">
      {/* All Categories */}
      {!category && (
        <div className="p-4 space-y-3">
          {allCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategoryClick(cat.slug)}
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer active:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--thunder)', borderColor: 'var(--tundora)' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--tundora)' }}>
                  <Folder className="h-5 w-5" style={{ color: 'var(--pampas)' }} />
                </div>
                <div>
                  <h3 className="text-base" style={{ color: 'var(--pampas)' }}>{cat.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--cotton-seed)' }}>
                    {cat.count} articles
                  </p>
                </div>
              </div>
              <div className="text-2xl" style={{ color: 'var(--cotton-seed)' }}>›</div>
            </div>
          ))}
        </div>
      )}

      {/* Category Posts */}
      {category && posts.length > 0 && (
        <div className="p-4 space-y-3">
          {posts.map((post) => (
            <MobilePostCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.id)}
              onAuthorClick={onAuthorClick}
              variant="category"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {category && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Folder className="h-16 w-16 mb-4" style={{ color: 'var(--tundora)' }} />
          <h3 className="mb-2" style={{ color: 'var(--pampas)' }}>No articles found</h3>
          <p className="text-sm" style={{ color: 'var(--cotton-seed)' }}>
            There are no articles in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}
