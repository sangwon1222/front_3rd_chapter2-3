export const SORT_BY_DEFAULT = "none" as const

export const SORT_BY_LIST = [
  { id: -1, value: "none", label: "없음" },
  { id: 0, value: "id", label: "ID" },
  { id: 1, value: "title", label: "제목" },
  { id: 2, value: "reactions", label: "반응" },
] as const

export const SORT_ORDER_DEFAULT = "asc" as const

export const SORT_ORDER_LIST = [
  { id: 0, value: "asc", label: "오름차순" },
  { id: 1, value: "desc", label: "내림차순" },
] as const

export const LIMIT_DEFAULT = "10" as const

export const LIMIT_LIST = [
  { id: 0, value: "10", label: "10" },
  { id: 1, value: "20", label: "20" },
  { id: 2, value: "30", label: "30" },
] as const
