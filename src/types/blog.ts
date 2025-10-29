export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  views: number;
  likes: number;
  commentsCount: number;
  url?: string; // URL to the actual blog post webpage
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  joinedDate: string;
  postsRead: number;
  savedPosts: string[];
  following: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "post";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  image?: string;
  link?: string;
}

export interface HistoryPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  originalDate: string;
  yearsAgo: number;
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  image?: string;
  totalPoints: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
  points: number;
}

export interface DailyQuote {
  id: string;
  text: string;
  author: string;
  category: string;
}
