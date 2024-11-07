import { Post, PostForm } from "@entities/post/types"
import { fetchPost } from "./fetchPost"

// 게시물 생성
export const createPostApi = async (newPost: PostForm): Promise<Post> => {
  const { ok, data, error } = await fetchPost("/add", {
    method: "POST",
    body: newPost,
  })
  if (!ok) throw new Error(error ? error : "Failed to createPost")
  return data
}
