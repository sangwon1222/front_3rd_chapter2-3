import { Comment } from "@shared/types/comment"

export const fetchCommentsApi = async (postId: number) => {
  try {
    const response = await fetch(`/api/comments/post/${postId}`)
    const data = await response.json()
    return { ok: true, data }
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
    return { ok: false, data: [] }
  }
}

export const addCommentApi = async (
  newComment: Omit<Comment, "id" | "user">,
) => {
  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    const data = await response.json()
    return { ok: true, data }
  } catch (error) {
    console.error("댓글 추가 오류:", error)
    return { ok: false, data: {} }
  }
}

export const updateCommentApi = async (selectedComment: Comment) => {
  try {
    const response = await fetch(`/api/comments/${selectedComment.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment.body }),
    })
    const data = await response.json()
    return { ok: true, data }
  } catch (error) {
    console.error("댓글 업데이트 오류:", error)
    return { ok: false, data: {} }
  }
}

export const deleteCommentApi = async (id: number) => {
  try {
    await fetch(`/api/comments/${id}`, { method: "DELETE" })
    return { ok: true }
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    return { ok: false }
  }
}

export const likeCommentApi = async (id: number, likes: number) => {
  try {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    const data = await response.json()
    return { ok: true, data }
  } catch (error) {
    console.error("댓글 좋아요 오류:", error)
    return { ok: false, data: {} }
  }
}
