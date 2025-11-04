import { BlogPost, Category, Tag, User, Comment, Notification, HistoryPost, Quiz, DailyQuote } from "../types/blog";

export const categories: Category[] = [
  { id: "1", name: "Creative Writing", slug: "creative-writing", count: 12 },
  { id: "2", name: "Poetry", slug: "poetry", count: 8 },
  { id: "3", name: "Fiction", slug: "fiction", count: 15 },
  { id: "4", name: "Non-Fiction", slug: "non-fiction", count: 10 },
  { id: "5", name: "Writing Tips", slug: "writing-tips", count: 20 },
  { id: "6", name: "Book Reviews", slug: "book-reviews", count: 7 },
];

export const tags: Tag[] = [
  { id: "1", name: "Inspiration", slug: "inspiration", count: 25 },
  { id: "2", name: "Storytelling", slug: "storytelling", count: 18 },
  { id: "3", name: "Character Development", slug: "character-development", count: 12 },
  { id: "4", name: "Plot", slug: "plot", count: 14 },
  { id: "5", name: "Grammar", slug: "grammar", count: 9 },
  { id: "6", name: "Publishing", slug: "publishing", count: 11 },
  { id: "7", name: "Editing", slug: "editing", count: 16 },
  { id: "8", name: "Writing Process", slug: "writing-process", count: 22 },
];

export const currentUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  bio: "Aspiring writer passionate about storytelling and creative expression. Always learning, always writing.",
  joinedDate: "2024-01-15",
  postsRead: 127,
  savedPosts: ["1", "3", "5"],
  following: ["Sarah", "James", "Emily"],
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Crafting Compelling Characters",
    excerpt: "Discover the secrets to creating memorable characters that resonate with readers and drive your narrative forward.",
    content: "Creating compelling characters is the cornerstone of great storytelling. Characters are the heart and soul of your narrative, and readers connect with stories through the people who inhabit them. In this comprehensive guide, we'll explore the fundamental techniques for developing characters that feel authentic, relatable, and unforgettable...",
    image: "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwZGVzayUyMGxhcHRvcHxlbnwxfHx8fDE3NjE2NTcwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Writing Tips",
    tags: ["Character Development", "Storytelling", "Writing Process"],
    author: {
      name: "Sarah Mitchell",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    publishedDate: "2025-10-25",
    readTime: "8 min read",
    views: 2340,
    likes: 234,
    commentsCount: 18,
    url: "https://en.wikipedia.org/wiki/Character_(arts)",
  },
  {
    id: "2",
    title: "Finding Your Unique Writing Voice",
    excerpt: "Learn how to develop and refine your distinctive writing style that sets your work apart from others.",
    content: "Your writing voice is your unique fingerprint in the literary world. It's what makes your work instantly recognizable and sets you apart from other writers. Developing this voice takes time, practice, and self-awareness...",
    image: "https://images.unsplash.com/photo-1612907260223-2c7aff7a7d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmclMjBub3RlYm9va3xlbnwxfHx8fDE3NjE1ODM3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Creative Writing",
    tags: ["Writing Process", "Inspiration"],
    author: {
      name: "James Porter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    publishedDate: "2025-10-22",
    readTime: "6 min read",
    views: 1890,
    likes: 156,
    commentsCount: 12,
    url: "https://en.wikipedia.org/wiki/Writer%27s_voice",
  },
  {
    id: "3",
    title: "Mastering Dialogue: Make Your Characters Speak Naturally",
    excerpt: "Tips and techniques for writing dialogue that sounds authentic and moves your story forward.",
    content: "Dialogue is one of the most powerful tools in a writer's arsenal. When done well, it reveals character, advances the plot, and creates a rhythm that keeps readers engaged. However, writing natural-sounding dialogue can be challenging...",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYxNjMxODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Writing Tips",
    tags: ["Character Development", "Storytelling", "Editing"],
    author: {
      name: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    publishedDate: "2025-10-20",
    readTime: "7 min read",
    views: 3120,
    likes: 287,
    commentsCount: 24,
    url: "https://en.wikipedia.org/wiki/Dialogue_in_writing",
  },
  {
    id: "4",
    title: "The Power of Metaphor in Poetry",
    excerpt: "Explore how metaphors can transform your poetry and create deeper emotional connections with readers.",
    content: "Metaphors are the lifeblood of poetry. They allow us to see the world through new eyes, to connect seemingly unrelated concepts, and to express complex emotions in ways that literal language cannot...",
    image: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzYxNjQ5MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Poetry",
    tags: ["Inspiration", "Writing Process"],
    author: {
      name: "Marcus Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    publishedDate: "2025-10-18",
    readTime: "5 min read",
    views: 1560,
    likes: 198,
    commentsCount: 9,
  },
  {
    id: "5",
    title: "Overcoming Writer's Block: Proven Strategies",
    excerpt: "Practical techniques to break through creative barriers and get your writing flowing again.",
    content: "Writer's block is a frustrating experience that every writer faces at some point. That blank page can feel insurmountable, and the pressure to create can be paralyzing. But writer's block doesn't have to derail your creative journey...",
    image: "https://images.unsplash.com/photo-1714974529438-77bf2c377214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjByZWFkaW5nfGVufDF8fHx8MTc2MTY0MTY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Writing Tips",
    tags: ["Inspiration", "Writing Process"],
    author: {
      name: "Sarah Mitchell",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    publishedDate: "2025-10-15",
    readTime: "6 min read",
    views: 2890,
    likes: 312,
    commentsCount: 27,
  },
  {
    id: "6",
    title: "Building Tension in Your Novel",
    excerpt: "Learn how to keep readers on the edge of their seats with effective pacing and conflict.",
    content: "Tension is what keeps readers turning pages late into the night. It's the invisible thread that pulls them through your story, making them invested in the outcome. Creating and maintaining tension requires careful attention to pacing, conflict, and stakes...",
    image: "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwZXdyaXRlcnxlbnwxfHx8fDE3NjE1OTMzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Fiction",
    tags: ["Plot", "Storytelling"],
    author: {
      name: "James Porter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
    publishedDate: "2025-10-12",
    readTime: "9 min read",
    views: 2145,
    likes: 203,
    commentsCount: 15,
  },
];

export const comments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    userId: "user2",
    userName: "Jessica Lee",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    content: "This is such a helpful guide! The section on character backstory really resonated with me. I've been struggling with making my characters feel authentic.",
    createdAt: "2025-10-26T10:30:00Z",
    likes: 12,
  },
  {
    id: "c2",
    postId: "1",
    userId: "user3",
    userName: "Michael Brown",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content: "Great article! Would love to see a follow-up on character arcs and development over multiple books.",
    createdAt: "2025-10-26T14:15:00Z",
    likes: 8,
    replies: [
      {
        id: "c2r1",
        postId: "1",
        userId: "user4",
        userName: "Sarah Mitchell",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        content: "Thanks for the suggestion! That's definitely on my list for future articles.",
        createdAt: "2025-10-26T15:20:00Z",
        likes: 3,
      },
    ],
  },
  {
    id: "c3",
    postId: "1",
    userId: "user5",
    userName: "Emma Davis",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    content: "I've bookmarked this for future reference. The tips on showing vs telling are spot on!",
    createdAt: "2025-10-27T09:45:00Z",
    likes: 15,
  },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "comment",
    title: "New comment on your saved post",
    message: "Jessica Lee commented on 'The Art of Crafting Compelling Characters'",
    timestamp: "2025-10-27T10:30:00Z",
    read: false,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    link: "1",
  },
  {
    id: "n2",
    type: "like",
    title: "Your comment was liked",
    message: "Sarah Mitchell liked your comment",
    timestamp: "2025-10-27T09:15:00Z",
    read: false,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "n3",
    type: "post",
    title: "New article from Sarah Mitchell",
    message: "The Art of Crafting Compelling Characters",
    timestamp: "2025-10-26T08:00:00Z",
    read: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    link: "1",
  },
  {
    id: "n4",
    type: "follow",
    title: "New follower",
    message: "James Porter started following you",
    timestamp: "2025-10-25T16:20:00Z",
    read: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    id: "n5",
    type: "comment",
    title: "New reply to your comment",
    message: "Michael Brown replied to your comment on 'Finding Your Unique Writing Voice'",
    timestamp: "2025-10-25T14:30:00Z",
    read: true,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
];

export const historyPosts: HistoryPost[] = [
  {
    id: "h1",
    title: "The Birth of Stream of Consciousness Writing",
    excerpt: "Exploring how modernist writers revolutionized narrative techniques.",
    image: "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzYxNjQ5MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    originalDate: "2020-10-28",
    yearsAgo: 5,
    category: "Creative Writing",
  },
  {
    id: "h2",
    title: "Shakespeare's Influence on Modern Dialogue",
    excerpt: "How the Bard's techniques still shape contemporary writing.",
    image: "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwZXdyaXRlcnxlbnwxfHx8fDE3NjE1OTMzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    originalDate: "2022-10-28",
    yearsAgo: 3,
    category: "Writing Tips",
  },
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    title: "Grammar Essentials Quiz",
    description: "Test your knowledge of fundamental grammar rules and writing mechanics.",
    category: "Writing Tips",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    timeLimit: 10,
    totalPoints: 50,
    questions: [
      {
        id: "q1q1",
        question: "Which sentence uses correct punctuation?",
        options: [
          "The cat sat on the mat.",
          "The cat, sat on the mat.",
          "The cat sat, on the mat.",
          "The cat sat on, the mat."
        ],
        correctAnswer: 0,
        explanation: "The first sentence uses correct punctuation with a simple period at the end.",
        points: 10
      },
      {
        id: "q1q2",
        question: "What is the plural form of 'criterion'?",
        options: ["Criterions", "Criteria", "Criterias", "Criterioes"],
        correctAnswer: 1,
        explanation: "'Criteria' is the correct plural form of 'criterion', which has Greek origins.",
        points: 10
      },
      {
        id: "q1q3",
        question: "Which word is a conjunction?",
        options: ["Quickly", "Beautiful", "But", "Running"],
        correctAnswer: 2,
        explanation: "'But' is a conjunction used to connect words, phrases, or clauses.",
        points: 10
      },
      {
        id: "q1q4",
        question: "Identify the sentence with proper subject-verb agreement:",
        options: [
          "The group of students were excited.",
          "The group of students was excited.",
          "The groups of student was excited.",
          "The groups of student were excited."
        ],
        correctAnswer: 1,
        explanation: "'Group' is a collective noun that takes a singular verb when treated as a single unit.",
        points: 10
      },
      {
        id: "q1q5",
        question: "What type of sentence is: 'Stop!'",
        options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"],
        correctAnswer: 2,
        explanation: "An imperative sentence gives a command or makes a request.",
        points: 10
      }
    ]
  },
  {
    id: "q2",
    title: "Character Development Mastery",
    description: "Explore the art of creating compelling and memorable characters.",
    category: "Fiction",
    difficulty: "medium",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800",
    timeLimit: 15,
    totalPoints: 75,
    questions: [
      {
        id: "q2q1",
        question: "What is a 'character arc'?",
        options: [
          "The physical appearance of a character",
          "The transformation a character undergoes throughout the story",
          "The character's family tree",
          "The character's dialogue style"
        ],
        correctAnswer: 1,
        explanation: "A character arc is the transformation or inner journey of a character over the course of a story.",
        points: 15
      },
      {
        id: "q2q2",
        question: "Which element is NOT essential for character development?",
        options: [
          "Backstory",
          "Motivation",
          "Physical appearance description",
          "Internal conflict"
        ],
        correctAnswer: 2,
        explanation: "While physical appearance can be helpful, motivation, backstory, and internal conflict are more essential for deep character development.",
        points: 15
      },
      {
        id: "q2q3",
        question: "What is a 'flat character'?",
        options: [
          "A character with no physical depth",
          "A character who doesn't change throughout the story",
          "A character who lies down frequently",
          "A poorly written character"
        ],
        correctAnswer: 1,
        explanation: "A flat character is one-dimensional and doesn't undergo significant change or growth.",
        points: 15
      },
      {
        id: "q2q4",
        question: "In the 'show, don't tell' technique, which is better?",
        options: [
          "Sarah was angry.",
          "Sarah slammed the door and clenched her fists.",
          "Sarah felt mad.",
          "Sarah had anger."
        ],
        correctAnswer: 1,
        explanation: "Showing emotions through actions and body language is more engaging than simply stating them.",
        points: 15
      },
      {
        id: "q2q5",
        question: "What is an 'antagonist'?",
        options: [
          "The main character of a story",
          "A character who opposes the protagonist",
          "A supporting character",
          "The narrator"
        ],
        correctAnswer: 1,
        explanation: "An antagonist is a character or force that opposes the protagonist, creating conflict.",
        points: 15
      }
    ]
  },
  {
    id: "q3",
    title: "Advanced Plot Structures",
    description: "Master complex narrative structures and storytelling techniques.",
    category: "Creative Writing",
    difficulty: "hard",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    timeLimit: 20,
    totalPoints: 100,
    questions: [
      {
        id: "q3q1",
        question: "What is 'in medias res'?",
        options: [
          "Starting a story at the end",
          "Starting a story in the middle of action",
          "A type of resolution",
          "A character development technique"
        ],
        correctAnswer: 1,
        explanation: "'In medias res' is a Latin term meaning 'into the middle of things' - starting the narrative in the midst of action.",
        points: 20
      },
      {
        id: "q3q2",
        question: "In Freytag's Pyramid, what comes after the rising action?",
        options: ["Resolution", "Exposition", "Climax", "Falling action"],
        correctAnswer: 2,
        explanation: "The climax is the peak of tension in Freytag's Pyramid, occurring after the rising action.",
        points: 20
      },
      {
        id: "q3q3",
        question: "What is a 'MacGuffin'?",
        options: [
          "A Scottish character",
          "An object that drives the plot but has little intrinsic value",
          "A type of breakfast food",
          "A plot twist technique"
        ],
        correctAnswer: 1,
        explanation: "A MacGuffin is a plot device that motivates characters but has little importance to the story itself.",
        points: 20
      },
      {
        id: "q3q4",
        question: "What is 'Chekhov's Gun' principle?",
        options: [
          "Every element introduced should be relevant to the plot",
          "Always include weapons in stories",
          "Russian literature techniques",
          "A character naming convention"
        ],
        correctAnswer: 0,
        explanation: "Chekhov's Gun states that every element in a story must be necessary and irrelevant elements should be removed.",
        points: 20
      },
      {
        id: "q3q5",
        question: "What narrative technique uses multiple timelines?",
        options: [
          "Linear narrative",
          "Non-linear narrative",
          "First-person narrative",
          "Third-person omniscient"
        ],
        correctAnswer: 1,
        explanation: "Non-linear narratives present events out of chronological order, often using multiple timelines.",
        points: 20
      }
    ]
  },
  {
    id: "q4",
    title: "Poetry Forms & Techniques",
    description: "Test your knowledge of various poetic forms and literary devices.",
    category: "Poetry",
    difficulty: "medium",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800",
    timeLimit: 12,
    totalPoints: 60,
    questions: [
      {
        id: "q4q1",
        question: "How many lines does a sonnet have?",
        options: ["12", "14", "16", "18"],
        correctAnswer: 1,
        explanation: "A traditional sonnet contains 14 lines, typically written in iambic pentameter.",
        points: 12
      },
      {
        id: "q4q2",
        question: "What is alliteration?",
        options: [
          "Repetition of vowel sounds",
          "Repetition of consonant sounds at the beginning of words",
          "Rhyming words at the end of lines",
          "Comparison using 'like' or 'as'"
        ],
        correctAnswer: 1,
        explanation: "Alliteration is the repetition of initial consonant sounds in neighboring words.",
        points: 12
      },
      {
        id: "q4q3",
        question: "A haiku traditionally has how many syllables?",
        options: ["15", "17", "19", "21"],
        correctAnswer: 1,
        explanation: "A traditional haiku has 17 syllables arranged in a 5-7-5 pattern across three lines.",
        points: 12
      },
      {
        id: "q4q4",
        question: "What is enjambment?",
        options: [
          "A French poetry form",
          "When a sentence or phrase runs over multiple lines",
          "A rhyme scheme",
          "A type of meter"
        ],
        correctAnswer: 1,
        explanation: "Enjambment occurs when a sentence or phrase continues from one line to the next without pause.",
        points: 12
      },
      {
        id: "q4q5",
        question: "What does 'meter' refer to in poetry?",
        options: [
          "The length of the poem",
          "The rhyme scheme",
          "The rhythmic structure",
          "The theme"
        ],
        correctAnswer: 2,
        explanation: "Meter is the rhythmic structure of a poem, determined by the pattern of stressed and unstressed syllables.",
        points: 12
      }
    ]
  }
];

export const dailyQuotes: DailyQuote[] = [
  {
    id: "dq1",
    text: "There is no greater agony than bearing an untold story inside you.",
    author: "Maya Angelou",
    category: "Inspiration"
  },
  {
    id: "dq2",
    text: "You can make anything by writing.",
    author: "C.S. Lewis",
    category: "Writing Process"
  },
  {
    id: "dq3",
    text: "The first draft is just you telling yourself the story.",
    author: "Terry Pratchett",
    category: "Writing Process"
  },
  {
    id: "dq4",
    text: "Start writing, no matter what. The water does not flow until the faucet is turned on.",
    author: "Louis L'Amour",
    category: "Inspiration"
  },
  {
    id: "dq5",
    text: "If there's a book that you want to read, but it hasn't been written yet, then you must write it.",
    author: "Toni Morrison",
    category: "Inspiration"
  },
  {
    id: "dq6",
    text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
    author: "J.K. Rowling",
    category: "Writing Process"
  },
  {
    id: "dq7",
    text: "The scariest moment is always just before you start.",
    author: "Stephen King",
    category: "Writing Process"
  }
];

// Get a daily quote based on the current day
export const getDailyQuote = (): DailyQuote => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return dailyQuotes[dayOfYear % dailyQuotes.length];
};
