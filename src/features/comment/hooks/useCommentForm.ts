import { CommentForm } from "@features/comment/types"
import { useState } from "react"

export const useCommentForm = (initialValue: CommentForm) => {
  const [newCommentForm, setNewComment] = useState<CommentForm>(initialValue)
  /**
   * 새 댓글 Form
   * @param key   body | postId | userId
   * @param value string | number | number
   */
  const updateCommentForm = (update: Partial<CommentForm>) => {
    setNewComment((prev) => ({ ...prev, update }))
  }

  const resetCommentForm = () => setNewComment(initialValue)

  return {
    newCommentForm,
    updateCommentForm,
    resetCommentForm,
  }
}
