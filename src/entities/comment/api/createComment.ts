import { fetchComment } from "@entities/comment/api/fetchComment"
import { CommentForm } from "@entities/comment/types"

export const createCommentApi = async (comment: CommentForm) => {
  const { ok, data, error } = await fetchComment("/add", {
    method: "POST",
    body: comment,
  })
  if (!ok) throw new Error(error ? error : "Failed to createComment")
  return data
}
