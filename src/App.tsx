import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MobileHeader } from "./components/MobileHeader";
import { BottomNav } from "./components/BottomNav";
import { MobileHomePage } from "./components/MobileHomePage";
import { MobilePostDetail } from "./components/MobilePostDetail";
import { MobileCategoryPage } from "./components/MobileCategoryPage";
import { MobileTagPage } from "./components/MobileTagPage";
import { MobileAboutPage } from "./components/MobileAboutPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { ProfilePage } from "./components/ProfilePage";
import { ThisDayInHistoryPage } from "./components/ThisDayInHistoryPage";
import { RandomPostsPage } from "./components/RandomPostsPage";
import { SettingsPage } from "./components/SettingsPage";
import { QuizPage } from "./components/QuizPage";
import { AuthorPage } from "./components/AuthorPage";
import { SearchPage } from "./components/SearchPage";
import { SavedArticlesPage } from "./components/SavedArticlesPage";
import { ReadingHistoryPage } from "./components/ReadingHistoryPage";
import { blogPosts, categories, tags, currentUser, comments, notifications, historyPosts, quizzes, getDailyQuote } from "./data/mockData";

type Page = "home" | "post" | "categories" | "category" | "tags" | "tag" | "about" | "login" | "register" | "notifications" | "profile" | "history" | "random" | "settings" | "quiz" | "author" | "search" | "saved" | "reading-history";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedTagSlug, setSelectedTagSlug] = useState<string | null>(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get popular posts (sorted by views)
  const popularPosts = [...blogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  // Get latest posts
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 6);

  // Get saved posts (from current user)
  const savedPosts = blogPosts.filter((post) => currentUser.savedPosts.includes(post.id));

  // Get reading history (mock - showing all posts for demo)
  const readingHistory = [...blogPosts].slice(0, 3);

  // Get unread notifications count
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Get daily quote
  const dailyQuote = getDailyQuote();

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage("post");
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategorySlug(categorySlug);
    setCurrentPage("category");
    window.scrollTo(0, 0);
  };

  const handleTagClick = (tagSlug: string) => {
    setSelectedTagSlug(tagSlug);
    setCurrentPage("tag");
    window.scrollTo(0, 0);
  };

  const handleAuthorClick = (authorName: string) => {
    setSelectedAuthorName(authorName);
    setCurrentPage("author");
    window.scrollTo(0, 0);
  };

  const handleSearchClick = () => {
    setCurrentPage("search");
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: string) => {
    if (page === "home") {
      setCurrentPage("home");
      setSelectedPostId(null);
      setSelectedCategorySlug(null);
      setSelectedTagSlug(null);
    } else if (page === "categories") {
      setCurrentPage("categories");
      setSelectedCategorySlug(null);
    } else if (page === "tags") {
      setCurrentPage("tags");
      setSelectedTagSlug(null);
    } else if (page === "about") {
      setCurrentPage("about");
    } else if (page === "profile") {
      if (!isLoggedIn) {
        setCurrentPage("login");
      } else {
        setCurrentPage("profile");
      }
    } else if (page === "history") {
      setCurrentPage("history");
    } else if (page === "random") {
      setCurrentPage("random");
    } else if (page === "settings") {
      if (!isLoggedIn) {
        setCurrentPage("login");
      } else {
        setCurrentPage("settings");
      }
    } else if (page === "quiz") {
      setCurrentPage("quiz");
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentPage === "post") {
      setCurrentPage("home");
      setSelectedPostId(null);
    } else if (currentPage === "category") {
      setCurrentPage("categories");
      setSelectedCategorySlug(null);
    } else if (currentPage === "tag") {
      setCurrentPage("tags");
      setSelectedTagSlug(null);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handleNotificationsClick = () => {
    setCurrentPage("notifications");
    window.scrollTo(0, 0);
  };

  const handleProfileClick = () => {
    setCurrentPage("profile");
    window.scrollTo(0, 0);
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.link) {
      handlePostClick(notification.link);
    }
  };

  const getHeaderProps = () => {
    const baseProps = {
      isLoggedIn,
      userAvatar: isLoggedIn ? currentUser.avatar : undefined,
      onNotificationsClick: handleNotificationsClick,
      onProfileClick: handleProfileClick,
      notificationCount: unreadNotifications,
    };

    if (currentPage === "post") {
      return { ...baseProps, showBack: true, onBack: handleBack, title: "Article" };
    } else if (currentPage === "category" && selectedCategorySlug) {
      const category = categories.find((c) => c.slug === selectedCategorySlug);
      return { ...baseProps, showBack: true, onBack: handleBack, title: category?.name };
    } else if (currentPage === "tag" && selectedTagSlug) {
      const tag = tags.find((t) => t.slug === selectedTagSlug);
      return { ...baseProps, showBack: true, onBack: handleBack, title: `#${tag?.name}` };
    } else if (currentPage === "home") {
      return { ...baseProps, showLogo: true };
    } else if (currentPage === "categories") {
      return { ...baseProps, showLogo: true };
    } else if (currentPage === "tags") {
      return { ...baseProps, showLogo: true };
    } else if (currentPage === "about") {
      return { ...baseProps, title: "About" };
    } else if (currentPage === "notifications") {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("home"), title: "Notifications" };
    } else if (currentPage === "profile") {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("home"), title: "Profile" };
    } else if (currentPage === "history") {
      return { ...baseProps, showLogo: true };
    } else if (currentPage === "random") {
      return { ...baseProps, showLogo: true };
    } else if (currentPage === "settings") {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("profile"), title: "Settings" };
    } else if (currentPage === "quiz") {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("home"), title: "Quizzes" };
    } else if (currentPage === "author" && selectedAuthorName) {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("home"), title: selectedAuthorName };
    } else if (currentPage === "search") {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("home"), title: "Search" };
    } else if (currentPage === "saved") {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("profile"), title: "Saved Articles" };
    } else if (currentPage === "reading-history") {
      return { ...baseProps, showBack: true, onBack: () => setCurrentPage("profile"), title: "Reading History" };
    }
    return baseProps;
  };

  const renderPage = () => {
    if (currentPage === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentPage("register")}
        />
      );
    }

    if (currentPage === "register") {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentPage("login")}
        />
      );
    }

    if (currentPage === "notifications") {
      return (
        <NotificationsPage
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
        />
      );
    }

    if (currentPage === "profile") {
      return (
        <ProfilePage
          user={currentUser}
          savedPosts={savedPosts}
          readingHistory={readingHistory}
          onPostClick={handlePostClick}
          onLogout={handleLogout}
          onEditProfile={() => {}}
          onSettingsClick={() => setCurrentPage("settings")}
          onHistoryClick={() => setCurrentPage("history")}
          onQuizClick={() => setCurrentPage("quiz")}
          onNotificationsClick={handleNotificationsClick}
          onSavedClick={() => setCurrentPage("saved")}
          onReadingHistoryClick={() => setCurrentPage("reading-history")}
          onAuthorClick={handleAuthorClick}
        />
      );
    }

    if (currentPage === "saved") {
      return (
        <SavedArticlesPage
          posts={savedPosts}
          onPostClick={handlePostClick}
          onAuthorClick={handleAuthorClick}
        />
      );
    }

    if (currentPage === "reading-history") {
      return (
        <ReadingHistoryPage
          posts={readingHistory}
          onPostClick={handlePostClick}
          onAuthorClick={handleAuthorClick}
        />
      );
    }

    if (currentPage === "history") {
      return <ThisDayInHistoryPage />;
    }

    if (currentPage === "random") {
      return (
        <RandomPostsPage
          posts={blogPosts}
          onPostClick={handlePostClick}
          onAuthorClick={handleAuthorClick}
        />
      );
    }

    if (currentPage === "settings") {
      return <SettingsPage onBack={() => setCurrentPage("profile")} />;
    }

    if (currentPage === "quiz") {
      return <QuizPage quizzes={quizzes} />;
    }

    if (currentPage === "search") {
      return (
        <SearchPage
          posts={blogPosts}
          onPostClick={handlePostClick}
          onAuthorClick={handleAuthorClick}
        />
      );
    }

    if (currentPage === "author" && selectedAuthorName) {
      const authorPosts = blogPosts.filter((p) => p.author.name === selectedAuthorName);
      const author = authorPosts.length > 0 ? authorPosts[0].author : null;
      
      if (!author) return <MobileHomePage {...homePageProps} />;

      // You can add author bio from a separate data source if needed
      const authorBio = "Passionate writer sharing insights on writing craft and storytelling.";

      return (
        <AuthorPage
          authorName={author.name}
          authorAvatar={author.avatar}
          authorBio={authorBio}
          posts={authorPosts}
          onPostClick={handlePostClick}
        />
      );
    }

    if (currentPage === "post" && selectedPostId) {
      const post = blogPosts.find((p) => p.id === selectedPostId);
      if (!post) return <MobileHomePage {...homePageProps} />;

      // Get related posts from same category
      const relatedPosts = blogPosts
        .filter((p) => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

      // Get comments for this post
      const postComments = comments.filter((c) => c.postId === post.id);

      return (
        <MobilePostDetail
          post={post}
          relatedPosts={relatedPosts}
          comments={postComments}
          onPostClick={handlePostClick}
          onCategoryClick={handleCategoryClick}
          onTagClick={handleTagClick}
          onAuthorClick={handleAuthorClick}
          currentUserAvatar={isLoggedIn ? currentUser.avatar : undefined}
        />
      );
    }

    if (currentPage === "categories" || currentPage === "category") {
      const category = selectedCategorySlug
        ? categories.find((c) => c.slug === selectedCategorySlug)
        : undefined;

      const filteredPosts = category
        ? blogPosts.filter((p) => p.category === category.name)
        : [];

      return (
        <MobileCategoryPage
          category={category}
          posts={filteredPosts}
          allCategories={categories}
          onPostClick={handlePostClick}
          onCategoryClick={handleCategoryClick}
          onAuthorClick={handleAuthorClick}
        />
      );
    }

    if (currentPage === "tags" || currentPage === "tag") {
      const tag = selectedTagSlug
        ? tags.find((t) => t.slug === selectedTagSlug)
        : undefined;

      const filteredPosts = tag
        ? blogPosts.filter((p) =>
            p.tags.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag.slug)
          )
        : [];

      return (
        <MobileTagPage
          tag={tag}
          posts={filteredPosts}
          allTags={tags}
          onPostClick={handlePostClick}
          onTagClick={handleTagClick}
          onAuthorClick={handleAuthorClick}
        />
      );
    }

    if (currentPage === "about") {
      return <MobileAboutPage />;
    }

    return <MobileHomePage {...homePageProps} />;
  };

  const homePageProps = {
    latestPosts,
    popularPosts,
    categories,
    tags,
    dailyQuote,
    onPostClick: handlePostClick,
    onCategoryClick: handleCategoryClick,
    onTagClick: handleTagClick,
    onAuthorClick: handleAuthorClick,
  };

  const showBottomNav = currentPage !== "login" && currentPage !== "register";
  const showHeader = currentPage !== "login" && currentPage !== "register";

  return (
    <ThemeProvider>
      <div className="min-h-screen max-w-md mx-auto relative" style={{ backgroundColor: 'var(--content-bg)' }}>
        {showHeader && <MobileHeader {...getHeaderProps()} />}
        <main className="min-h-screen" style={{ backgroundColor: 'var(--content-bg)' }}>{renderPage()}</main>
        {showBottomNav && <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />}
      </div>
    </ThemeProvider>
  );
}
