import { useState } from "react";
import { MessageCircle, Heart, Send, MoreVertical } from "lucide-react";
import { Comment } from "../types/blog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CommentsSectionProps {
  comments: Comment[];
  currentUserAvatar?: string;
  onAddComment?: (content: string) => void;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

export function CommentsSection({
  comments,
  currentUserAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Current",
  onAddComment,
  isLoggedIn = false,
  onLoginClick,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment);
      setNewComment("");
      setReplyTo(null);
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? "ml-8" : ""}`}>
      <div className="flex gap-3">
        <ImageWithFallback
          src={comment.userAvatar}
          alt={comment.userName}
          className="h-10 w-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">{comment.userName}</p>
              <button className="p-1">
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {comment.content}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-2 px-4">
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span>{comment.likes}</span>
            </button>
            {isLoggedIn && (
              <button
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setReplyTo(comment.id)}
              >
                Reply
              </button>
            )}
            <span className="text-xs text-gray-400">
              {formatTime(comment.createdAt)}
            </span>
          </div>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-5 w-5" />
          <h3>Comments ({comments.length})</h3>
        </div>

        {/* Add Comment */}
        {isLoggedIn ? (
          <div className="mb-6">
            <div className="flex gap-3 mb-3">
              <ImageWithFallback
                src={currentUserAvatar}
                alt="You"
                className="h-10 w-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-6 rounded-lg text-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
            <MessageCircle className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--cotton-seed)' }} />
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
              Login to join the conversation and share your thoughts
            </p>
            <Button
              onClick={onLoginClick}
              style={{ backgroundColor: 'var(--accent-orange-warm)', color: 'white' }}
            >
              Login to Comment
            </Button>
          </div>
        )}

        <Separator className="my-4" />

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
