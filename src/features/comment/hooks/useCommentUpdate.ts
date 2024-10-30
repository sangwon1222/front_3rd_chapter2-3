import { updateCommentApi } from "@features/comment/api/updateComment"
import { Comment, CommentsFetchResult } from "@features/comment/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCommentUpdate = () => {
  const queryClient = useQueryClient()

  const updateCommentMutation = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (data: Comment) => {
      queryClient.setQueryData(["comment"], (oldData: CommentsFetchResult) => ({
        limit: oldData.limit,
        skip: oldData.skip,
        comments: oldData.comments.map((comment) =>
          comment.id === data.id ? data : comment,
        ),
        total: (oldData?.total || 0) + 1,
      }))
    },
  })

  const updateComment = (comment: Comment) => {
    updateCommentMutation.mutate(comment)
  }

  return { updateComment }
}
