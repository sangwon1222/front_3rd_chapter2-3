import { fetchComment } from "@entities/comment/api/fetchComment"
import { Comment } from "@entities/comment/types"

export const updateCommentApi = async (comment: Comment) => {
  const { ok, data, error } = await fetchComment(`/${comment.id}`, {
    method: "PUT",
    body: { body: comment.body, likes: comment.likes },
  })
  if (!ok) throw new Error(error ? error : "Failed to updateComment")
  return data
}

export const likeCommentApi = async (comment: Comment) => {
  const { id, likes } = comment
  const { ok, data, error } = await fetchComment(`/${id}`, {
    method: "PATCH",
    body: { likes },
  })
  if (!ok) throw new Error(error ? error : "Failed to likeComment")
  return data
}
