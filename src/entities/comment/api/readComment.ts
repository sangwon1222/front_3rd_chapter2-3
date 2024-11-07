import { fetchComment } from "./fetchComment"

export const readCommentApi = async (postId: number) => {
  const { ok, data, error } = await fetchComment(`/post/${postId}`)
  if (!ok) throw new Error(error ? error : "Failed to readComment")
  return data
}
