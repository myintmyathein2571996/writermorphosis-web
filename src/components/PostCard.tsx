import { Calendar, Clock, Eye } from "lucide-react";
import { BlogPost } from "../types/blog";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PostCardProps {
  post: BlogPost;
  onClick: () => void;
  featured?: boolean;
}

export function PostCard({ post, onClick, featured = false }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg group ${
        featured ? "md:col-span-2" : ""
      }`}
      onClick={onClick}
    >
      <div className={`relative ${featured ? "h-96" : "h-48"} overflow-hidden`}>
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-white text-gray-900 hover:bg-white">
            {post.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className={`mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors ${
          featured ? "" : ""
        }`}>
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.views.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex items-center gap-3">
          <ImageWithFallback
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm">{post.author.name}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
