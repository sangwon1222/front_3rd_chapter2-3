import { CommentForm } from "@entities/comment/types"
import { fetchComment } from "./fetchComment"

export const createCommentApi = async (comment: CommentForm) => {
  const { ok, data, error } = await fetchComment("/add", {
    method: "POST",
    body: comment,
  })
  if (!ok) throw new Error(error ? error : "Failed to createComment")
  return data
}
