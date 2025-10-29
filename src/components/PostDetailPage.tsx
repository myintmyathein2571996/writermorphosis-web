import { ArrowLeft, Calendar, Clock, Eye, Share2, Bookmark, ExternalLink } from "lucide-react";
import { BlogPost, Category, Tag } from "../types/blog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PostDetailPageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  onBack: () => void;
  onPostClick: (postId: string) => void;
  onCategoryClick: (categorySlug: string) => void;
  onTagClick: (tagSlug: string) => void;
}

export function PostDetailPage({
  post,
  relatedPosts,
  onBack,
  onPostClick,
  onCategoryClick,
  onTagClick,
}: PostDetailPageProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Posts
      </Button>

      {/* Article Header */}
      <article>
        <div className="mb-6">
          <Badge
            className="mb-4 cursor-pointer"
            onClick={() => onCategoryClick(post.category.toLowerCase().replace(/\s+/g, "-"))}
          >
            {post.category}
          </Badge>
          <h1 className="mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <ImageWithFallback
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full"
              />
              <span>{post.author.name}</span>
            </div>
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
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt */}
        <div className="mb-8">
          <p className="text-xl text-gray-600">{post.excerpt}</p>
        </div>

        {/* Web Content Section */}
        {post.url ? (
          <div className="mb-8">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg">Article Content</h3>
                  </div>
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Open in new tab →
                  </a>
                </div>
                <div className="relative" style={{ height: '70vh', minHeight: '500px' }}>
                  <iframe
                    src={post.url}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    title={post.title}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Fallback to text content if no URL provided
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-gray-700 leading-relaxed space-y-4">
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

        {/* Tags */}
        <Separator className="my-8" />
        <div className="mb-8">
          <h3 className="mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onTagClick(tag.toLowerCase().replace(/\s+/g, "-"))}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <Separator className="my-8" />
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <ImageWithFallback
                src={post.author.avatar}
                alt={post.author.name}
                className="h-20 w-20 rounded-full"
              />
              <div className="flex-1">
                <h3 className="mb-2">{post.author.name}</h3>
                <p className="text-gray-600 mb-4">
                  A passionate writer dedicated to helping others find their
                  voice and tell their stories. With years of experience in
                  creative writing and editing, they bring insights and
                  inspiration to every piece.
                </p>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <>
          <Separator className="my-12" />
          <div>
            <h2 className="mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onPostClick(relatedPost.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2">{relatedPost.category}</Badge>
                    <h4 className="mb-2">{relatedPost.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
