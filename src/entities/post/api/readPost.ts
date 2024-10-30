import { convertSearchParamsToString } from "@entities/post/services/URLServices"
import { SearchParams } from "@features/searchParams/types"
import { PostQueryResult } from "@entities/post/types"

export const readPostApi = async (
  params: SearchParams,
): Promise<PostQueryResult> => {
  try {
    const queryString = convertSearchParamsToString({ ...params })
    const response = await fetch(`/api/posts${queryString}`)
    return await response.json()
  } catch (e) {
    throw new Error("Failed to read posts" + e)
  }
}
