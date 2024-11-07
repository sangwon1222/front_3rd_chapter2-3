import { Post } from "@entities/post/types"
import { fetchPost } from "./fetchPost"

/** 게시물 업데이트 */
export const updatePostApi = async (
  selectedPost: Partial<Post>,
): Promise<Post> => {
  const { id } = selectedPost
  const { ok, data, error } = await fetchPost(`/${id}`, {
    method: "PUT",
    body: selectedPost,
  })
  if (!ok) throw new Error(error ? error : "Failed to updatePost")
  return data
}
