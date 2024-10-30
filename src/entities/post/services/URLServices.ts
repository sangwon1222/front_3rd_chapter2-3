import { SearchParams } from "@features/searchParams/types"
import { NavigateFunction } from "react-router-dom"

export const updateURL = (
  navigate: NavigateFunction,
  searchParams: Partial<SearchParams>,
) => {
  const { skip, limit, q, sortBy, sortOrder, selectedTag } = searchParams

  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (q) params.set("search", q)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)
  if (selectedTag) params.set("tag", selectedTag)

  navigate(`?${params.toString()}`)
}

export const convertSearchParamsToString = ({
  skip,
  limit,
  q,
  sortBy,
  sortOrder,
  selectedTag,
}: SearchParams) => {
  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (q) params.set("search", q)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)

  // 조건부 URL 생성
  const hasTag = selectedTag && selectedTag !== "all"
  const hasSearch = q && q !== ""

  if (hasTag) return `/tag/${selectedTag}?${params.toString()}`
  if (hasSearch) return `/search?q=${q}&${params.toString()}`
  return `?${params.toString()}`
}

export const getSearchParamsToURL = (locationSearch: string) => {
  const params = new URLSearchParams(locationSearch)
  const q = params.get("search") || ""
  const skip = parseInt(params.get("skip") || "0")
  const limit = parseInt(params.get("limit") || "10")
  const sortBy = params.get("sortBy") || ""
  const sortOrder = params.get("sortOrder") || "asc"
  const selectedTag = params.get("tag") || ""

  return { skip, limit, q, sortBy, sortOrder, selectedTag }
}
