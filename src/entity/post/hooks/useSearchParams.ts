import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { updateURL } from "../services/URLServices"
import { SearchParams } from "../types/searchParams"

export const useSearchParams = (initialValue: SearchParams) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchParams, setSearchParams] = useState<SearchParams>(initialValue)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const skip = parseInt(params.get("skip") || "0")
    const limit = parseInt(params.get("limit") || "10")
    const sortBy = params.get("sortBy") || ""
    const sortOrder = params.get("sortOrder") || "asc"
    const selectedTag = params.get("tag") || ""

    setSearchParams({ skip, limit, q: "", sortBy, sortOrder, selectedTag })
    updateURL(navigate, { skip, limit, sortBy, sortOrder, selectedTag })
  }, [location.search])

  const updateSearchParams = useCallback(
    (update: Partial<SearchParams>) => {
      setSearchParams((prev) => {
        const newParams = { ...prev, ...update }
        updateURL(navigate, newParams) // URL 업데이트
        return newParams
      })
    },
    [navigate],
  )

  const goNextPage = useCallback(() => {
    const { skip, limit } = searchParams
    const updatedSkip = skip + limit

    updateSearchParams({ skip: updatedSkip })
  }, [searchParams])

  const goPrevPage = useCallback(() => {
    const { skip, limit } = searchParams
    const updatedSkip = Math.max(0, skip - limit)

    updateSearchParams({ skip: updatedSkip })
  }, [searchParams])

  return {
    searchParams: useMemo(() => searchParams, [JSON.stringify(searchParams)]),
    goNextPage,
    goPrevPage,
    updateSearchParams,
  }
}
