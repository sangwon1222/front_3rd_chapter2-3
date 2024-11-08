import { Post, PostForm } from "@entities/post/types"
import { useMemo, useState } from "react"

export const usePostForm = (initialValue: Partial<Post>) => {
  const [postForm, setPostForm] = useState<Partial<Post>>({ ...initialValue })

  const updatePostForm = (update: Partial<PostForm>) => {
    setPostForm((prev) => ({ ...prev, ...update }))
  }

  const resetPostForm = () => setPostForm(initialValue)

  return {
    postForm: useMemo(() => postForm, [postForm]),
    updatePostForm,
    resetPostForm,
  }
}
