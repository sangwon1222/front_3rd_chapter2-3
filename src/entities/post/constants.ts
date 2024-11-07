export const SEARCH_PARAMS = {
  SKIP: "skip",
  LIMIT: "limit",
  SEARCH: "q",
  SORT_BY: "sortBy",
  SORT_ORDER: "order",
  TAG: "tag",
} as const

export const DEFAULT_POST = {
  id: -1,
  body: "",
  reactions: { likes: 0, dislikes: 0 },
  tags: [],
  title: "",
  userId: -1,
  views: 0,
} as const

export const DEFAULT_POST_FORM = {
  body: "",
  title: "",
  userId: -1,
} as const
