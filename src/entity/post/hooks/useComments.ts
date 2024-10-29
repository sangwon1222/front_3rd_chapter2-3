import { Comment } from "@shared/types/comment"
import { useState } from "react"
import {
  addCommentApi,
  deleteCommentApi,
  fetchCommentsApi,
  likeCommentApi,
  updateCommentApi,
} from "@entity/post/api/fetchComment"
import {
  calcLikeCount,
  hasCommentByPostId,
} from "@entity/post/services/comments"

export const useComments = () => {
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})
  // const [selectComments, setSelectComments] = useState<Comment | null>(null)

  /**
   * 댓글 리스트 가져오기
   * @param postId
   * @returns
   */
  const fetchComments = async (postId: number) => {
    if (hasCommentByPostId(comments, postId)) return

    const { ok, data } = await fetchCommentsApi(postId)
    if (!ok) return
    setComments((prev) => ({ ...prev, [postId]: data.comments }))
  }

  /**
   * 댓글 추가
   * @param newComment
   * @returns
   */
  const addComment = async (newComment: Omit<Comment, "id" | "user">) => {
    const { ok, data } = await addCommentApi(newComment)
    if (!ok) return
    setComments((prev) => ({ ...prev, [data.postId]: data.comments }))
  }

  /**
   * 댓글 업데이트
   * @param selectedComment
   * @returns
   */
  const updateComment = async (selectedComment: Comment) => {
    const { ok, data } = await updateCommentApi(selectedComment)
    if (!ok) return

    setComments((prev) => ({
      ...prev,
      [data.postId]: prev[data.postId]?.map((comment) =>
        comment.id === data.id ? data : comment,
      ),
    }))
  }

  /**
   * 댓글 삭제
   * @param id
   * @param postId
   * @returns
   */
  const deleteComment = async (id: number, postId: number) => {
    const { ok } = await deleteCommentApi(id)
    if (!ok) return

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== id),
    }))
  }

  /**
   * 댓글 좋아요 업데이트
   * @param id
   * @param postId
   * @returns
   */
  const increaseLikeComment = async (id: number, postId: number) => {
    const updatedLikes = calcLikeCount(comments[postId], id, 1)
    if (updatedLikes < 1) return

    const { ok, data } = await likeCommentApi(id, updatedLikes)
    if (!ok) return

    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) =>
        comment.id === data.id ? data : comment,
      ),
    }))
  }

  return {
    comments,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    increaseLikeComment,
  }
}
