import { TrendingUp, Folder, Tag } from "lucide-react";
import { BlogPost, Category, Tag as TagType } from "../types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SidebarProps {
  popularPosts: BlogPost[];
  categories: Category[];
  tags: TagType[];
  onPostClick: (postId: string) => void;
  onCategoryClick: (categorySlug: string) => void;
  onTagClick: (tagSlug: string) => void;
}

export function Sidebar({
  popularPosts,
  categories,
  tags,
  onPostClick,
  onCategoryClick,
  onTagClick,
}: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post, index) => (
            <div key={post.id}>
              <div
                className="flex gap-3 cursor-pointer group"
                onClick={() => onPostClick(post.id)}
              >
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-20 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-sm mb-1 line-clamp-2 group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500">{post.readTime}</p>
                </div>
              </div>
              {index < popularPosts.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.slug)}
                className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-sm">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onTagClick(tag.slug)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
