import { SearchParams } from "@entity/post/types/searchParams"
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

export const getQueryString = (locationSearch: string) => {
  const params = new URLSearchParams(locationSearch)

  const skip = parseInt(params.get("skip") || "0")
  const limit = parseInt(params.get("limit") || "10")
  const q = params.get("q") || ""
  const sortBy = params.get("sortBy") || ""
  const sortOrder = params.get("sortOrder") || "asc"
  const selectedTag = params.get("tag") || ""

  // 쿼리 파라미터 설정
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (q) params.set("search", q)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)

  // 조건부 URL 생성
  const baseUrl = selectedTag ? `/tag/${selectedTag}` : ""
  return `${baseUrl}?${params.toString()}`
}
