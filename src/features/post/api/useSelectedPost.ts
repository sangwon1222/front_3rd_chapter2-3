/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from "react"
import { Post } from "@entities/post/types"
import { useAtom } from "jotai"
import { selectedPostsAtom } from "@features/post/model/atom"

export const useSelectedPost = () => {
  const [selectedPost, setSelectedPost] = useAtom<Post | null>(
    selectedPostsAtom,
  )

  // 포스트 선택
  const updateSelectedPost = useCallback(
    (post: Post) => {
      setSelectedPost(post)
    },
    [selectedPost],
  )

  return {
    selectedPost: useMemo(() => selectedPost, [selectedPost]),
    updateSelectedPost,
  }
}
