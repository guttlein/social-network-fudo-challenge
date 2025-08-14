// Application constants

export const API_CONFIG = {
  BASE_URL: 'https://665de6d7e88051d60408c32d.mockapi.io',
  ENDPOINTS: {
    POSTS: '/post',
    COMMENTS: '/comment',
  },
  TIMEOUT: 10000,
} as const;

export const APP_CONFIG = {
  NAME: 'Social Network',
  VERSION: '1.0.0',
  DESCRIPTION: 'A social network webapp',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
} as const;

export const QUERY_KEYS = {
  POSTS: 'posts',
  POST: 'post',
  COMMENTS: 'comments',
  USER: 'user',
} as const;

export const ROUTES = {
  HOME: '/',
  POST_DETAIL: '/post/:id',
  USER_PROFILE: '/user/:id',
} as const;
