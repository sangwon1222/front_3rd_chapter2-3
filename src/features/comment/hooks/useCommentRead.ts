import { readCommentApi } from "@features/comment/api/readComment"
import { useQuery } from "@tanstack/react-query"

export const useCommentRead = (postId: number) => {
  const {
    data,
    isLoading: isCommentLoading,
    error,
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => readCommentApi(postId),
  })

  if (isCommentLoading)
    return { data: null, comments: null, isCommentLoading: true, error }

  return { data, comments: data.comments, isCommentLoading: false, error: null }
}
