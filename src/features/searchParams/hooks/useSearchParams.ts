import { searchParamsAtom } from "@features/searchParams/model/atom"
import { SearchParams } from "@features/searchParams/types"
import { useLocation, useNavigate } from "react-router-dom"
import { useCallback, useEffect } from "react"
import {
  getSearchParamsToURL,
  updateURL,
} from "@entities/post/services/URLServices"
import { useAtom } from "jotai"

export const useSearchParams = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useAtom(searchParamsAtom)

  // URL 파라미터에 따라 searchParams 초기화
  useEffect(() => {
    const newParams = getSearchParamsToURL(location.search)
    setSearchParams(newParams)
    updateURL(navigate, newParams)
  }, [location.search, setSearchParams, navigate])

  /**
   * searchParams 업데이트 함수
   */
  const updateSearchParams = useCallback(
    (update: Partial<SearchParams>) => {
      setSearchParams((prev: SearchParams) => {
        const newParams = { ...prev, ...update }
        updateURL(navigate, newParams)
        return newParams
      })
    },
    [setSearchParams, navigate],
  )

  /**
   * 다음 페이지로 이동 (skip , limit 값 업데이트)
   */
  const goNextPage = useCallback(() => {
    const { skip, limit } = searchParams
    const updatedSkip = skip + limit
    updateSearchParams({ skip: updatedSkip })
  }, [searchParams, updateSearchParams])

  /**
   * 이전 페이지로 이동 (skip , limit 값 업데이트)
   */
  const goPrevPage = useCallback(() => {
    const { skip, limit } = searchParams
    const updatedSkip = Math.max(0, skip - limit)
    updateSearchParams({ skip: updatedSkip })
  }, [searchParams, updateSearchParams])

  return {
    searchParams,
    goNextPage,
    goPrevPage,
    updateSearchParams,
  }
}
