// Application constants

export const API_CONFIG = {
  BASE_URL: 'https://665de6d7e88051d60408c32d.mockapi.io',
  ENDPOINTS: {
    POSTS: '/post',
    COMMENTS: '/comment',
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RATE_LIMIT: {
    POSTS_PER_MINUTE: 5,
    COMMENTS_PER_MINUTE: 10,
  },
} as const;

export const APP_CONFIG = {
  NAME: 'Fudo Social Hub',
  VERSION: '0.9.2-beta',
  DESCRIPTION: 'A modern social platform for developers and tech enthusiasts',
  FEATURES: [
    'Real-time nested discussions',
    'Developer-friendly interface',
    'Progressive web app support',
  ],
  AUTHOR: 'Emiliano Developer',
  REPOSITORY: 'https://github.com/guttlein/social-network-fudo-challenge',
  SUPPORT_EMAIL: 'dev@fudo.social',
} as const;

// Mock user for posts and comments
export const MOCK_USER = {
  name: 'Emiliano Developer',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'Full Stack Developer',
  location: 'Cordoba, Argentina',
  timezone: 'America/Argentina/Cordoba',
  joinDate: '2024-01-15',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
  INFINITE_SCROLL_THRESHOLD: 0.8, // 80% of viewport height
  LOAD_MORE_DELAY: 500, // ms delay before loading more
} as const;

export const QUERY_KEYS = {
  POSTS: 'posts',
  POST: 'post',
  COMMENTS: 'comments',
  USER: 'user',
  INFINITE_POSTS: ['posts', 'infinite'],
  POST_COMMENTS: (postId: string) => ['comments', postId],
  SINGLE_POST: (postId: string) => ['post', postId],
} as const;

export const ROUTES = {
  HOME: '/',
  POST_DETAIL: '/post/:id',
  USER_PROFILE: '/user/:id',
  SETTINGS: '/settings',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// Social features
export const SOCIAL_FEATURES = {
  MAX_COMMENT_DEPTH: 5,
  COMMENT_COOLDOWN: 30000, // 30 seconds between comments
  MAX_POST_LENGTH: 5000,
  MAX_TITLE_LENGTH: 100,
  TRENDING_THRESHOLD: 10, // comments needed to be "trending"
  ENGAGEMENT_METRICS: {
    VIEWS_WEIGHT: 1,
    LIKES_WEIGHT: 3,
    COMMENTS_WEIGHT: 5,
    SHARES_WEIGHT: 10,
  },
} as const;

// UI/UX constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 200,
  TOAST_DURATION: 5000,
  MODAL_ANIMATION: 'slide-up',
  THEME_COLORS: {
    PRIMARY: '#3B82F6',
    SECONDARY: '#6B7280',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#06B6D4',
  },
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    WIDESCREEN: 1280,
  },
} as const;

// Performance and caching constants
export const PERFORMANCE_CONFIG = {
  CACHE_STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_GC_TIME: 10 * 60 * 1000, // 10 minutes
  DEBOUNCE_DELAY: 300, // ms
  THROTTLE_DELAY: 100, // ms
  IMAGE_LAZY_LOAD_OFFSET: 100, // px before viewport
} as const;
