import { Comment } from "@features/comment/types"

export const updateCommentApi = async (comment: Comment) => {
  try {
    const response = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: comment.body, likes: comment.likes }),
    })
    return await response.json()
  } catch (e) {
    throw new Error("Failed to update comment" + e)
  }
}

export const likeCommentApi = async (comment: Comment) => {
  try {
    const { id, likes } = comment
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    return await response.json()
  } catch (e) {
    throw new Error("Failed to update like comment" + e)
  }
}
